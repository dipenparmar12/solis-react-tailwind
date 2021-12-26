import React from 'react'
import Api from '@/services/ApiService'
import useFetcher from '@/hooks/useFetcher'
import UserCard, { UserCardLoading } from './Card'
import useMergeState from '@/hooks/useMergeState'
import Print from '@/components/atoms/Print'
import PaginatorV1 from '@/components/molecules/PaginationV1/PaginatorV1'
import ErrorState from '@/components/atoms/ErrorState'
import useQryParams from '@/hooks/useQryParams'

export default function UserList() {
  const [apiQry, setApiQry] = useMergeState({
    page: 1,
    per_page: 20,
  })

  const qryParams = useQryParams({ setParams: setApiQry })

  const resUsers = useFetcher({
    apiCall: Api.users.get,
    qry: apiQry,
    pagination: true,
    immediateInvoke: true,
  })

  React.useEffect(() => {
    qryParams.set(apiQry)
  }, [apiQry])

  return (
    <>
      <div className={'container'}>
        <PaginatorV1
          label={'Users'}
          setPage={(option) => {
            console.log('List.js::[37] var', option)
            setApiQry({ page: option?.value || option })
          }}
          setPerPage={(option) => {
            setApiQry({ page: 1, per_page: option?.value || option })
          }}
          totalRecords={resUsers.paginationData?.total || 0}
          pageSize={resUsers.paginationData?.per_page || 0}
          currentPage={resUsers.paginationData?.current_page || 0}
          loading={resUsers?.loading}
        />

        <ErrorState error={resUsers.error} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 ">
          {/* Data List */}
          {resUsers?.data?.map((user, i) => (
            <UserCard key={`user__${Math.random()}`} data={user} />
          ))}

          {/* loading  */}
          <UserCardLoading loading={resUsers?.loading} />
        </div>

        {/* <Print data={resUsers?.paginationData} maxHeight={'250px'} /> */}
      </div>
    </>
  )
}
