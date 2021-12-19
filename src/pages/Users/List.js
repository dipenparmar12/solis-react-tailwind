import React from 'react'
import useFetcher from '../../hooks/useFetcher'
import Test from '@/components/Test'
// import Api from '@/services/ApiService'

export default function UserList() {
  const { data } = useFetcher({ data: [] })
  return (
    <div>
      UserList
      <Test />
    </div>
  )
}
