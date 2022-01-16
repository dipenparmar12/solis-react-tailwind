/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import { useTable, usePagination, useSortBy, useExpanded } from 'react-table'
import Print from '@/components/atoms/Print'
import { useSalariesContext } from '@/pages/Salaries'

import TableLoading from '@/components/molecules/Table/TableLoading'
import formatDate from '@/utils/date/formatDate'
import formatRs from '@/utils/str/formatRs'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import useTableSorting from '@/hooks/useTableSorting'
import Icons from '@/components/icons/Icons'
import CardV2 from '@/components/atoms/CardV2'

export default function AdvancesSummaryTable() {
  const { State: FundState = {}, setQry, qry, activeTab } = useSalariesContext()
  const TableRows = FundState?.data || [] // TOD0::MEMOIZE Table data
  const TableColumns = React.useMemo(
    () => [
      {
        accessor: 'user_id',
        Header: 'User ID',
      },
      {
        id: 'username',
        Header: 'User',
        accessor: 'username',
        Cell: ({ value }) => (
          <span className="cursor-pointer hover:underline dark:text-blue-400 text-sky-500 hover:text-sky-600">
            {value}
          </span>
        ),
      },
      {
        Header: 'Advance Taken',
        accessor: 'taken',
        Cell: ({ value }) => (
          <span className="font-semibold text-green-600">
            {formatRs(value || '-')}
          </span>
        ),
      },
      {
        Header: 'Paid Amt',
        accessor: 'paid',
        Cell: ({ value }) => (
          <span className="font-semibold text-green-600">
            {formatRs(value || '-')}
          </span>
        ),
      },
      {
        Header: 'Pending Amt',
        accessor: 'outstanding',
        Cell: ({ value }) => (
          <span className="text-red-400 ">{formatRs(value || '-')}</span>
        ),
      },
      // {
      //   Header: 'Status',
      //   id: 'status',
      //   Cell: ({ row ,value }) => <div className="space-x-1.5">{value}</div>,
      // },
    ],
    [],
  )

  const totalRecords = React.useMemo(
    () => FundState?.data?.total || 0,
    [FundState?.data?.total],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: TableColumns,
        data: TableRows,
      },
      useSortBy,
    )

  return (
    <>
      <CardV2>
        <div className="overflow-x-auto">
          <table className="table_v1" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
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
                          <td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
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
                    : `Showing ${rows?.length} of ~${
                        totalRecords || ''
                      } results`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardV2>
    </>
  )
}
