import React from 'react'
import Print from '@/components/atoms/Print'
import { useFundContext } from './Funds'

export default function FundTable() {
  const { State: FundState = {}, setQry, qry } = useFundContext()

  const columns = React.useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id', // accessor is the "key" in the data
      },
      {
        Header: 'Given To',
        accessor: 'user.name',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Project',
        accessor: 'project',
      },
      {
        Header: 'Received From',
        accessor: 'created_by',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    [],
  )

  return (
    <>
      <Print>{FundState}</Print>
    </>
  )
}
