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
  })

  const fetchRoles = () => {
    Api.staticData
      .fetch({ resource: 'roles' })
      .then(Api.utils.getRes)
      .then(({ results = [] }) => {
        const roles = results?.map((role) => ({
          value: role.id,
          label: role?.display_name || role?.name,
        }))
        setStaticData({ roles })
      })
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    staticData,
    setStaticData,
    fetchRoles,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}
export default AppContextProvider
