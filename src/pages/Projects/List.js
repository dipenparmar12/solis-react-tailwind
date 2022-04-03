/* eslint-disable default-param-last,camelcase */
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
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import Print from '@/components/atoms/Print'
import useTableSorting from '@/hooks/useTableSorting'
import { useProjectContext } from '@/pages/Projects/Context'
import TableFooterTotal from '@/components/molecules/Table/TableFooterTotal'
import DropDownApp from '@/components/molecules/DropDownApp/DropDownApp'
import ExpenseList from '@/pages/Projects/_partials/ExpenseModal'
import EstimateList from '@/pages/Projects/_partials/EstimateModal'
import IncomeList from '@/pages/Projects/_partials/IncomesModal'

function ProjectList() {
  const { qry, setQry, State: ProjectState } = useProjectContext() || {}
  const [filtersVisible, setFilterVisible] = useToggle(false)
  const { handleTableSorting, getSortingIcon } = useTableSorting(setQry.merge)

  const TableRows = ProjectState?.data || [] // TOD0::MEMOIZE Table data
  const TableColumns = React.useMemo(
    () => [
      {
        accessor: 'id',
        Header: '#',
        isSortable: true,
      },
      {
        Header: 'Client',
        accessor: 'client',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Value',
        accessor: 'budget',
        id: 'budget',
        Cell: ({ value }) => (
          <span className="">{formatRs(value)}</span>
          // <span className=" text-yellow-600">{formatRs(value)}</span>
        ),
        Footer: TableFooterTotal,
      },
      {
        Header: 'Estimate',
        accessor: 'estimates_sum_amount',
        Cell: ({ value, row }) => <EstimateList project={row.original} />,
        Footer: TableFooterTotal,
      },
      {
        Header: 'Expense',
        accessor: 'expenses_sum_amount',
        isSortable: false,
        Cell: ({ value, row }) => <ExpenseList project={row.original} />,
        Footer: TableFooterTotal,
      },
      {
        Header: 'Income',
        accessor: 'incomes_sum_amount',
        // isSortable: true,
        Cell: ({ value, row }) => <IncomeList project={row.original} />,
        Footer: TableFooterTotal,
      },
      {
        Header: 'P & L',
        accessor: 'payments_sum_amount',
        // isSortable: true,
        Cell: ({ value, row }) => {
          const { budget, estimates_sum_amount, expenses_sum_amount } =
            row.original

          const balance = budget - estimates_sum_amount - expenses_sum_amount

          return (
            <span className={balance > 0 ? 'text-green-600' : 'text-red-400'}>
              {formatRs(balance)}
            </span>
          )
        },
        Footer: TableFooterTotal,
      },
      {
        Header: 'Collection',
        accessor: 'collection',
        // isSortable: true,
        Cell: ({ value, row }) => {
          const { budget, incomes_sum_amount } = row.original
          const balance = budget - incomes_sum_amount
          return <span className={''}>{formatRs(balance)}</span>
        },
        Footer: TableFooterTotal,
      },
      {
        Header: 'Status',
        accessor: 'id',
        id: 'status',
        isSortable: false,
        // eslint-disable-next-line no-use-before-define
        Cell: ProjectStatusCell,
      },
    ],
    [],
  )

  const totalRecords = React.useMemo(
    () => ProjectState?.total || 0,
    [ProjectState?.total],
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
      <CardV2 className={'shadow-sm'}>
        {' '}
        <Accordion
          initialIsOpen={false}
          renderButton={({ toggle, isOpen }) => (
            <div className="flex flex-wrap items-center justify-between">
              <h1
                onClick={toggle}
                className="pt-2 mb-3 text-xl font-semibold text-gray-600 cursor-pointer dark:text-gray-400"
              >
                Projects
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
            loading={ProjectState?.isLoading}
            totalRecords={ProjectState?.total || 0}
            pageSize={ProjectState?.rest?.per_page || 0}
            currentPage={ProjectState?.rest?.current_page || 0}
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

              {<TableLoading loading={ProjectState?.isLoading} />}
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
                  {ProjectState?.isLoading
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

export default ProjectList

const ProjectStatusCell = React.memo(({ row, value }) => (
  <div className="space-x-1.5 flex items-center">
    {/* <ExpenseList project={row.original} /> */}

    <ModalV3
      renderButton={({ setOpen }) => (
        <button onClick={setOpen} className="text-sm ">
          <Icons.Eye className="hover:text-sky-600" />
        </button>
      )}
    >
      <h2 className="mb-3 mr-10 text-2xl">Record ID: {row.values?.id}</h2>
      <Print>{row.original}</Print>
    </ModalV3>
    {/* <button>
              <Icons.Edit className="hover:text-yellow-600" />
            </button>
            <button>
              <Icons.Delete className=" hover:text-red-600" />
            </button> */}
  </div>
))
