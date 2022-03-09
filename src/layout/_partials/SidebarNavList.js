import React from 'react'
import { NavLinkItem } from './NavLinkItem'

export default function SidebarNavList({ routes }) {
  return (
    <>
      <NavLinkItem route={routes?.expenseCreate} />
      <NavLinkItem route={routes?.incomeCreate} />
      <NavLinkItem route={routes?.estimateCreate} />
      <NavLinkItem route={routes?.projectCreate} />
      <NavLinkItem route={routes?.userCreate} />
      <NavLinkItem route={routes?.expenses} />
      <NavLinkItem route={routes?.incomes} />
      <NavLinkItem route={routes?.estimates} />
      <NavLinkItem route={routes?.salaries} />
      <NavLinkItem route={routes?.funds} />
      <NavLinkItem route={routes?.projects} />
      <NavLinkItem route={routes?.users} />
      <NavLinkItem route={routes?.transaction} />
      <NavLinkItem route={routes?.dealers} />
      <NavLinkItem route={routes?.examples} />
      <NavLinkItem route={routes?.appContext} />
    </>
  )
}
