/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import useQryParams from '@/hooks/useQryParams'
import Api from '@/services/ApiService'
import ContextFactory from '@/context/ContextFactory'
import Tabs from '@/components/molecules/Tabs/Tabs'
import Print from '@/components/atoms/Print'
import useObject from '@/hooks/useObject'
import UserListTable from '@/pages/Users/ListTable'
import QryParams from '@/utils/miscellaneous/qryParams'

// const UserContext = React.createContext(null)
// export const useUserContext = () => React.useContext(UserContext)

const [UserProvider, useUserContext, Context] = ContextFactory({
  name: 'UserContext',
})
export { useUserContext }

const UserTabs = {
  List: 'User List',
}

const UsersContext = ({ children }) => {
  const [qry, setQry] = useObject({ per_page: 15, tab: UserTabs.List })

  const [QryParams] = useSearchParams()
  const [tab, setTab] = React.useState(QryParams.get('tab') || '')

  // // Enable query params
  const qryParams = useQryParams({ setParams: setQry.merge })
  React.useEffect(() => {
    qryParams.set(qry)
  }, [qry])

  /// // TOBE DELETED
  // const apiState = useFetcher({
  //   apiCall: Api.users.get,
  //   qry: qry,
  //   pagination: true, // TODO::10 Throw's error if api has pagination and ui doesn't
  // })
  // const apiStateMemo = React.useMemo(() => apiState, [apiState])
  // const contextValue = {
  //   UsersState: apiStateMemo,
  //   setQry,
  // }

  // API call
  const apiState = useQuery(
    ['users', qry],
    () => Api.users.get({ qry }).then((res) => res?.data),
    { enabled: false },
  )

  const apiStateMemo = React.useMemo(() => {
    // console.log('Context.js::51  apiState.data', apiState)
    if (!apiState?.data || !apiState?.data?.results) return {}

    const { data: temp, ...state } = apiState
    const { results, ...rest } = apiState.data
    const { data, total, ...paginationData } = results
    return {
      state,
      ...rest,
      total,
      paginationData,
      data,
    }
  }, [apiState])

  const contextValue = {
    State: apiStateMemo,
    qry,
    setQry,
  }

  React.useEffect(() => {
    UserTabs.List && apiState.refetch()
  }, [tab])

  return (
    <UserProvider value={contextValue}>
      <Tabs
        active={tab}
        setActive={setTab}
        items={[{ name: UserTabs.List }, { name: 'PettyCash summary' }]}
        callback={(active5Tab) => {
          setQry.merge({ tab: active5Tab })
        }}
      />

      {tab === UserTabs.List && <UserListTable />}

      <Print>{apiStateMemo}</Print>
    </UserProvider>
  )
}

export default UsersContext
