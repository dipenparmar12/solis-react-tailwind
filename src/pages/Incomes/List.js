/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React from 'react'
import { useSortBy, useTable } from 'react-table'
import useToggle from '@/hooks/useToggle'
import { useIncomeContext } from './Context'
import TableLoading from '@/components/molecules/Table/TableLoading'
import Icons from '@/components/icons/Icons'
import PaginatorV1 from '@/components/molecules/PaginationV1/PaginatorV1'
import Button from '@/components/atoms/Button'
import Accordion from '@/components/molecules/Accordion/Accordion'
import CardV2 from '@/components/atoms/CardV2'
import formatRs from '@/utils/str/formatRs'
import formatDate from '@/utils/date/formatDate'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import Print from '@/components/atoms/Print'
import useTableSorting from '@/hooks/useTableSorting'

function IncomeList() {
  const { qry, setQry, State: IncomeState } = useIncomeContext()
  const [filtersVisible, setFilterVisible] = useToggle(false)
  const { handleTableSorting, getSortingIcon } = useTableSorting(setQry.merge)

  const TableRows = IncomeState?.data || [] // TOD0::MEMOIZE Table data

  const TableColumns = React.useMemo(
    () => [
      {
        accessor: 'id',
        Header: '#',
        isSortable: true,
      },
      {
        id: 'project_id',
        Header: 'Project',
        accessor: 'project.title',
        isSortable: true,
        Cell: ({ value }) => (
          <span className="cursor-pointer hover:underline dark:text-blue-400 text-sky-500 hover:text-sky-600">
            {value}
          </span>
        ),
      },
      {
        Header: 'Date',
        accessor: 'date',
        isSortable: true,
        Cell: ({ value }) => formatDate(value),
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
        Header: 'Tran Type',
        accessor: 'transaction.type',
        id: 'transaction_id',
      },
      {
        Header: 'From',
        accessor: 'from',
        id: 'from',
      },
      {
        Header: ' ',
        accessor: 'attachment',
        id: 'attachment',
        isSortable: false,
        Cell: ({ row, value }) => (
          <div className="cursor-pointer hover:underline hover:text-sky-600">
            <button>
              <Icons.Attachment className="" />
            </button>
          </div>
        ),
      },

      {
        Header: 'Status',
        accessor: 'id',
        id: 'status',
        isSortable: false,
        Cell: ({ row, value }) => (
          <div className="space-x-1.5 flex items-center">
            <ModalV3
              renderButton={({ setOpen }) => (
                <button onClick={setOpen} className="text-sm ">
                  <Icons.Eye className="hover:text-sky-600" />
                </button>
              )}
            >
              <h2 className="mb-3 mr-10 text-2xl">
                Record ID: {row.values?.id}
              </h2>
              <Print>{row.original}</Print>
            </ModalV3>

            {/* <button>
              <Icons.Edit className="hover:text-yellow-600" />
            </button>
            <button>
              <Icons.Delete className=" hover:text-red-600" />
            </button> */}
          </div>
        ),
      },
    ],
    [],
  )

  const totalRecords = React.useMemo(
    () => IncomeState?.total || 0,
    [IncomeState?.total],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    visibleColumns,
    page,
    rows,
    prepareRow,
  } = useTable(
    {
      columns: TableColumns,
      data: TableRows,
      manualSortBy: true,
    },

    useSortBy,
  )

  return (
    <>
      <CardV2>
        {' '}
        <Accordion
          initialIsOpen={false}
          renderButton={({ toggle, isOpen }) => (
            <div className="flex flex-wrap items-center justify-between">
              <h1
                onClick={toggle}
                className="pt-2 mb-3 text-xl font-semibold text-gray-600 cursor-pointer dark:text-gray-400"
              >
                Incomes
                {isOpen ? Icons.ArrowDown : Icons.ArrowRight}
              </h1>
              <div className="flex my-2 space-x-2">
                {/* <Button
                  variant="subtle"
                  size="md"
                  className="px-2 py-1.5 text-sm "
                  onClick={setFilterVisible.toggle}
                >
                  <Icons.Filter className="inline-block mb-1" /> Filters{' '}
                </Button> */}

                <Button
                  variant="subtle"
                  size="md"
                  className="px-2 py-1.5 text-sm "
                  onClick={() => setQry.reset() || setFilterVisible.off()}
                >
                  <Icons.Refresh className="inline-block mx-0.5 mb-1" />
                  Reset
                  {/* {Object.keys(qry).length} */}
                </Button>
              </div>
            </div>
          )}
        >
          <PaginatorV1
            // label={' '}
            setPage={(option) => {
              setQry?.merge({ page: option?.value || option })
            }}
            setPerPage={(option) => {
              setQry?.merge({ page: 1, per_page: option?.value || option })
            }}
            loading={IncomeState?.isLoading}
            totalRecords={IncomeState?.total || 0}
            pageSize={IncomeState?.rest?.per_page || 0}
            currentPage={IncomeState?.rest?.current_page || 0}
            siblingCount={1}
          />
        </Accordion>
        <div className="overflow-x-auto">
          <table className="table_v1" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column?.getSortByToggleProps())}
                      onClick={() => {
                        column?.isSortable &&
                          handleTableSorting(column?.id, qry.sortBy)
                      }}
                      className={'whitespace-nowrap'}
                    >
                      {column.render('Header')}
                      {column.isSortable && (
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? Icons.SortingDesc
                              : Icons.SortingAsc
                            : Icons.Sorting}
                        </span>
                      )}
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

              {<TableLoading loading={IncomeState?.isLoading} />}

              <tr className="text-left lg:text-right ">
                <td colSpan="10000" className="pt-4 px-2 py-2.5">
                  {IncomeState?.isLoading
                    ? 'Loading... ' // Use our custom loading state to show a loading indicator
                    : `Showing ${rows?.length} of ~${
                        totalRecords || ''
                      } results`}
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
      </CardV2>
    </>
  )
}

export default IncomeList
