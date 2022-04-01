/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import formatRs from '@/utils/str/formatRs'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import generateKey from '@/utils/miscellaneous/generateKey'
import Api from '@/services/ApiService'
import formatDate from '@/utils/date/formatDate'
import LoadingSkeletonTable from '@/components/atoms/LoadingSkeletonTable'
import Print from '@/components/atoms/Print'
import Button from '@/components/atoms/Button'

function ExpenseList({ data: user }) {
  // const { funds_sum_amount = 0, expenses_sum_amount = 0 } = user || {}
  // const balance = funds_sum_amount - expenses_sum_amount

  const expenseSum = user?.expenses_sum_amount

  // API call
  const {
    isLoading,
    data: Expense,
    refetch,
    isFetching,
    error,
  } = useQuery(
    ['user_expenses', { id: user?.id }],
    () =>
      Api.users.expenses
        .get({ qry: { user_id: user?.id } })
        .then((res) => res?.data?.results),
    {
      enabled: false,
    },
  )

  // React.useEffect(() => {
  //   console.log('ExpenseModal.js::27 user', user)
  // }, [user])

  return (
    <div className="cursor-pointer">
      <ModalV3
        renderButton={({ setOpen }) => (
          <a
            className="link"
            onClick={() => {
              setOpen(true)
              refetch()
            }}
          >
            <span
            // className={expenseSum > 0 ? 'text-green-600' : 'text-red-500'}
            >
              {formatRs(expenseSum, '-')}
            </span>
          </a>
        )}
      >
        <h2 className="mb-3 mr-10 text-2xl"> Expenses: {user?.name} </h2>

        {/* <Print>{user}</Print> */}

        <table className="table_v1">
          <thead>
            <tr>
              <td> ID </td>
              <td> Amount </td>
              <td> Particular </td>
              <td> Date </td>
              <td> Project </td>
              <td> Tran-Type </td>
              <td> Vendor </td>
            </tr>
          </thead>

          <tbody>
            {Expense?.data?.map?.((item, index) => (
              <tr key={generateKey(index)}>
                <td>{item?.id}</td>
                <td>{formatRs(item?.amount)}</td>
                <td className={'whitespace-nowrap'}>
                  {formatDate(item?.date || item?.s_date)}
                </td>
                <td>{item?.particular}</td>
                <td>{item?.project?.title}</td>
                <td>{item?.transaction?.type}</td>
                <td>{item?.dealer?.firm}</td>
              </tr>
            ))}

            {isLoading && <LoadingSkeletonTable columns={5} />}

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

export default ExpenseList

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
