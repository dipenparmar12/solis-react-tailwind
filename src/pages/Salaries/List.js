/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import Print from '@/components/atoms/Print'
import { useSalariesContext } from '@/pages/Salaries'
import Tabs from './_partials/Tabs'
import AdvanceContainer from './_partials/AdvanceContainer'
import AdvanceCreateForm from './_partials/AdvanceCreateForm'
import CardV2 from '@/components/atoms/CardV2'

export default function SalariesContainer() {
  const { State: FundState = {}, setQry, qry, activeTab } = useSalariesContext()

  return (
    <>
      <div className={'pb-20'}>
        <Tabs />

        {activeTab === 'advances' && <AdvanceContainer />}
        {activeTab === 'create_advance' && (
          <CardV2>
            <AdvanceCreateForm />
          </CardV2>
        )}

        <Print data={{ qry, FundState }} />
      </div>
    </>
  )
}
