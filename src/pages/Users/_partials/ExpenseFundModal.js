/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React from 'react'
import { useQuery } from 'react-query'
import classNames from 'classnames'
import { useSearchParams } from 'react-router-dom'
import capitalize from '@/utils/str/capitalize'
import CardV2 from '@/components/atoms/CardV2'
import formatRs from '@/utils/str/formatRs'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import DropDownApp from '@/components/molecules/DropDownApp/DropDownApp'
import generateKey from '@/utils/miscellaneous/generateKey'
import formatBytes from '@/utils/number/formatBytes'
import Api from '@/services/ApiService'
import formatDate from '@/utils/date/formatDate'
import LoadingSkeletonTable from '@/components/atoms/LoadingSkeletonTable'
import Print from '@/components/atoms/Print'
import Button from '@/components/atoms/Button'
import { TrueValues } from '@/store/types'
import Icons from '@/components/icons/Icons'
import Tabs from '@/components/molecules/Tabs/Tabs'
import UserListTable from '@/pages/Users/ListTable'

function ExpenseFundList({ data: user }) {
  const [QryParams] = useSearchParams()
  const [tab, setTab] = React.useState(QryParams.get('ledger_tab') || '')

  const { funds_sum_amount = 0, expenses_sum_amount = 0 } = user || {}
  const balance = funds_sum_amount - expenses_sum_amount

  // API call
  const {
    isLoading,
    data: Expense,
    refetch,
    isFetching,
    error,
  } = useQuery(
    ['projects_expenses', { id: user?.id }],
    () =>
      Api.projects
        .expenses({ qry: { id: user?.id } })
        .then((res) => res?.data?.results),
    {
      enabled: false,
    },
  )

  React.useEffect(() => {
    console.log('ExpenseModal.js::27 user', user)
  }, [user])

  return (
    <div className="cursor-pointer">
      <ModalV3
        renderButton={({ setOpen }) => (
          <Button
            onClick={() => {
              setOpen(true)
              refetch()
            }}
            size={'sm'}
            className="text-sm btn-subtle "
          >
            <span className={balance > 0 ? 'text-green-600' : 'text-red-500'}>
              {formatRs(balance, '-')}
            </span>
          </Button>
        )}
      >
        <h2 className="mb-3 mr-10 text-2xl"> Ledger: {user?.name} </h2>

        {/* <Print>{BalanceSheetData}</Print> */}
        <div className={'flex gap-4 py-3'}>
          <div className={'card_v1 shadow-sm  flex-1'}>
            <h6 className="text-gray-600 dark:text-gray-500 text-lg whitespace-nowrap">
              PettyCash
            </h6>
            <h3 className="text-gray-600 dark:text-gray-400 text-2xl font-semibold">
              {formatRs(user?.funds_sum_amount, 0)}
            </h3>
          </div>

          {/* Expense */}
          <div className={'card_v1 shadow-sm  flex-1'}>
            <h6 className="text-gray-600 dark:text-gray-500 text-lg whitespace-nowrap">
              Expense
            </h6>
            <h3 className="text-gray-600 dark:text-gray-400 text-2xl font-semibold">
              {formatRs(
                user.expenses_sum_amount ||
                  0 + user.expenses_pending_approval ||
                  0,
                0,
              )}
            </h3>
          </div>

          {/* Balance */}
          <div className={'card_v1 shadow-sm  flex-1'}>
            <h6 className="text-gray-600 dark:text-gray-500 text-lg whitespace-nowrap">
              Balance
            </h6>
            <h3 className="text-gray-600 dark:text-gray-400 text-2xl font-semibold">
              {formatRs(balance, 0)}
            </h3>
          </div>
        </div>

        <Tabs
          active={tab}
          setActive={setTab}
          items={[{ name: 'Expenses' }, { name: 'Funds' }]}
          callback={(active5Tab) => {
            // setQry.merge({ tab: active5Tab })
          }}
        />

        {tab === 'Expenses' && 'expense'}
        {tab === 'Funds' && 'expens Tabe'}

        <table className="table_v1">
          <thead>
            <tr>
              <td> ID </td>
              <td> Particular </td>
              <td> Date </td>
              <td> Tran-Type </td>
              <td> PettyCash </td>
              <td> Expense </td>
            </tr>
          </thead>
          <tbody>
            {[]?.map?.((item, index) => (
              <tr key={generateKey(index)}>
                <td>{item.id}</td>
                <td className={'whitespace-nowrap'}>
                  {formatDate(item?.date || item?.s_date)}
                </td>
                <td>{item?.id || '-'}</td>
              </tr>
            ))}

            {isLoading && <LoadingSkeletonTable columns={9} />}

            {user?.balance_sheet?.length === 0 && !isLoading && (
              <tr>
                <td colSpan={'100%'} className="text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </ModalV3>
    </div>
  )
}

export default ExpenseFundList

/*
<div className={'flex gap-4 py-3'}>
  <TopCard
    title={'Expense + Estimates'}
    amount={project?.expenses_sum_amount}
  />
  <TopCard title={'Incomes'} amount={project?.incomes_sum_amount} />
  <TopCard title={'Balance (P & L)'} amount={145000} />
 </div>
       */

// const TopCard = React.memo(({ title, amount }) => (
//   <div className={'card_v1 shadow-sm  flex-1'}>
//     <h6 className="text-gray-600 dark:text-gray-500 text-lg whitespace-nowrap">
//       {title}
//     </h6>
//     <h3 className="text-gray-600 dark:text-gray-400 text-2xl font-semibold">
//       {formatRs(amount)}
//     </h3>
//   </div>
// ))
