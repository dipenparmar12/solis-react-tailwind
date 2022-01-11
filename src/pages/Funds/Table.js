/* eslint-disable no-use-before-define */
import React from 'react'
import { useTable } from 'react-table'
import classNames from 'classnames'
import { useFundContext } from './Funds'
import TableV1 from '@/components/molecules/Table/TableV1'
import Print from '@/components/atoms/Print'

const { Thead, Th, Tbody, Tr, Td } = TableV1

export default function FundTable() {
  const { State: FundState = {}, setQry, qry } = useFundContext()
  const columns = useFundColumns()
  // const fundData = React.memo(() => FundState?.data, [])
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: FundState?.data })

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

        <Tbody {...getTableBodyProps}>
          {rows?.map((row, i) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                })}
              </Tr>
            )
          })}
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
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Date',
        accessor: 'date',
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
