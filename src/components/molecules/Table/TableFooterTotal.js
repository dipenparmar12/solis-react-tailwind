import React from 'react'
import formatRs from '@/utils/str/formatRs'

const TableFooterTotal = React.memo(({ amountCol, rows, column, ...rest }) => {
  // Only calculate total visits if rows change
  const total = React.useMemo(
    () =>
      rows.reduce((sum, row) => row.values[amountCol || column.id] + sum, 0),
    [rows],
  )
  return <span className="font-semibold">{formatRs(total || '-')}</span>
})

export default TableFooterTotal
