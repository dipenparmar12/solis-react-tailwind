/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-array-index-key */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-use-before-define */
import React from 'react'
import { useTable, usePagination, useSortBy, useExpanded } from 'react-table'

import { RiEyeLine } from 'react-icons/ri'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import { useSalariesContext } from '.'
import TableLoading from '@/components/molecules/Table/TableLoading'
import formatDate from '@/utils/date/formatDate'
import formatRs from '@/utils/str/formatRs'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import Print from '@/components/atoms/Print'
import useTableSorting from '@/hooks/useTableSorting'

const NestedRow = React.memo(({ row, loading }) => {
  return <Print>{row.original}</Print>
})

export default function SalariesTable() {
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
                      <NestedRow row={row} />
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
      </table>
    </>
  )
}

const useTableColumns = (type) => {
  const AdvanceColumns = React.useMemo(
    () => [
      {
        accessor: '-',
        id: 'expander',
        Cell: ({ row }) => {
          return (
            <span
              className="inline-block w-full"
              {...row.getToggleRowExpandedProps()}
            >
              {row.isExpanded ? (
                <VscChevronDown className="inline-block" />
              ) : (
                <VscChevronRight className="inline-block" />
              )}
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
        Header: 'Status',
        id: 'status',
        Cell: ({ row }) => (
          <div className="space-x-1.5">
            <ModalV3
              renderButton={({ setOpen }) => (
                <button onClick={setOpen}>
                  <RiEyeLine className="text-blue-400" />
                </button>
              )}
            >
              <h2 className="mb-3 mr-10 text-2xl">
                Record ID: {row.values?.id}
              </h2>
              <Print>{row.original}</Print>
            </ModalV3>

            {/* <button>
                <RiEditLine className="text-yellow-600" />
              </button>

              <button>
                <RiDeleteBin7Line className="text-red-400" />
              </button> */}
          </div>
        ),
      },
    ],
    [],
  )

  const SalariesColumn = React.useMemo(
    () => [{ Header: 'ID', id: 'id', accessor: 'id' }],
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
