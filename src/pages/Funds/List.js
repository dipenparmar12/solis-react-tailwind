/* eslint-disable react/no-array-index-key */
import React from 'react'
import useToggle from '@/hooks/useToggle'
import { useFundContext } from './Funds'
import FundTable from './Table'

export default function FundsList() {
  const { State: FundState = {}, setQry, qry } = useFundContext()
  return (
    <>
      <div className={'container pb-20'}>
        <FundTable />
        {/* <Print data={resUsers?.paginationData} maxHeight={'250px'} /> */}
      </div>
    </>
  )
}
