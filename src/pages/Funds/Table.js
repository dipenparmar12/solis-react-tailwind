/* eslint-disable no-use-before-define */
import React from 'react'
import { usePagination, useTable } from 'react-table'
import classNames from 'classnames'
import { useFundContext } from './Funds'
import TableV1, {
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  TLoading,
} from '@/components/molecules/Table/TableV1'
import { spinnerLg, spinnerMd } from '@/components/atoms/Spinner'
import formatDate from '@/utils/date/formatDate'
import formatRs from '@/utils/str/formatRs'

export default function FundTable() {
  const { State: FundState = {}, setQry, qry } = useFundContext()
  const columns = useFundColumns()
  // const fundData = React.memo(() => FundState?.data, [])
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({ columns, data: FundState?.data })

  const controlledPageCount = React.useMemo(() => {
    return FundState?.paginationData?.total || 0
  }, [FundState?.paginationData?.total])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // rows,
    // Pagination
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: FundState?.data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    usePagination,
  )

  return (
    <>
      <TableV1 {...getTableProps()}>
        <Thead>
          {headerGroups.map((hGroup) => (
            <tr {...hGroup.getHeaderGroupProps()}>
              {hGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
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

          <tr className="text-right">
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
        accessor: 'id', // accessor is the "key" in the data
      },
      {
        Header: 'Given To',
        accessor: 'given_to.name',
        Cell: ({ value }) => (
          <span className="cursor-pointer hover:underline dark:text-blue-400 text-sky-500 hover:text-sky-600">
            {value}
          </span>
        ),
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ value }) => (
          <span className="font-semibold text-green-600">
            {formatRs(value)}
          </span>
        ),
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: 'Received From',
        accessor: 'received_from.name',
      },
      {
        Header: 'Project',
        accessor: 'project.title',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    [],
  )
}
