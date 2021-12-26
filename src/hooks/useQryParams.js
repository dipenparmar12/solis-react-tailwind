/* eslint-disable no-underscore-dangle */
import React from 'react'

export default function useQryParams({ setParams = () => {} }) {
  const set = React.useCallback((obj) => {
    const qry = { ...obj }
    window.history.pushState({}, '', `?${new URLSearchParams(qry).toString()}`)
  }, [])

  const get = React.useCallback(() => {
    const qry = new URLSearchParams(window.location.search)
    return Object.fromEntries(qry)
  }, [])

  const clear = React.useCallback(() => {
    window.history.pushState({}, '', window.location.pathname)
  }, [])

  // const setParam = (key, value) => {
  //   const qry = get()
  //   qry[key] = value
  //   set(qry)
  // }

  // const deleteParam = (key) => {
  //   const qry = get()
  //   delete qry[key]
  //   set(qry)
  // }

  React.useEffect(() => {
    const initUrlQryParams = get()
    setParams(initUrlQryParams)
  }, [])

  return React.useMemo(() => ({ set, get, clear }), [set, get, clear])
}

/**
 
  const setQryParams = React.useCallback(
    (qry) => {
      const qryParams = { ...params, ...qry }
      window.history.pushState(
        null,
        null,
        `?${new URLSearchParams(qryParams).toString()}`,
      )
    },
    [params],
  )

  const getQryParams1 = React.useMemo(
    () =>
      new URLSearchParams(window.location.search.substring(1))
        .entries()
        .reduce((qry, [key, value]) => ({ ...qry, [key]: value }), {}),
    [],
  )

  const getQryParams = React.useMemo(
    () =>
      new URLSearchParams(window.location.search)
        .toString()
        .split('&')
        .reduce((acc, item) => {
          const [key, value] = item.split('=')
          acc[key] = value
          return acc
        }, {}),
    [],
  )

  React.useEffect(() => {
    setQryParams(params)
  }, [params])
 */
