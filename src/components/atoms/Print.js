import React from 'react'

export default function Print({
  data,
  className,
  style,
  maxHeight,
  tab = 2,
  ...rest
}) {
  return (
    <pre
      className={`mb-2 text-gray-500 dark:text-gray-200 overflow-y-auto  ${className}`}
      style={{ maxHeight, ...style }}
      {...rest}
    >
      {JSON.stringify(data, null, tab)}
    </pre>
  )
}
