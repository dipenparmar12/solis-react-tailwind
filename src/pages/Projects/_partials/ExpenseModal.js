import React from 'react'
import { useQuery } from 'react-query'
import classNames from 'classnames'
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

function ExpenseList({ project }) {
  // API call
  const {
    isLoading,
    data: Expense,
    refetch,
    isFetching,
    error,
  } = useQuery(
    ['projects_expenses', { id: project?.id }],
    () =>
      Api.projects
        .expenses({ qry: { id: project?.id } })
        .then((res) => res?.data?.results),
    {
      enabled: false,
    },
  )

  // React.useEffect(() => {
  //   console.log('ExpenseModal.js::27 data', data)
  // }, [data])

  return (
    <ModalV3
      renderButton={({ setOpen }) => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <a
          className="link"
          onClick={() => {
            setOpen(true)
            refetch()
          }}
        >
          {formatRs(project?.expenses_sum_amount)}
        </a>
        // <DropDownApp
        //   stateLess
        //   label={'View'}
        //   options={[
        //     { label: `Expenses`, onSelect:u () => setOpen(tre), },
        //     { label: `Incomes`, onSelect: () => {console.log('CardList.js::97 222')},},
        //   ]}
        // />
      )}
    >
      <h2 className="mb-6 mr-10 text-2xl ">
        {capitalize(project?.client)}, {project?.title}
      </h2>

      <div className={'text-xl text-gray-600'}>
        Expenses
        <span className={'pl-1 text-green-600 font-semibold'}>
          {formatRs(project.expenses_sum_amount)}
        </span>
      </div>

      <table className="table_v1 my-3 ">
        <thead>
          <tr>
            <th> Date</th>
            <th> Particular</th>
            <th> User</th>
            <th> Transaction Type</th>
            <th> Amount</th>
            <th> Approval</th>
          </tr>
        </thead>
        <tbody>
          {Expense?.expenses?.map((expense) => {
            return (
              <tr key={expense?.id}>
                <td> {formatDate(expense?.date)} </td>
                <td> {expense?.particular} </td>
                <td> {expense?.expense_by_user?.name} </td>
                <td> {expense?.transaction?.type} </td>
                <td className="text-green-600 font-semibold">
                  {formatRs(expense?.amount)}
                </td>
                <td className="">
                  <Button
                    size="sm"
                    className={classNames([
                      `btn_badge `,
                      TrueValues.includes(expense?.is_approved) && 'green',
                      [0, false].includes(expense?.is_approved) && 'red',
                    ])}
                  >
                    {[null, ''].includes(expense?.is_approved) && 'Pending'}
                    {TrueValues.includes(expense?.is_approved) && 'Accepted'}
                    {[0, false].includes(expense?.is_approved) && 'Rejected'}
                  </Button>
                </td>
              </tr>
            )
          })}
          {isLoading && <LoadingSkeletonTable />}

          {Expense?.expenses?.length === 0 && !isLoading && (
            <tr>
              <td colSpan={'100%'} className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* <Print>{Expense}</Print> */}
    </ModalV3>
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
