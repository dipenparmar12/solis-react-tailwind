/* eslint-disable react/no-array-index-key */
import React from 'react'
import { useFundContext } from './Funds'
import FundTable from './Table'
import CardV2 from '@/components/atoms/CardV2'

export default function FundsList() {
  const { State: FundState = {}, setQry, qry } = useFundContext()
  return (
    <>
      <div className={'container pb-20'}>
        <CardV2>
          <h1 className="pt-2 pb-2 text-xl"> PettyCash List</h1>
          <FundTable />
        </CardV2>
        {/* <Print data={resUsers?.paginationData} maxHeight={'250px'} /> */}
      </div>
    </>
  )
}
