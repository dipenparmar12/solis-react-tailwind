import React from 'react'
import { useQuery } from 'react-query'
import ContextFactory from '@/context/ContextFactory'
import useObject from '@/hooks/useObject'
import Api from '@/services/ApiService'
import useQryParams from '@/hooks/useQryParams'
import EstimateList from './List'

const [EstimateProvider, useEstimateContext, Context] = ContextFactory({
  name: 'EstimateContext',
})
export { useEstimateContext }

export default function EstimatesContext() {
  const [qry, setQry] = useObject({ page: 1, per_page: 30 })

  // // Enable query params
  // const qryParams = useQryParams({ setParams: setQry.merge })
  // React.useEffect(() => {
  //   qryParams.set(qry)
  // }, [qry])

  // API call
  const apiState = useQuery(
    ['estimates', qry],
    () => Api.estimates.get({ qry }),
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
    <EstimateProvider value={contextValue}>
      <EstimateList />
    </EstimateProvider>
  )
}
