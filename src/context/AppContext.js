import React, { useState } from 'react'
import { useQueries, useQuery } from 'react-query'
import useMergeState from '@/hooks/useMergeState'
import Api from '@/services/ApiService'
import Types from '@/utils/validation/Types'
import capitalize from '@/utils/str/capitalize'

const AppContext = React.createContext(null)
export const useAppContext = () => React.useContext(AppContext)

const AppContextProvider = ({ children }) => {
  const [resources, setResources] = useState([])
  const [staticData, setStaticData] = useMergeState({
    roles: [],
    propertyTypes: [],
    transactions: [],
    dealers: [],
    permissions: [],
  })

  const fetchData = (
    qry,
    mapper = (item) => ({
      value: item.id,
      label: capitalize(item?.label || item?.name || item?.title),
      ...(item || {}),
    }),
  ) => {
    Api.staticData
      .fetch(qry)
      .then((res) => res?.data)
      .then((res) => {
        setStaticData({ [qry?.resource]: res?.results?.map(mapper) })
      })
  }

  // Static data fetchers
  const apiState = useQueries(
    resources?.map((item) => {
      const [resource, mapper] = Types.isObject(item)
        ? Object.values(item)
        : [item]

      return {
        queryKey: ['staticData', resource],
        queryFn: () => fetchData({ resource }, mapper),
        // config: {
        //   cacheTime: 3000,
        //   refetchInterval: 10000,
        //   refetchOnMount: false,
        //   refetchOnWindowFocus: false,
        //   refetchOnReconnect: false,
        // },
      }
    }),
  )

  React.useEffect(() => {}, [resources])

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    staticData,
    setStaticData,
    setResources,
    apiState,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}
export default AppContextProvider

/**
 * 
 * if (
      !appContext?.staticData?.transactions?.length ||
      !appContext?.staticData?.projects?.length
    ) {
      appContext.setResources(['projects', 'transactions'])
    }
    
 *  appContext.setResources([
        {
          resource: 'property_types',
          mapper: (item) => ({
            value: item,
            label: item,
          }),
        },
      ])



 */
