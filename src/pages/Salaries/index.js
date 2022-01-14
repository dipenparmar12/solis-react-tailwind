/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import useFetcher from '@/hooks/useFetcher'
import useQryParams from '@/hooks/useQryParams'
import Api from '@/services/ApiService'
import SalariesList from './List'
import useObject from '@/hooks/useObject'
import deepMerge from '@/utils/obj/deepMerge'

const Context = React.createContext(null)
export const useSalariesContext = () => React.useContext(Context)

const SalaryContainer = ({ children }) => {
  const [params, setParams] = useSearchParams()
  const [qry, setQry] = useObject({ per_page: 10 })
  const [activeTab, setTab] = React.useState(params.get('tab') || 'salaries')

  // React.useEffect(() => {
  //   console.log('List.js::[27]', params.get('tab'))
  // }, [params])

  // // Enable query params
  const qryParams = useQryParams({ setParams: setQry.merge })
  React.useEffect(() => {
    qryParams.set(deepMerge(qry, { tab: activeTab }))
  }, [qry, activeTab])

  const apiCall = React.useCallback((...args) => {
    switch (activeTab) {
        case 'salaries':
          return Api.salaries.get(...args)
        case 'advances':
          return Api.advances.get(...args)
        default:
          break
    }
    return Api.staticData.fetch({resource:'empty'})
  }, [activeTab])

  const apiState = useFetcher({
    apiCall,
    qry,
    omitParams: ['tab'],
    pagination: true, // TODO::10 Throw's error if api has pagination and ui doesn't
  })

  const contextValue = {
    State: apiState, // data, error, loading, paginationData, reload,
    qry,
    setQry,
    setTab,
    activeTab,
  }

  // React.useEffect(() => {
  //   console.log('index.js::[37]', query)
  // }, [])

  return (
    <Context.Provider value={contextValue}>
      <SalariesList />
    </Context.Provider>
  )
}

export default SalaryContainer
