/* eslint-disable react/no-array-index-key */
import React from 'react'
import { RiAddLine, RiFilter3Line } from 'react-icons/ri'
import { MdOutlineFormatColorReset } from 'react-icons/md'
import classNames from 'classnames'
import SalariesTable from './Table'
import CardV2 from '@/components/atoms/CardV2'
import PaginatorV1 from '@/components/molecules/PaginationV1/PaginatorV1'
import Print from '@/components/atoms/Print'
import useToggle from '@/hooks/useToggle'
import Button from '@/components/atoms/Button'
import FundFilters from './Filters'
import { useSalariesContext } from '.'

export default function SalariesList() {
  const { State: FundState = {}, setQry, qry } = useSalariesContext()
  const [filtersVisible, setFilterVisible] = useToggle(false)

  return (
    <>
      <div className={'pb-20'}>
        <div>
          <div className="bg-white whitespace-nowrap">
            <nav className="flex pb-3 overflow-auto">
              <button
                className={classNames([
                  'px-4 py-2 font-semibold  border-b-2  hover:text-sky-600 focus:outline-none',
                  'text-sky-600 border-sky-500',
                ])}
              >
                Salaries
              </button>
              <button
                className={classNames([
                  'px-4 py-2 text-gray-600 border-b-2 hover:text-sky-500 focus:outline-none',
                ])}
              >
                Advances
              </button>
              <button
                className={classNames([
                  'px-4 py-2 text-gray-600 border-b-2 hover:text-sky-500 focus:outline-none',
                ])}
              >
                Advance Summary
              </button>
              <button
                className={classNames([
                  'px-4 py-2 text-gray-600 border-b-2 hover:text-sky-500 focus:outline-none',
                ])}
              >
                <RiAddLine className="inline-block" /> Salary
              </button>

              <button
                className={classNames([
                  'px-4 py-2 text-gray-600 border-b-2 hover:text-sky-500 focus:outline-none',
                ])}
              >
                <RiAddLine className="inline-block" /> Advance
              </button>
            </nav>
          </div>
        </div>

        <CardV2>
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="pt-2 mb-3 text-xl font-semibold text-gray-600 dark:text-gray-400">
              Salaries
            </h1>
            <div className="flex my-2 space-x-2">
              <Button
                variant="subtle"
                size="md"
                className="px-2 py-1.5 text-sm "
                onClick={setFilterVisible.toggle}
              >
                <RiFilter3Line className="inline-block mb-1" /> Filters{' '}
              </Button>

              <Button
                variant="subtle"
                size="md"
                className="px-2 py-1.5 text-sm "
                onClick={() => setQry.reset() || setFilterVisible.off()}
              >
                <MdOutlineFormatColorReset className="inline-block mb-1" />
                Reset
                {/* {Object.keys(qry).length} */}
              </Button>
            </div>
          </div>

          <PaginatorV1
            label={'Total '}
            setPage={(option) => {
              setQry?.merge({ page: option?.value || option })
            }}
            setPerPage={(option) => {
              setQry?.merge({ page: 1, per_page: option?.value || option })
            }}
            totalRecords={FundState?.paginationData?.total || 0}
            pageSize={FundState?.paginationData?.per_page || 0}
            currentPage={FundState?.paginationData?.current_page || 0}
            loading={FundState?.loading}
            siblingCount={1}
          />

          {filtersVisible && <FundFilters isVisible={filtersVisible} />}

          <div className="overflow-x-auto">
            <SalariesTable />
          </div>
        </CardV2>
        <Print data={qry} />
        {/* <Print data={omit(FundState?.paginationData, 'links')} /> */}
      </div>
    </>
  )
}
