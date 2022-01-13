import React from 'react'
import Print from '@/components/atoms/Print'
import { useAppContext } from '@/context/AppContext'

export default function AppContextState() {
  const appContext = useAppContext()
  return <Print>{appContext}</Print>
}
