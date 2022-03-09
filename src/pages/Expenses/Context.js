import React from 'react'
import { useQuery } from 'react-query'
import ContextFactory from '@/context/ContextFactory'
import ExpenseList from '@/pages/Expenses/List'
import useObject from '@/hooks/useObject'
import Api from '@/services/ApiService'
import useQryParams from '@/hooks/useQryParams'

const [ExpenseProvider, useExpenseContext, Context] = ContextFactory({
  name: 'ExpenseContext',
})
export { useExpenseContext }

export default function ExpensesContext() {
  const [qry, setQry] = useObject({ page: 1, per_page: 15 })

  // // Enable query params
  // const qryParams = useQryParams({ setParams: setQry.merge })
  // React.useEffect(() => {
  //   qryParams.set(qry)
  // }, [qry])

  // API call
  const apiState = useQuery(
    ['expenses', qry],
    () => Api.expenses.get({ qry }),
    {
      staleTime: 60000,
    },
  )

  const apiStateMemo = React.useMemo(() => {
    const { data, total, ...rest } = apiState?.data?.data?.results || {}
    return {
      rest,
      data,
      total,
      isLoading: apiState?.isLoading,
    }
  }, [apiState])

  const contextValue = {
    State: apiStateMemo,
    qry,
    setQry,
  }

  // React.useEffect(() => {
  //   console.log('Context.js::[44] ', apiState)
  // }, [apiState])

  return (
    <ExpenseProvider value={contextValue}>
      <ExpenseList />
    </ExpenseProvider>
  )
}
