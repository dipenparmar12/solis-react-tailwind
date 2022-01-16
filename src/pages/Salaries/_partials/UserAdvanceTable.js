/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable react/no-unstable-nested-components */
import { useFormikContext } from 'formik'
import React from 'react'
import { useSortBy, useTable } from 'react-table'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import { BsChevronExpand } from 'react-icons/bs'
import formatRs from '@/utils/str/formatRs'
import formatDate from '@/utils/date/formatDate'
import { useSalariesContext } from '..'
import TableLoading from '@/components/molecules/Table/TableLoading'
import Icons from '@/components/icons/Icons'

function UserAdvanceTable({ user_id }) {
  const { State: FundState = {}, setQry, qry, activeTab } = useSalariesContext()
  const { values } = useFormikContext?.() || {}
  const userId = user_id || values?.user_id

  React.useEffect(() => {
    FundState?.reset()
  }, [])

  React.useEffect(() => {
    // console.log('UserAdvanceTable.js::[17] userId', userId)
    setQry.merge({ user_id: userId })
  }, [userId])

  const totalRecords = React.useMemo(
    () => FundState?.data?.length || 0,
    [FundState?.data?.length],
  )

  const TableColumns = React.useMemo(
    () => [
      {
        accessor: 'id',
        isSortable: true,
        Header: 'ID',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        isSortable: true,
        Cell: ({ value }) => (
          <span className="font-semibold text-green-600">
            {formatRs(value || '-')}
          </span>
        ),
      },
      {
        Header: 'Paid',
        accessor: 'paid_amount',
        isSortable: true,
        Cell: ({ value }) => (
          <span className="font-semibold text-green-600">
            {formatRs(value || '-')}
          </span>
        ),
      },
      {
        Header: 'Pending Amt',
        accessor: (row) => (
          <span className="text-red-400 ">
            {formatRs(row.amount - row.paid_amount)}
          </span>
        ),
        isSortable: true,
      },
      {
        Header: 'Date',
        accessor: 'date',
        isSortable: true,
        Cell: ({ value }) => formatDate(value),
      },
    ],
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: TableColumns,
        data: FundState?.data || [],
      },
      useSortBy,
    )

  if (!userId) return null
  return (
    <div className="px-2 my-4 mt-8 overflow-x-auto">
      <h1 className="text-xl text-gray-600 dark:text-gray-400">
        Advance Status{' '}
      </h1>
      <table className="table_v1" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? Icons.SortingDesc
                        : Icons.SortingAsc
                      : Icons.Sorting}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps} className={'relative'}>
          {rows.map((row, i) => {
            prepareRow(row)
            const rowProps = row.getRowProps()
            return (
              <React.Fragment key={rowProps.key}>
                <tr {...rowProps}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              </React.Fragment>
            )
          })}

          {<TableLoading loading={FundState?.loading} />}

          <tr className="text-left lg:text-right ">
            <td colSpan="10000" className="pt-4 px-2 py-2.5">
              {FundState?.loading
                ? 'Loading... ' // Use our custom loading state to show a loading indicator
                : `Showing ${rows?.length} of ~${totalRecords || ''} results`}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default UserAdvanceTable
