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
  const [qry, setQry] = useObject({})
  const qryParams = useQryParams({ setParams: setQry.merge })
  const resProjects = useFetcher({
    apiCall: Api.funds.get,
    qry,
    pagination: true, // TODO::10 Throw's error if api has pagination and ui doesn't
  })

  React.useEffect(() => {
    qryParams.set(qry)
  }, [qry])

  const contextValue = {
    State: resProjects,
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
