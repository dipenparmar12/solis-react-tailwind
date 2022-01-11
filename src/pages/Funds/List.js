/* eslint-disable react/no-array-index-key */
import React from 'react'
import { useFundContext } from './Funds'
import FundTable from './Table'
import CardV2 from '@/components/atoms/CardV2'
import PaginatorV1 from '@/components/molecules/PaginationV1/PaginatorV1'
import Print from '@/components/atoms/Print'
import omit from '@/utils/obj/omit'

export default function FundsList() {
  const { State: FundState = {}, setQry, qry } = useFundContext()
  return (
    <>
      <div className={'container pb-20'}>
        <CardV2>
          <h1 className="pt-2 mb-3 text-xl font-semibold text-gray-600 dark:text-gray-400">
            Users PettyCash
          </h1>

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

          <FundTable />
        </CardV2>
        {/* <Print data={omit(FundState?.paginationData, 'links')} /> */}
      </div>
    </>
  )
}
