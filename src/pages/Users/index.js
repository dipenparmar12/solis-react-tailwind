/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react'
import useFetcher from '@/hooks/useFetcher'
import useMergeState from '@/hooks/useMergeState'
import useQryParams from '@/hooks/useQryParams'
import Api from '@/services/ApiService'
import UserList from './List'

const UserContext = React.createContext(null)
export const useUserContext = () => React.useContext(UserContext)

const UserContainer = ({ children }) => {
  const [apiQry, setApiQry] = useMergeState({ per_page: 15 })
  const qryParams = useQryParams({ setParams: setApiQry })
  const apiState = useFetcher({
    apiCall: Api.users.get,
    qry: apiQry,
    pagination: true, // TODO::10 Throw's error if api has pagination and ui doesn't
  })

  React.useEffect(() => {
    qryParams.set(apiQry)
  }, [apiQry])

  const apiStateMemo = React.useMemo(() => apiState, [apiState])
  const contextValue = {
    UsersState: apiStateMemo,
    setApiQry,
  }

  return (
    <UserContext.Provider value={contextValue}>
      <UserList />
    </UserContext.Provider>
  )
}

export default UserContainer
