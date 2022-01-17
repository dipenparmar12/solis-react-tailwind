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

export default function SalariesAdvancesTable() {
  const { State: FundState = {}, setQry, qry, activeTab } = useSalariesContext()
  const { handleTableSorting, getSortingIcon } = useTableSorting(setQry.merge)
  const tableRows = FundState?.data || [] // TOD0::MEMOIZE Table data
  const TableColumns = useTableColumns(activeTab)

  const totalRecords = React.useMemo(
    () => FundState?.paginationData?.total || 0,
    [FundState?.paginationData?.total],
  )

  // const tableColumnHooks = React.useCallback((hooks) => {
  //   hooks.visibleColumns.push((columns) => {
  //     return [...columns, { Header: 'newColumn', id: 'newColumn' }]
  //   })
  // }, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    prepareRow,
    page,
    visibleColumns,
  } = useTable(
    {
      columns: TableColumns,
      data: tableRows,
      manualSortBy: true,
      manualPagination: true,
    },
    useSortBy,
    useExpanded, // Use the useExpanded plugin hook
    usePagination,
    // tableColumnHooks,
  )

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table_v1" {...getTableProps()}>
          <thead>
            {headerGroups.map((hGroup) => (
              <tr {...hGroup.getHeaderGroupProps()}>
                {hGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column?.getSortByToggleProps())}
                    onClick={() => {
                      column?.isSortable &&
                        handleTableSorting(column?.id, qry.sortBy)
                    }}
                    className={'whitespace-nowrap'}
                  >
                    {column.render('Header')}

                    <span className="px-1 mb-1">
                      {column?.isSortable &&
                        getSortingIcon(column?.id, qry.sortBy)}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps} className={'relative'}>
            {page.map((row, i) => {
              prepareRow(row)
              const rowProps = row.getRowProps()
              return (
                // Use a React.Fragment here so the table markup is still valid
                <React.Fragment key={rowProps.key}>
                  <tr {...rowProps}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                  {/* We could pass anything into this */}
                  {row.isExpanded && (
                    <tr>
                      <td colSpan={'100%'}>
                        <NestedRowTable
                          row={row}
                          rowProps={rowProps}
                          visibleColumns={visibleColumns}
                        />
                        {/* <Print>{row.original}</Print> */}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            })}

            {<TableLoading loading={FundState?.loading} />}

            <tr className="text-left lg:text-right ">
              <td colSpan="10000" className="pt-4 px-2 py-2.5">
                {FundState?.loading
                  ? 'Loading... ' // Use our custom loading state to show a loading indicator
                  : `Showing ${page.length} of ~${totalRecords || ''} results`}
              </td>
            </tr>
          </tbody>

          <tfoot>
            {footerGroups.map((group) => (
              <tr {...group.getFooterGroupProps()}>
                {group.headers.map((column) => (
                  <td {...column.getFooterProps()}>
                    {column.render('Footer')}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </>
  )
}

const useTableColumns = (type) => {
  const AdvanceColumns = React.useMemo(
    () => [
      {
        accessor: 'emi_info',
        id: '-',
        Cell: ({ row, value: emiInfo, ...rest }) => {
          if (!emiInfo?.length) return null
          return (
            <span
              className="inline-block w-full hover:text-black dark:text-gray-100"
              {...row.getToggleRowExpandedProps()}
            >
              {row.isExpanded ? Icons.ArrowDown : Icons.ArrowRight}
            </span>
          )
          // return row.canExpand ? (
          //   <span {...row.getToggleRowExpandedProps({})}>
          //     {row.isExpanded ? (
          //       <VscChevronDown className="inline-block" />
          //     ) : (
          //       <VscChevronRight className="inline-block" />
          //     )}
          //   </span>
          // ) : null
        },
      },
      {
        accessor: 'id',
        isSortable: true,
        Header: 'ID',
      },
      {
        id: 'user_id',
        Header: 'User',
        accessor: 'user.name',
        isSortable: true,
        Cell: ({ value }) => (
          <span className="cursor-pointer hover:underline dark:text-blue-400 text-sky-500 hover:text-sky-600">
            {value}
          </span>
        ),
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
        Footer: ({ rows, ...rest }) => {
          // Only calculate total visits if rows change
          const total = React.useMemo(
            () => rows.reduce((sum, row) => row.values.amount + sum, 0),
            [rows],
          )
          return <span className="">{formatRs(total || '-')}</span>
        },
      },
      {
        Header: 'Pending Amt',
        isSortable: true,
        accessor: (row) => (
          <span className="text-red-400 ">
            {formatRs(row.amount - row.paid_amount)}
          </span>
        ),
        Footer: (info) => {
          const { rows } = info
          const total = React.useMemo(
            () =>
              rows.reduce(
                (sum, row) => row.values.amount - row.values.paid_amount + sum,
                0,
              ),
            [rows],
          )
          return <span className="">{formatRs(total || '-')}</span>
        },
        // Footer: (info) => {
        //   const { rows } = info
        //   console.log('AdvancesTable.js::[215] var', rows.values)
        //   const total = React.useMemo(
        //     () =>
        //       rows.reduce(
        //         (sum, row) => row.values.amount - row.paid_amount + sum,
        //         0,
        //       ),
        //     [rows],
        //   )
        //   return <span className="font-semibold">{total}</span>
        // },
      },
      {
        Header: 'Date',
        accessor: 'date',
        isSortable: true,
        Cell: ({ value }) => formatDate(value),
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
        Footer: ({ rows, ...rest }) => {
          // Only calculate total visits if rows change
          const total = React.useMemo(
            () => rows.reduce((sum, row) => row.values.paid_amount + sum, 0),
            [rows],
          )
          return <span className="">{formatRs(total || '-')}</span>
        },
      },
      {
        Header: 'Status',
        accessor: 'settled',
        id: 'settled',
        isSortable: true,
        Cell: ({ row, value }) => (
          <div className="space-x-1.5 flex items-center">
            {value === 1 && (
              <Icons.Complete className="inline-block text-xl px-0.5 text-green-500 font-bold" />
            )}
            <ModalV3
              renderButton={({ setOpen }) => (
                <button onClick={setOpen}>
                  <Icons.Eye className="text-blue-400" />
                </button>
              )}
            >
              <h2 className="mb-3 mr-10 text-2xl">
                Record ID: {row.values?.id}
              </h2>
              <Print>{row.original}</Print>
            </ModalV3>
          </div>
        ),
      },
    ],
    [],
  )

  const SalariesColumn = React.useMemo(
    () => [
      {
        id: 'user_id',
        accessor: '#',
        Header: '#',
        Cell: ({ row, value: emiInfo, ...rest }) => {
          if (!emiInfo?.length) return null
          return (
            <span
              className="inline-block w-full hover:text-black dark:text-gray-100"
              {...row.getToggleRowExpandedProps()}
            >
              {emiInfo}
              {/* {row.isExpanded ? Icons.ArrowDown : Icons.ArrowRight} */}
            </span>
          )
        },
      },
      {
        accessor: 'id',
        isSortable: true,
        Header: 'ID',
      },
      {
        id: 'user_name',
        Header: 'User',
        accessor: 'user.name',
        isSortable: true,
        Cell: ({ value }) => (
          <span className="cursor-pointer hover:underline dark:text-blue-400 text-sky-500 hover:text-sky-600">
            {value}
          </span>
        ),
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
        Footer: ({ rows, ...rest }) => {
          // Only calculate total visits if rows change
          const total = React.useMemo(
            () => rows.reduce((sum, row) => row.values.amount + sum, 0),
            [rows],
          )
          return <span className="">{formatRs(total || '-')}</span>
        },
      },
      {
        Header: 'Deduction',
        accessor: 'deduction',
        isSortable: true,
        Cell: ({ value }) => (
          <span className="font-semibold text-red-400">
            {formatRs(value || '-')}
          </span>
        ),
        Footer: (info) => {
          const { rows } = info
          const total = React.useMemo(
            () => rows.reduce((sum, row) => row.values.deduction + sum, 0),
            [rows],
          )
          return <span className="">{formatRs(total || '-')}</span>
        },
      },
      {
        Header: 'Month-Year',
        accessor: 'month_year',
        isSortable: true,
        Cell: ({ value }) => formatDate(value, 'MMM yyyy'),
      },
      {
        Header: 'In Hand',
        isSortable: true,
        accessor: (row) => (
          <span className="text-green-600 ">
            {/* <Print>{row}</Print> */}
            {formatRs(row.amount - row.deduction)}
          </span>
        ),
        Footer: ({ rows, ...rest }) => {
          // Only calculate total visits if rows change
          const total = React.useMemo(
            () =>
              rows.reduce(
                (sum, row) => row.values.amount - row.values.deduction + sum,
                0,
              ),
            [rows],
          )
          return <span className="">{formatRs(total || '-')}</span>
        },
      },
      {
        Header: 'Status',
        accessor: 'settled',
        id: 'settled',
        isSortable: true,
        Cell: ({ row, value }) => (
          <div className="space-x-1.5 flex items-center">
            {value === 1 && (
              <Icons.Complete className="inline-block text-xl px-0.5 text-green-500 font-bold" />
            )}
            <ModalV3
              renderButton={({ setOpen }) => (
                <button onClick={setOpen}>
                  <Icons.Eye className="text-blue-400" />
                </button>
              )}
            >
              <h2 className="mb-3 mr-10 text-2xl">
                Record ID: {row.values?.id}
              </h2>
              <Print>{row.original}</Print>
            </ModalV3>

            <button>
              <Icons.Edit className="text-yellow-600" />
            </button>

            <button>
              <Icons.Delete className="text-red-400" />
            </button>
          </div>
        ),
      },
    ],
    [],
  )

  return React.useMemo(() => {
    switch (type) {
      case 'advances':
        return AdvanceColumns
      case 'salaries':
        return SalariesColumn
      default:
        return [{ Header: 'ID', id: 'id', accessor: 'id' }]
    }
  }, [type])
}

const NestedRowTable = React.memo(
  ({ row, rowProps, visibleColumns, loading }) => {
    // React.useEffect(() => {
    //   console.log('Table.js::[21] NestedRow', row)
    // }, [row])
    // return <Print>{row.original}</Print>

    const tableData = row?.original?.emi_info || []
    const TableColumns = React.useMemo(
      () => [
        {
          Header: 'ID',
          accessor: 'id',
          // Header: (info) => 'ID',
        },
        {
          Header: 'Deduction (Paid)',
          accessor: 'deduction',
          Cell: ({ value }) => (
            <span className="text-green-600">{formatRs(value || '-')}</span>
          ),
        },
        {
          Header: 'Date',
          accessor: 'date',
          Cell: ({ value }) => <span className="">{formatDate(value)}</span>,
        },
        { Header: 'Desc', accessor: 'desc' },
      ],
      [],
    )

    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
      useTable({ columns: TableColumns, data: tableData })

    return (
      <table className="w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row_) => {
            prepareRow(row_)
            return (
              <tr {...row_.getRowProps()}>
                {row_.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  },
)
