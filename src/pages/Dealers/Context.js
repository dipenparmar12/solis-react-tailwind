import React from 'react'
import { useQuery } from 'react-query'
import ContextFactory from '@/context/ContextFactory'
import DealerList from '@/pages/Dealers/List'
import useObject from '@/hooks/useObject'
import Api from '@/services/ApiService'

const [DealerProvider, useDealerContext, Context] = ContextFactory({
  name: 'DealerContext',
})
export { useDealerContext }

export default function DealersContext() {
  const [qry, setQry] = useObject({ page: 1, per_page: 50 })

  // // Enable query params
  // const qryParams = useQryParams({ setParams: setQry.merge })
  // React.useEffect(() => {
  //   qryParams.set(qry)
  // }, [qry])

  // API call
  const apiState = useQuery(['dealers', qry], () => Api.dealers.get({ qry }), {
    staleTime: 60000,
  })

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
    <DealerProvider value={contextValue}>
      <DealerList />
    </DealerProvider>
  )
}
