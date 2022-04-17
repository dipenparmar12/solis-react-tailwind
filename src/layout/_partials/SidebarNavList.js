import React from 'react'
import { NavLinkItem } from './NavLinkItem'
import AccessControl from '@/components/atoms/AccessControl'

export default function SidebarNavList({ routes }) {
  return (
    <>
      {/* fallback=null <
      AccessControl permissions={'payment-create'} /> */}

      <AccessControl fallback={null} permissions={'expense-create'}>
        <NavLinkItem route={routes?.expenseCreate} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'fund-create'}>
        <NavLinkItem route={routes?.fundCreate} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'income-create'}>
        <NavLinkItem route={routes?.incomeCreate} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'estimate-create'}>
        <NavLinkItem route={routes?.estimateCreate} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'project-create'}>
        <NavLinkItem route={routes?.projectCreate} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'user-create'}>
        <NavLinkItem route={routes?.userCreate} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'dealer-create'}>
        <NavLinkItem route={routes?.dealerPaymentCreate} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'dealer-list-all'}>
        <NavLinkItem route={routes?.dealers} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'project-list-all'}>
        <NavLinkItem route={routes?.projects} />
      </AccessControl>

      <AccessControl
        fallback={null}
        permissions={['expense-list-all', 'expense-list-self']}
      >
        <NavLinkItem route={routes?.expenses} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'income-list-all'}>
        <NavLinkItem route={routes?.incomes} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'estimate-list-all'}>
        <NavLinkItem route={routes?.estimates} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'salary-list-all'}>
        <NavLinkItem route={routes?.salaries} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'fund-list-all'}>
        <NavLinkItem route={routes?.funds} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'user-list-all'}>
        <NavLinkItem route={routes?.users} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'transaction-list'}>
        <NavLinkItem route={routes?.transaction} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'debug'}>
        <NavLinkItem route={routes?.permissions} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'debug'}>
        <NavLinkItem route={routes?.examples} />
      </AccessControl>

      <AccessControl fallback={null} permissions={'debug'}>
        <NavLinkItem route={routes?.appContext} />
      </AccessControl>
    </>
  )
}
