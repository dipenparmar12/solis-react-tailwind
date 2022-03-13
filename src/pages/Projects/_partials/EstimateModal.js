import React from 'react'
import { useQuery } from 'react-query'
import capitalize from '@/utils/str/capitalize'
import formatRs from '@/utils/str/formatRs'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import Api from '@/services/ApiService'
import formatDate from '@/utils/date/formatDate'
import LoadingSkeletonTable from '@/components/atoms/LoadingSkeletonTable'
import Print from '@/components/atoms/Print'

function EstimateList({ project }) {
  // API call
  const {
    isLoading,
    data: Estimates,
    refetch,
    isFetching,
    error,
  } = useQuery(
    ['project_estimates', { id: project?.id }],
    () =>
      Api.projects
        .estimates({ qry: { id: project?.id } })
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
          {formatRs(project?.estimates_sum_amount)}
        </a>
      )}
    >
      <h2 className="mb-6 mr-10 text-2xl ">
        {capitalize(project?.client)}, {project?.title}
      </h2>

      <div className={'text-xl text-gray-600'}>
        Estimates{' '}
        <span className={'pl-1 text-green-600 font-semibold'}>
          {formatRs(project.estimates_sum_amount)}
        </span>
      </div>

      <table className="table_v1 my-3 ">
        <thead>
          <tr>
            <th> ID</th>
            <th> Date</th>
            <th> Particular</th>
            <th> Vendor</th>
            <th> Amount</th>
          </tr>
        </thead>
        <tbody>
          {Estimates?.estimates?.map((estimate) => {
            return (
              <tr key={estimate?.id}>
                <td> {estimate?.id} </td>
                <td> {formatDate(estimate?.s_date)} </td>
                <td> {estimate?.desc} </td>
                <td> {estimate?.dealer?.firm} </td>
                <td className="text-green-600 font-semibold">
                  {formatRs(estimate?.amount)}
                </td>
              </tr>
            )
          })}
          {isLoading && <LoadingSkeletonTable />}

          {Estimates?.estimates?.length === 0 && !isLoading && (
            <tr>
              <td colSpan={'100%'} className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* <Print>{Estimates}</Print> */}
    </ModalV3>
  )
}

export default EstimateList

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
