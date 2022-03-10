import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import ContextFactory from '@/context/ContextFactory'
import ProjectCardList from '@/pages/Projects/CardList'
import useObject from '@/hooks/useObject'
import Api from '@/services/ApiService'
import Print from '@/components/atoms/Print'
import deepMerge from '@/utils/obj/deepMerge'
import ProjectList from '@/pages/Projects/List'

const [ProjectProvider, useProjectContext, Context] = ContextFactory({
  name: 'ProjectContext',
})
export { useProjectContext }

export default function ProjectsContext() {
  const [qry, setQry] = useObject({ page: 1, per_page: 10 })
  const queryClient = useQueryClient()

  // // Enable query params
  // const qryParams = useQryParams({ setParams: setQry.merge })
  // React.useEffect(() => {
  //   qryParams.set(qry)
  // }, [qry])

  // API call
  const apiState = useQuery(
    ['projects', qry],
    () => Api.projects.get({ qry }),
    {
      // staleTime: 60000,
    },
  )

  const apiStateMemo = React.useMemo(() => {
    const { data, total, ...rest } = apiState?.data?.data?.results || {}
    return {
      rest,
      data,
      total,
      isLoading: apiState?.isLoading,
    }
  }, [apiState])

  const contextValue = {
    State: apiStateMemo,
    qry,
    setQry,
    mutations: {},
  }

  // React.useEffect(() => {
  //   console.log('Context.js::[44] ', apiState)
  // }, [apiState])

  return (
    <ProjectProvider value={contextValue}>
      <ProjectList />
      {/* <ProjectCardList /> */}
      {/* <Print>{qry}</Print> */}
    </ProjectProvider>
  )
}
