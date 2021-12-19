import React from 'react'
import Api from '@/services/ApiService'
import Print from '@/components/atoms/Print'
import useFetcher from '@/hooks/useFetcher'

export default function UserList() {
  const [qry, setQry] = React.useState({ page: 1, per_page: 1 })
  const apiUser = useFetcher({ apiCall: Api.users.get, qry })

  return (
    <div>
      UserList
      <button
        className="block mt-1 btn"
        onClick={() => {
          // setQry({ ...qry, page: qry.page + 1 })
          return [...Array(8).fill(null)].forEach((i) => {
            setQry({ ...qry, page: qry.page + 1 })
          })
        }}
      >
        Get users
      </button>
      <Print data={apiUser} maxHeight={'300px'} />
      {/* <Print data={apiTest} maxHeight={'300px'} /> */}
    </div>
  )
}
