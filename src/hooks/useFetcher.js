import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useFetcher({
  apiCall,
  qry,
  pagination,
  immediateInvoke = true,
}) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [paginationData, setPaginationData] = useState(pagination)
  // const [metaInfo, setMetaInfo] = useState(null) // TODO::WHEN Required

  useEffect(() => {
    let isMounted = true
    const cancelSource = axios.CancelToken.source()
    const config = { cancelToken: cancelSource.token }
    if (isMounted && immediateInvoke) {
      setLoading(true)
      setData([])
      apiCall({ qry, config })
        .then((res) => res?.data)
        .then((res) => {
          if (pagination) {
            const { results, ...meta } = res
            const { data: resData, ...paginationInfo } = results
            pagination && paginationInfo && setPaginationData(paginationInfo)
            return resData || res?.results
          }
          return res?.results || res
        })
        .then((res) => setData(isMounted ? res : []))
        .catch((err) => setError(isMounted && err))
        .finally(() => setLoading(false))
    }
    return () => {
      isMounted = false
      cancelSource?.cancel()
      setLoading(false)
    }
  }, [apiCall, qry])

  return {
    data,
    error,
    loading,
    paginationData,
  }
}

/**
  const paginationHandler = React.useCallback(
    (res) => {
      if (pagination) {
        const { results, ...meta } = res
        const { data: resData, ...paginationData } = results
        pagination && paginationData && setPaginationInfo(paginationData)
        return resData || res?.results
      }
      return res?.results || res
    },
    [pagination],
  )
*/
