/* eslint-disable indent */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import CardV2 from '@/components/atoms/CardV2'
import PaginatorV1 from '@/components/molecules/PaginationV1/PaginatorV1'
import Print from '@/components/atoms/Print'
import useToggle from '@/hooks/useToggle'
import Button from '@/components/atoms/Button'
import Accordion from '@/components/molecules/Accordion/Accordion'
import AdvanceFilters from '@/pages/Salaries/Filters'
import { useSalariesContext } from '@/pages/Salaries'

import Tabs from '@/pages/Salaries/_partials/Tabs'
import TableLoading from '@/components/molecules/Table/TableLoading'
import formatDate from '@/utils/date/formatDate'
import formatRs from '@/utils/str/formatRs'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import useTableSorting from '@/hooks/useTableSorting'
import AdvancesTable from '@/pages/Salaries/_partials/AdvancesTable'
import Icons from '@/components/icons/Icons'

export default function AdvanceContainer() {
  const { State: FundState = {}, setQry, qry, activeTab } = useSalariesContext()
  const [filtersVisible, setFilterVisible] = useToggle(false)

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
                Advances
                {isOpen ? Icons.ArrowDown : Icons.ArrowRight}
              </h1>
              <div className="flex my-2 space-x-2">
                <Button
                  variant="subtle"
                  size="md"
                  className="px-2 py-1.5 text-sm "
                  onClick={setFilterVisible.toggle}
                >
                  <Icons.Filter className="inline-block mb-1" /> Filters{' '}
                </Button>

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
            totalRecords={FundState?.paginationData?.total || 0}
            pageSize={FundState?.paginationData?.per_page || 0}
            currentPage={FundState?.paginationData?.current_page || 0}
            loading={FundState?.loading}
            siblingCount={1}
          />
        </Accordion>
        {filtersVisible && <AdvanceFilters isVisible={filtersVisible} />}
        <div className="div">
          <AdvancesTable />
        </div>
      </CardV2>
    </>
  )
}
