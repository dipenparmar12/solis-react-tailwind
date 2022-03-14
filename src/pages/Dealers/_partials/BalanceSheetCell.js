/* eslint-disable no-unsafe-optional-chaining */
import React from 'react'
import { useQuery } from 'react-query'
import classNames from 'classnames'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import Icons from '@/components/icons/Icons'
import Print from '@/components/atoms/Print'
import generateKey from '@/utils/miscellaneous/generateKey'
import Api from '@/services/ApiService'
import formatDate from '@/utils/date/formatDate'
import formatRs from '@/utils/str/formatRs'
import Button from '@/components/atoms/Button'
import LoadingSkeletonTable from '@/components/atoms/LoadingSkeletonTable'

const BalanceSheetCell = React.memo(({ row, ...rest }) => {
  const { original: dealer = {} } = row || {}
  // API call
  const {
    isLoading,
    data: BalanceSheetData,
    refetch,
    isFetching,
    error,
  } = useQuery(
    ['dealer_balance_sheet', { id: dealer?.id }],
    () =>
      Api.dealers
        .balance_sheet({ qry: { id: dealer?.id } })
        .then((res) => res?.data?.results),
    {
      enabled: false,
    },
  )

  const EstimateTotal = parseInt(dealer?.estimates_sum_amount || 0, 10)
  const ExpenseTotal = parseInt(dealer?.expenses_sum_amount || 0, 10)
  const PaymentsTotal = parseInt(dealer?.payments_sum_amount || 0, 10)
  const Balance = EstimateTotal + ExpenseTotal - PaymentsTotal

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
            View
          </Button>
        )}
      >
        <h2 className="mb-3 mr-10 text-2xl"> Balance sheet: {dealer?.firm} </h2>

        {/* <Print>{BalanceSheetData}</Print> */}
        <div className={'flex gap-4 py-3'}>
          <div className={'card_v1 shadow-sm  flex-1'}>
            <h6 className="text-gray-600 dark:text-gray-500 text-lg whitespace-nowrap">
              Estimate
            </h6>
            <h3 className="text-gray-600 dark:text-gray-400 text-2xl font-semibold">
              {formatRs(EstimateTotal, 0)}
            </h3>
          </div>

          <div className={'card_v1 shadow-sm  flex-1'}>
            <h6 className="text-gray-600 dark:text-gray-500 text-lg whitespace-nowrap">
              Expense
            </h6>
            <h3 className="text-gray-600 dark:text-gray-400 text-2xl font-semibold">
              {formatRs(ExpenseTotal, 0)}
            </h3>
          </div>

          <div className={'card_v1 shadow-sm  flex-1'}>
            <h6 className="text-gray-600 dark:text-gray-500 text-lg whitespace-nowrap">
              Payments
            </h6>
            <h3 className="text-green-600 dark:text-gray-400 text-2xl font-semibold">
              {formatRs(PaymentsTotal, 0)}
            </h3>
          </div>

          <div className={'card_v1 shadow-sm  flex-1'}>
            <h6 className="text-gray-600 dark:text-gray-500 text-lg whitespace-nowrap">
              Balance (!)
            </h6>
            <h3
              className={classNames([
                'text-2xl font-semibold',
                Balance > 0 ? 'text-green-600' : 'text-red-500',
              ])}
            >
              {formatRs(Balance)}
            </h3>
          </div>
        </div>

        <table className="table_v1">
          <thead>
            <tr>
              <td> ID</td>
              <td className={''}> Date</td>
              <td> Project</td>
              <td> User</td>
              <td> Desc</td>
              <td> Estimate</td>
              <td> Expense </td>
              <td> Payment </td>
              <td> Status </td>
            </tr>
          </thead>
          <tbody>
            {BalanceSheetData?.balance_sheet?.map?.((item, index) => (
              <tr key={generateKey(index)}>
                <td>{item.id}</td>
                <td className={'whitespace-nowrap'}>
                  {formatDate(item?.date || item?.s_date)}
                </td>
                <td>{item?.project?.title || '-'}</td>

                <td>{item?.expense_by_user?.name || '-'}</td>
                <td>{item?.desc || '-'}</td>

                <td className="text-red-500">
                  {item?.resource === 'estimate'
                    ? formatRs(item?.amount, '-')
                    : '-'}
                </td>
                <td className="text-red-500">
                  {item?.resource === 'expense'
                    ? formatRs(item?.amount, '-')
                    : '-'}
                </td>
                <td className="text-green-500">
                  {item?.resource === 'payment'
                    ? formatRs(item?.amount, '-')
                    : '-'}
                </td>

                <td>
                  <ModalV3
                    renderButton={({ setOpen }) => (
                      <button onClick={setOpen} className="text-sm ">
                        <Icons.Eye className="hover:text-sky-600" />
                      </button>
                    )}
                  >
                    <Print>{row.original}</Print>
                  </ModalV3>
                </td>
              </tr>
            ))}

            {isLoading && <LoadingSkeletonTable columns={9} />}

            {BalanceSheetData?.balance_sheet?.length === 0 && !isLoading && (
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
})

export default BalanceSheetCell
