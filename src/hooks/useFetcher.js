import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function useFetcher({ apiCall, qry }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    const cancelSource = axios.CancelToken.source()
    const config = { cancelToken: cancelSource.token }
    if (isMounted) {
      setLoading(true)
      apiCall({ qry, config })
        .then((res) => res?.data?.data || res?.data || res)
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
  }
}
