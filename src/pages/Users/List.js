import React from 'react'
import Api from '@/services/ApiService'
import Print from '@/components/atoms/Print'
import useFetcher from '@/hooks/useFetcher'
import Random from '@/utils/faker/random'
import UserCard from './Card'

export default function UserList() {
  const [qry, setQry] = React.useState({ page: 1, per_page: 1 })
  const apiUser = useFetcher({ apiCall: Api.users.get, qry })

  return (
    <>
      <div className={'mx-auto'}>
        <div className="grid gap-3 bg-gray-400 ">
          {Random.arrRandom(5, 10).map((v, i) => (
            <UserCard key={`user__${Math.random()}`} />
          ))}
        </div>
      </div>
    </>
  )
}
