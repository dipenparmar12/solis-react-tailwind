/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react'
import useFetcher from '@/hooks/useFetcher'
import useQryParams from '@/hooks/useQryParams'
import Api from '@/services/ApiService'
import TransactionsList from './List'
import useObject from '@/hooks/useObject'

const Context = React.createContext(null)
export const useTransactionContext = () => React.useContext(Context)

const TransactionsContainer = ({ children }) => {
  const [qry, setQry] = useObject({ per_page: 15 })
  const qryParams = useQryParams({ setParams: setQry.merge })
  const apiState = useFetcher({
    apiCall: Api.transactions.get,
    qry,
    pagination: true, // TODO::10 Throw's error if api has pagination and ui doesn't
  })

  React.useEffect(() => {
    qryParams.set(qry)
  }, [qry])

  const apiStateMemo = React.useMemo(() => apiState, [apiState])

  const contextValue = {
    State: apiStateMemo,
    qry,
    setQry,
  }

  return (
    <Context.Provider value={contextValue}>
      <TransactionsList />
    </Context.Provider>
  )
}

export default TransactionsContainer
