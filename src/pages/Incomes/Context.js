import React from 'react'
import ContextFactory from '@/context/ContextFactory'
import IncomeList from '@/pages/Incomes/List'
import useObject from '@/hooks/useObject'

const [IncomeProvider, useIncomeContext, Context] = ContextFactory({
  name: 'IncomeContext',
})
export { useIncomeContext }

export default function Incomes() {
  const [qry, setQry] = useObject({ per_page: 10 })
  const apiStateMemo = React.useMemo(() => {}, [])

  const contextValue = {
    State: apiStateMemo, // data, error, loading, paginationData, reload,
    qry,
    setQry,
  }

  // React.useEffect(() => {
  //   console.log('Context.js::[19]', useIncomeContext)
  // }, [])

  return (
    <IncomeProvider value={contextValue}>
      <IncomeList />
    </IncomeProvider>
  )
}
