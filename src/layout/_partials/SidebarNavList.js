import React from 'react'
import { NavLinkItem } from './NavLinkItem'
import AccessControl from '@/components/atoms/AccessControl'

export default function SidebarNavList({ routes }) {
  return (
    <>
      {/* fallback=null <
      AccessControl permissionsRequired={'payment-create'} /> */}

      <AccessControl fallback={null} permissionsRequired={'expense-create'}>
        <NavLinkItem route={routes?.expenseCreate} />
      </AccessControl>

      <AccessControl fallback={null} permissionsRequired={'fund-create'}>
        <NavLinkItem route={routes?.fundCreate} />
      </AccessControl>

      <AccessControl fallback={null} permissionsRequired={'income-create'}>
        <NavLinkItem route={routes?.incomeCreate} />
      </AccessControl>

      <AccessControl fallback={null} permissionsRequired={'estimate-create'}>
        <NavLinkItem route={routes?.estimateCreate} />
      </AccessControl>

      <AccessControl fallback={null} permissionsRequired={'project-create'}>
        <NavLinkItem route={routes?.projectCreate} />
      </AccessControl>

      <AccessControl fallback={null} permissionsRequired={'user-create'}>
        <NavLinkItem route={routes?.userCreate} />
      </AccessControl>

      <AccessControl fallback={null} permissionsRequired={'dealer-create'}>
        <NavLinkItem route={routes?.dealerPaymentCreate} />
      </AccessControl>

      <AccessControl fallback={null} permissionsRequired={'dealer-list-all'}>
        <NavLinkItem route={routes?.dealers} />
      </AccessControl>

      <AccessControl fallback={null} permissionsRequired={'project-list-all'}>
        <NavLinkItem route={routes?.projects} />
      </AccessControl>

      <AccessControl fallback={null} permissionsRequired={'expense-list-all'}>
        <NavLinkItem route={routes?.expenses} />
      </AccessControl>

      <AccessControl fallback={null} permissionsRequired={'income-list-all'}>
        <NavLinkItem route={routes?.incomes} />
      </AccessControl>

      <AccessControl fallback={null} permissionsRequired={'estimate-list-all'}>
        <NavLinkItem route={routes?.estimates} />
      </AccessControl>

      <AccessControl fallback={null} permissionsRequired={'salary-list-all'}>
        <NavLinkItem route={routes?.salaries} />
      </AccessControl>

      <AccessControl fallback={null} permissionsRequired={'fund-list-all'}>
        <NavLinkItem route={routes?.funds} />
      </AccessControl>

      <AccessControl fallback={null} permissionsRequired={'user-list-all'}>
        <NavLinkItem route={routes?.users} />
      </AccessControl>

      <AccessControl
        fallback={null}
        permissionsRequired={'transaction-list-all'}
      >
        <NavLinkItem route={routes?.transaction} />
      </AccessControl>

      <AccessControl fallback={null} permissionsRequired={'debug'}>
        <NavLinkItem route={routes?.examples} />
      </AccessControl>

      <AccessControl fallback={null} permissionsRequired={'debug'}>
        <NavLinkItem route={routes?.appContext} />
      </AccessControl>
    </>
  )
}
