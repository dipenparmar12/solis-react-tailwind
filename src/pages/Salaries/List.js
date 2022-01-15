/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import {
  RiArrowDownLine,
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiFilter3Line,
} from 'react-icons/ri'
import { MdOutlineFormatColorReset } from 'react-icons/md'
import SalariesTable from './Table'
import CardV2 from '@/components/atoms/CardV2'
import PaginatorV1 from '@/components/molecules/PaginationV1/PaginatorV1'
import Print from '@/components/atoms/Print'
import useToggle from '@/hooks/useToggle'
import Button from '@/components/atoms/Button'
import FundFilters from './Filters'
import { useSalariesContext } from '.'
import Tabs from './_partials/Tabs'
import Accordion from '@/components/molecules/Accordion/Accordion'

export default function SalariesList() {
  const { State: FundState = {}, setQry, qry } = useSalariesContext()
  const [filtersVisible, setFilterVisible] = useToggle(false)

  return (
    <>
      <div className={'pb-20'}>
        <Tabs />

        <CardV2>
          <Accordion
            initialIsOpen={false}
            renderButton={({ toggle, isOpen }) => (
              <div className="flex flex-wrap items-center justify-between">
                <h1
                  onClick={toggle}
                  className="pt-2 mb-3 text-xl font-semibold text-gray-600 cursor-pointer dark:text-gray-400"
                >
                  Salaries
                  {isOpen ? (
                    <RiArrowDownSLine className="inline-block text-gray-400" />
                  ) : (
                    <RiArrowRightSLine className="inline-block text-gray-400" />
                  )}
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
              totalRecords={FundState?.paginationData?.total || 0}
              pageSize={FundState?.paginationData?.per_page || 0}
              currentPage={FundState?.paginationData?.current_page || 0}
              loading={FundState?.loading}
              siblingCount={1}
            />
          </Accordion>

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
