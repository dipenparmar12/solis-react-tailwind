import React from 'react'
import { spinnerLg } from '@/components/atoms/Spinner'

const TableLoading = React.memo(({ loading }) => {
  if (!loading) return null
  return (
    <tr className="absolute top-0 w-full h-full pt-6 text-gray-700 dark:text-gray-300 bg-white/60 dark:bg-black/40">
      <td
        colSpan="10000 "
        className="flex items-center justify-center font-semibold tracking-widest text-md"
      >
        {spinnerLg} <span className="ml-2">Loading...</span>
      </td>
    </tr>
  )
})

export default TableLoading
