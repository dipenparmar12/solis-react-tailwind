import React, { useState } from 'react'
import { useQuery } from 'react-query'
import useMergeState from '@/hooks/useMergeState'
import Api from '@/services/ApiService'

const AppContext = React.createContext(null)
export const useAppContext = () => React.useContext(AppContext)

const AppContextProvider = ({ children }) => {
  // TODO::latter global context for static data
  const [resource, setResource] = useState()

  const [staticData, setStaticData] = useMergeState({
    roles: [],
    permissions: [],
    propertyTypes: [],
    transactions: [],
  })

  // TODO::IMP static data fetchers
  // const apiState = useQuery(
  //   ['incomes', resource],
  //   (qry) => Api.incomes.get({ qry }),
  //   {
  //     staleTime: 60000,
  //   },
  // )

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

  const fetchUsers = () => {
    fetchData({ resource: 'users' }, (user) => ({
      value: user.id,
      label: user?.label || user?.name,
      ...(user || {}),
    }))
  }

  const fetchTransaction = () => {
    fetchData({ resource: 'transactions' }, (user) => ({
      value: user.id,
      label: user?.label || user?.name,
      ...(user || {}),
    }))
  }

  const fetchProjects = () => {
    fetchData({ resource: 'projects' }, (user) => ({
      value: user.id,
      label: user?.label || user?.name,
      ...(user || {}),
    }))
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    staticData,
    setStaticData,
    fetchRoles,
    fetchPropertyTypes,
    fetchUsers,
    fetchProjects,
    fetchTransaction,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}
export default AppContextProvider
