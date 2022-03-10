import React from 'react'
import generateKey from '@/utils/miscellaneous/generateKey'

/**
 * Table Loading Skeleton
 * @type {React.NamedExoticComponent<{readonly rows?: *, readonly columns?: *}>}
 * @see https://codepen.io/ecomrick77/pen/bGePeoM
 */
const LoadingSkeletonTable = React.memo(({ rows = 4, columns = 5 }) => {
  return [...Array(columns)].map((_, i) => {
    return (
      <tr key={generateKey(i)} className={'animate-pulse'}>
        {[...Array(columns)].map((_, i) => (
          <td key={generateKey(i)}>
            <div className="h-4 bg-gray-200 mb-3 rounded" />
          </td>
        ))}
      </tr>
    )
  })
})

export default LoadingSkeletonTable

/* ------------------------------------
  Example
  <LoadingSkeletonTable  rows={10} columns={5} />
 ------------------------------------ */
