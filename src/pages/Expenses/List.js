/* eslint-disable default-param-last */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React from 'react'
import { useSortBy, useTable } from 'react-table'
import useToggle from '@/hooks/useToggle'
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
import { useExpenseContext } from './Context'
import Popover from '@/components/molecules/Popover/Popover'
import ToolTip from '@/components/molecules/Popover/Tooltip'

function EstimateList() {
  const { qry, setQry, State: EstimateState } = useExpenseContext()
  const [filtersVisible, setFilterVisible] = useToggle(false)
  const { handleTableSorting, getSortingIcon } = useTableSorting(setQry.merge)

  const TableRows = EstimateState?.data || [] // TOD0::MEMOIZE Table data
  const buttonRef = React.useRef()

  const TableColumns = React.useMemo(
    () => [
      {
        accessor: 'id',
        Header: '#',
        isSortable: true,
      },
      {
        Header: 'Particular',
        accessor: 'particular',
        id: 'particular',
      },
      {
        id: 'expense_by_user',
        Header: 'Expense By',
        accessor: 'expense_by_user.name',
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
        Header: 'Category',
        accessor: 'category',
      },
      {
        id: 'dealer_id',
        Header: 'Dealer',
        accessor: 'dealer.firm',
        isSortable: true,
        Cell: ({ value }) => (
          <span className="cursor-pointer hover:underline dark:text-blue-400 text-sky-500 hover:text-sky-600">
            {value}
          </span>
        ),
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
        Header: 'Action',
        // accessor: 'approval',
        isSortable: false,
        Cell: ({ value }) => (
          <div className="flex justify-center">
            <ToolTip
              placement="left"
              // trigger="click"
              content={
                <div className="z-40 p-2 px-5 bg-white border rounded-lg shadow-lg space-2">
                  <div className="pb-2"> Accept or Reject expense?</div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="text-green-600 bg-green-100 hover:bg-green-200 active:bg-green-200"
                    >
                      Accept
                    </Button>

                    <Button
                      size="sm"
                      className="text-red-400 bg-red-100 hover:bg-red-200 active:bg-red-200"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              }
            >
              <button
                className="px-1 py-1 text-sm rounded-full shadow-lg cursor-pointer bg-amber-300 hover:scale-125 text-amber-600 hover:text-amber-400 hover:shadow-sm"
                onClick={() => setQry.reset() || setFilterVisible.off()}
                ref={buttonRef}
              >
                <Icons.Question className="inline-block text-green-900 mx-0.5 mb-1" />
              </button>
            </ToolTip>
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
    () => EstimateState?.total || 0,
    [EstimateState?.total],
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
                Expenses
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
            loading={EstimateState?.isLoading}
            totalRecords={EstimateState?.total || 0}
            pageSize={EstimateState?.rest?.per_page || 0}
            currentPage={EstimateState?.rest?.current_page || 0}
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

              {<TableLoading loading={EstimateState?.isLoading} />}
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
              <tr className="text-left lg:text-right">
                <td colSpan="10000" className="pt-4 px-2 py-2.5">
                  {EstimateState?.isLoading
                    ? 'Loading... ' // Use our custom loading state to show a loading indicator
                    : `Showing ${rows?.length} of ~${
                        totalRecords || ''
                      } results`}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </CardV2>
    </>
  )
}

export default EstimateList
