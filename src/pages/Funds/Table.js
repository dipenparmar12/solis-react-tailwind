/* eslint-disable no-use-before-define */
import React from 'react'
import { useTable } from 'react-table'
import classNames from 'classnames'
import Print from '@/components/atoms/Print'
import { useFundContext } from './Funds'

export default function FundTable() {
  const { State: FundState = {}, setQry, qry } = useFundContext()
  const columns = useFundColumns()
  // const fundData = React.memo(() => FundState?.data, [])
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: FundState?.data })

  React.useEffect(() => {
    console.log('Table.js::[14]', FundState?.data)
  }, [FundState?.data])
  return (
    <>
      <table
        {...getTableProps()}
        className="w-full border-collapse rounded-sm "
      >
        <thead className="shadow">
          {headerGroups.map((hGroup) => (
            <tr {...hGroup.getHeaderGroupProps()}>
              {hGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-2 py-3 font-semibold text-left text-gray-600 border-b dark:text-gray-400 dark:border-sky-800"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {rows?.map((row, i) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                className={classNames([
                  'border-b test-left dark:border-gray-700',
                  'bg-white hover:bg-sky-50',
                  'text-gray-500 dark:text-gray-400 hover:dark:text-blue-300 hover:text-gray-700',
                  'transition duration-200 ease-in-out',
                ])}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="px-2 py-2.5 ">
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* <Print>{FundState?.data}</Print> */}
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
