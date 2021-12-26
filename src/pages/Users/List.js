import React from 'react'
import Api from '@/services/ApiService'
import useFetcher from '@/hooks/useFetcher'
import UserCard, { UserCardLoading } from './Card'
import useMergeState from '@/hooks/useMergeState'
import Print from '@/components/atoms/Print'
import PaginatorV1 from '@/components/molecules/PaginationV1/PaginatorV1'
import cn from '@/utils/classNames'
import ErrorState from '@/components/atoms/ErrorState'

export default function UserList() {
  const [apiQry, setApiQry] = useMergeState({
    page: 1,
    per_page: 20,
  })

  const resUsers = useFetcher({
    apiCall: Api.users.get,
    qry: apiQry,
    pagination: true,
    immediateInvoke: true,
  })

  return (
    <>
      <div className={' '}>
        <PaginatorV1
          label={'Users'}
          setPage={(option) => {
            setApiQry({ page: option?.value || option })
          }}
          totalRecords={resUsers.paginationData?.total || 0}
          pageSize={resUsers.paginationData?.per_page || 0}
          currentPage={resUsers.paginationData?.current_page || 0}
          loading={resUsers?.loading}
        />

        <ErrorState error={resUsers.error} />

        <div className="grid grid-cols-1 gap-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* loading  */}
          <UserCardLoading loading={resUsers?.loading} />

          {/* Data List */}
          {resUsers?.data?.map((user, i) => (
            <UserCard key={`user__${Math.random()}`} data={user} />
          ))}
        </div>

        <Print data={resUsers?.paginationData} maxHeight={'250px'} />
      </div>
    </>
  )
}
