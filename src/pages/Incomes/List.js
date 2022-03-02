import React from 'react'
import Print from '@/components/atoms/Print'
import { useIncomeContext } from './Context'

function IncomeList() {
  const { qry, setQry, State } = useIncomeContext()
  return (
    <div>
      <button
        onClick={() => {
          setQry.merge({ page: qry.page + 1 })
        }}
      >
        next
      </button>
      <Print>{qry}</Print>
      <Print maxHeight={'300px'}>{State}</Print>
      IncomeList
    </div>
  )
}

export default IncomeList
