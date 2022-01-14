/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-use-before-define */
import React from 'react'
import { useTable, usePagination, useSortBy } from 'react-table'
import {
  RiArrowDownLine,
  RiArrowDownSLine,
  RiArrowUpDownLine,
  RiArrowUpLine,
  RiArrowUpSLine,
  RiDeleteBin7Line,
  RiEditLine,
  RiEyeLine,
} from 'react-icons/ri'
import { BsChevronExpand, BsSortUpAlt } from 'react-icons/bs'

import { useSalariesContext } from '.'
import TableV1, {
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  TLoading,
} from '@/components/molecules/Table/TableV1'
import formatDate from '@/utils/date/formatDate'
import formatRs from '@/utils/str/formatRs'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import Print from '@/components/atoms/Print'
import useTableSorting from '@/hooks/useTableSorting'

export default function SalariesTable() {
  const { State: FundState = {}, setQry, qry } = useSalariesContext()
  const fundColumns = useFundColumns()
  const fundRows = FundState?.data // TOD0::MEMOIZE Table data
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({ columns, data: FundState?.data })

  const controlledPageCount = React.useMemo(() => {
    return FundState?.paginationData?.total || 0
  }, [FundState?.paginationData?.total])

  const { handleTableSorting, getSortingIcon } = useTableSorting(setQry.merge)

  const tableColumnHooks = React.useCallback((hooks) => {
    hooks.visibleColumns.push((columns) => {
      return [
        ...columns,
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
      ]
    })
  }, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // rows,
    page,
    // setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: fundColumns,
      data: fundRows,

      // Sorting
      manualSortBy: true,
      defaultCanSort: true,

      // Pagination
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    useSortBy,
    usePagination,
    tableColumnHooks,
  )

  return (
    <>
      <TableV1 {...getTableProps()}>
        <Thead>
          {headerGroups.map((hGroup) => (
            <tr {...hGroup.getHeaderGroupProps()}>
              {hGroup.headers.map((column) => (
                <Th
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
                </Th>
              ))}
            </tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps} className={'relative'}>
          {page?.map((row, i) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                })}
              </Tr>
            )
          })}

          {<TLoading loading={FundState?.loading} />}

          <tr className="text-left lg:text-right ">
            <td colSpan="10000" className="pt-4 px-2 py-2.5">
              {FundState?.loading
                ? 'Loading... ' // Use our custom loading state to show a loading indicator
                : `Showing ${page.length} of ~${controlledPageCount} results`}
            </td>
          </tr>
        </Tbody>
      </TableV1>
    </>
  )
}

const useFundColumns = () => {
  return React.useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id',
        isSortable: true,
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
            {formatRs(value)}
          </span>
        ),
      },
      {
        Header: 'Month',
        accessor: 'date',
        isSortable: true,
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: 'Deduction',
        accessor: 'deduction',
        isSortable: true,
      },
      {
        Header: 'In Hand',
        accessor: 'in_hand',
        isSortable: true,
      },
      // {
      //   Header: 'Status',
      //   accessor: 'status',
      // },
    ],
    [],
  )
}
