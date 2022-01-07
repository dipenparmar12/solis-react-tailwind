import axios from 'axios'
import { useEffect, useState } from 'react'

/**
 *
 * @param {Object} props - { apiCall, qry, pagination } - apiCall: api call to be made, qry: query params, pagination: boolean
 * @returns {Object} - { data, loading, error } - data: response data, loading: boolean, error: error object
 */
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

  const paginationCb = (res) => {
    if (pagination) {
      const { results, ...meta } = res
      const { data: resData, ...paginationInfo } = results
      pagination && paginationInfo && setPaginationData(paginationInfo)
      return resData || res?.results
    }
    return res?.results || res
  }

  useEffect(() => {
    let isMounted = true
    const cancelSource = axios.CancelToken.source()
    const config = { cancelToken: cancelSource.token }
    if (isMounted && immediateInvoke) {
      setLoading(true)
      setData([])
      apiCall({ qry, config })
        .then((res) => res?.data)
        .then(paginationCb)
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
