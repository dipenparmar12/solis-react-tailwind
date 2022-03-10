import React from 'react'
import { useQuery } from 'react-query'
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

function ExpenseList({ project }) {
  // API call
  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ['projects_expenses', { id: project?.id }],
    () =>
      Api.projects
        .expenses({ qry: { id: project?.id } })
        .then((res) => res?.data),
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
        <button
          className={'btn-subtle text-sm px-2 py-1'}
          onClick={() => {
            setOpen(true)
            refetch()
          }}
        >
          Expenses
        </button>
        // <DropDownApp
        //   stateLess
        //   label={'View'}
        //   options={[
        //     { label: `Expenses`, onSelect:u () => setOpen(tre), },
        //     { label: `Incomes`, onSelect: () => {console.log('List.js::97 222')},},
        //   ]}
        // />
      )}
    >
      <h2 className="mb-6 mr-10 text-2xl ">
        {capitalize(project?.client)}, {project?.title}
      </h2>

      <div className={'flex gap-4'}>
        <TopCard title={'Expense + Estimates'} amount={145000} />
        <TopCard title={'Incomes'} amount={145000} />
        <TopCard title={'Balance (P & L)'} amount={145000} />
      </div>

      <div className={'pt-5 text-xl text-gray-600'}>Expenses</div>

      <table className="table_v1 my-3 ">
        <thead>
          <tr>
            <th> Date </th>
            <th> Particular </th>
            <th> User </th>
            <th> Transaction Type </th>
            <th> Amount </th>
          </tr>
        </thead>
        <tbody>
          {data?.results?.expenses?.map((expense) => {
            return (
              <tr key={expense?.id}>
                <td> {formatDate(expense?.date)} </td>
                <td> {expense?.particular} </td>
                <td> {expense?.expense_by_user?.name} </td>
                <td> {expense?.transaction?.type} </td>
                <td className="text-green-600 font-semibold">
                  {formatRs(expense?.amount)}
                </td>
              </tr>
            )
          })}
          {isLoading && <LoadingSkeletonTable />}

          {data?.results?.expenses?.length === 0 && !isLoading && (
            <tr>
              <td colSpan={'100%'} className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </ModalV3>
  )
}

export default ExpenseList

const TopCard = React.memo(({ title, amount }) => (
  <div className={'card_v1 shadow-sm  flex-1'}>
    <h6 className="text-gray-600 dark:text-gray-500 text-lg whitespace-nowrap">
      {title}
    </h6>
    <h3 className="text-gray-600 dark:text-gray-400 text-2xl font-semibold">
      {formatRs(amount)}
    </h3>
  </div>
))
