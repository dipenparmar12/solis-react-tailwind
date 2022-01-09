import React from 'react'
import useMergeState from '@/hooks/useMergeState'
import Api from '@/services/ApiService'

const AppContext = React.createContext(null)
export const useAppContext = () => React.useContext(AppContext)

const AppContextProvider = ({ children }) => {
  // TODO::latter global context for static data
  const [staticData, setStaticData] = useMergeState({
    roles: [],
    permissions: [],
    propertyTypes: [],
  })

  const fetchData = (qry, mapper = () => {}) => {
    Api.staticData
      .fetch(qry)
      .then(Api.utils.getRes)
      .then(({ results = [] }) => {
        setStaticData({ [qry?.resource]: results?.map(mapper) })
      })
  }

  const fetchRoles = () => {
    fetchData({ resource: 'roles' }, (role) => ({
      value: role.id,
      label: role?.display_name || role?.name,
    }))
  }

  const fetchPropertyTypes = () => {
    fetchData({ resource: 'property_types' }, (item) => ({
      value: item,
      label: item,
    }))
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    staticData,
    setStaticData,
    fetchRoles,
    fetchPropertyTypes,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}
export default AppContextProvider
