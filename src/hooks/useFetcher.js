import React from 'react'

export default function useFetcher({ ...rest }) {
  const [data, setData] = React.useState()

  React.useEffect(() => {}, [])

  return {
    data,
    setData,
  }
}
