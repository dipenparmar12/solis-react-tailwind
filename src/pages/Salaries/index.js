/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react'
import useFetcher from '@/hooks/useFetcher'
import useQryParams from '@/hooks/useQryParams'
import Api from '@/services/ApiService'
import SalariesList from './List'
import useObject from '@/hooks/useObject'

const Context = React.createContext(null)
export const useSalariesContext = () => React.useContext(Context)

const SalaryContainer = ({ children }) => {
  const [qry, setQry] = useObject({ per_page: 10 })
  // // Enable query params
  const qryParams = useQryParams({ setParams: setQry.merge })
  React.useEffect(() => {
    qryParams.set(qry)
  }, [qry])

  const apiState = useFetcher({
    apiCall: Api.salaries.get,
    qry,
    pagination: true, // TODO::10 Throw's error if api has pagination and ui doesn't
  })

  const contextValue = {
    State: apiState, // data, error, loading, paginationData, reload,
    qry,
    setQry,
  }

  return (
    <Context.Provider value={contextValue}>
      <SalariesList />
    </Context.Provider>
  )
}

export default SalaryContainer
