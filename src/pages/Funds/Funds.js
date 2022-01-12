/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react'
import useFetcher from '@/hooks/useFetcher'
import useQryParams from '@/hooks/useQryParams'
import Api from '@/services/ApiService'
import FundsList from './List'
import useObject from '@/hooks/useObject'

const Context = React.createContext(null)
export const useFundContext = () => React.useContext(Context)

const FundContainer = ({ children }) => {
  const [qry, setQry] = useObject({ per_page: 10 })
  // // Enable query params
  const qryParams = useQryParams({ setParams: setQry.merge })
  React.useEffect(() => {
    qryParams.set(qry)
  }, [qry])

  const resProjects = useFetcher({
    apiCall: Api.funds.get,
    qry,
    pagination: true, // TODO::10 Throw's error if api has pagination and ui doesn't
  })
  const contextValue = {
    State: resProjects, // data, error, loading, paginationData, reload,
    qry,
    setQry,
  }

  return (
    <Context.Provider value={contextValue}>
      <FundsList />
    </Context.Provider>
  )
}

export default FundContainer
