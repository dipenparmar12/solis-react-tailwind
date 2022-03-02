import React from 'react'
import { useQuery } from 'react-query'
import ContextFactory from '@/context/ContextFactory'
import IncomeList from '@/pages/Incomes/List'
import useObject from '@/hooks/useObject'
import Api from '@/services/ApiService'
import useQryParams from '@/hooks/useQryParams'

const [IncomeProvider, useIncomeContext, Context] = ContextFactory({
  name: 'IncomeContext',
})
export { useIncomeContext }

export default function Incomes() {
  const [qry, setQry] = useObject({ page: 1, per_page: 2 })

  // // Enable query params
  const qryParams = useQryParams({ setParams: setQry.merge })
  React.useEffect(() => {
    qryParams.set(qry)
  }, [qry])

  // API call
  const apiState = useQuery(['incomes', qry], () => Api.incomes.get({ qry }), {
    staleTime: 2000,
  })

  const apiStateMemo = React.useMemo(() => {
    const { data, ...rest } = apiState?.data?.data?.results || {}
    return {
      rest,
      data,
    }
  }, [apiState])

  const contextValue = {
    State: apiStateMemo,
    qry,
    setQry,
  }

  // React.useEffect(() => {
  //   console.log('Context.js::[35]', contextValue)
  // }, [contextValue])

  return (
    <IncomeProvider value={contextValue}>
      <IncomeList />
    </IncomeProvider>
  )
}
