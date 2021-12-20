import React from 'react'
import Api from '@/services/ApiService'
import useFetcher from '@/hooks/useFetcher'
import Random from '@/utils/faker/random'
import Print from '@/components/atoms/Print'

export default function UserList() {
  const [qry, setQry] = React.useState({ page: 1, per_page: 20 })
  const resUsers = useFetcher({ apiCall: Api.users.get, qry, pagination: true })

  return (
    <>
      <div className={' '}>
        <div className="grid grid-cols-1 gap-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resUsers?.data?.map((user, i) => (
            <UserCard key={`user__${Math.random()}`} data={user} />
          ))}
        </div>
        {resUsers?.loading && <div>Loading...</div>}
        {/* <Print data={resUsers} maxHeight={'450px'} /> */}
      </div>
    </>
  )
}

function UserCard({ data }) {
  return (
    <>
      {/* dark theme */}
      <div
        className={`px-2 lg:px-4 py-2 bg-white  dark:bg-gray-900 shadow-md rounded-md hover:shadow-lg border dark:border-gray-800 dark:hover:border-gray-800 `}
      >
        <h3 className=""> {data?.name}</h3>
        <div className="flex-auto my-1 text-sm text-gray-600 dark:text-gray-500">
          <span className="mr-3 ">PettyCase {data?.fund}</span>
          <span className="mr-3 border-r border-gray-400 max-h-0" />
          <span>Cochin, IND</span>
        </div>
        <div className="text-xs">Salary: {data?.salary || '00.0'}</div>
      </div>
    </>
  )
}
