/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import Print from '@/components/atoms/Print'
import SalaryPage, { useSalariesContext } from '@/pages/Salaries'
import Tabs from './_partials/Tabs'
import AdvanceContainer from './_partials/AdvanceContainer'
import AdvanceCreateForm from './_partials/AdvanceCreateForm'
import CardV2 from '@/components/atoms/CardV2'
import AdvancesSummaryTable from './_partials/AdvancesSummaryTable'
import SalaryCreateForm from './_partials/SalaryCreateForm'
import SalaryContainer from './_partials/SalaryContainer'

export default function TabsList() {
  const { State: FundState = {}, setQry, qry, activeTab } = useSalariesContext()

  return (
    <>
      <div className={'pb-20'}>
        <Tabs />

        {activeTab === 'salaries' && <SalaryContainer />}
        {activeTab === 'advances' && <AdvanceContainer />}
        {activeTab === 'advance_summary' && <AdvancesSummaryTable />}
        {activeTab === 'create_advance' && <AdvanceCreateForm />}
        {activeTab === 'create_salary' && <SalaryCreateForm />}

        <Print data={{ qry }} />
      </div>
    </>
  )
}
