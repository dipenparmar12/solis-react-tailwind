import React from 'react'
import config from '@/config/config'

export default function Print({
  data,
  className,
  style,
  maxHeight,
  tab = 2,
  ...rest
}) {
  if (!config.REACT_APP_DEBUG_PRINT) return null

  return (
    <div
      className={`my-2 text-gray-500 dark:text-gray-200 overflow-x-hidden overflow-y-scroll  ${className}`}
      style={{ maxHeight, ...style }}
      {...rest}
    >
      <pre>{JSON.stringify(data, null, tab)}</pre>
    </div>
  )
}
