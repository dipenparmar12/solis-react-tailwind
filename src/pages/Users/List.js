import React from 'react'
import Api from '@/services/ApiService'
import useFetcher from '@/hooks/useFetcher'
import UserCard from './Card'
import useMergeState from '@/hooks/useMergeState'
import Print from '@/components/atoms/Print'
import PaginatorApp from '@/components/molecules/PaginatorApp'

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
        <PaginatorApp
          data={resUsers?.paginationData}
          loading={resUsers?.loading}
          setState={setApiQry}
          state={apiQry}
        />

        <div className="grid grid-cols-1 gap-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resUsers?.data?.map((user, i) => (
            <UserCard key={`user__${Math.random()}`} data={user} />
          ))}
        </div>

        {resUsers?.loading && <div>Loading...</div>}
        {/* <Print data={resUsers?.loading} maxHeight={'450px'} /> */}
        <Print data={resUsers?.paginationData} maxHeight={'250px'} />
      </div>
    </>
  )
}
