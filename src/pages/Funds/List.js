/* eslint-disable react/no-array-index-key */
import React from 'react'
import { RiFilter3Line } from 'react-icons/ri'
import { useFundContext } from './Funds'
import FundTable from './Table'
import CardV2 from '@/components/atoms/CardV2'
import PaginatorV1 from '@/components/molecules/PaginationV1/PaginatorV1'
import Print from '@/components/atoms/Print'
import useToggle from '@/hooks/useToggle'
import Button from '@/components/atoms/Button'
import FundFilters from './Filters'

export default function FundsList() {
  const { State: FundState = {}, setQry, qry } = useFundContext()
  const [filtersVisible, setFilterVisible] = useToggle(true)

  return (
    <>
      <div className={'pb-20'}>
        <CardV2>
          <div className="flex items-center justify-between">
            <h1 className="pt-2 mb-3 text-xl font-semibold text-gray-600 dark:text-gray-400">
              Users PettyCash
            </h1>
            <div className="space-x-2">
              <Button size="md" onClick={setFilterVisible.toggle}>
                <RiFilter3Line className="inline-block mb-1" /> Filters{' '}
                {/* {Object.keys(qry).length} */}
              </Button>

              <Button
                size="md"
                onClick={() => setQry.reset() || setFilterVisible.off()}
              >
                Clear Filters
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

          <FundFilters isVisible={filtersVisible} />

          <FundTable />
        </CardV2>

        <Print data={qry} />
        {/* <Print data={omit(FundState?.paginationData, 'links')} /> */}
      </div>
    </>
  )
}
