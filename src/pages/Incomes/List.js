import React from 'react'
import Print from '@/components/atoms/Print'
import { useIncomeContext } from './Context'

function IncomeList() {
  const contextValue = useIncomeContext()
  return (
    <div>
      <Print>{contextValue}</Print>
      IncomeList
    </div>
  )
}

export default IncomeList
