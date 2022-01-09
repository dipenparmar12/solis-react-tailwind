/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react'
import useFetcher from '@/hooks/useFetcher'
import useMergeState from '@/hooks/useMergeState'
import useQryParams from '@/hooks/useQryParams'
import Api from '@/services/ApiService'
import ProjectList from './List'

const context = React.createContext(null)
export const useProjectContext = () => React.useContext(context)

const ProjectContainer = ({ children }) => {
  const [apiQry, setApiQry] = useMergeState({ per_page: 15 })
  const qryParams = useQryParams({ setParams: setApiQry })
  const resProjects = useFetcher({
    apiCall: Api.projects.get,
    qry: apiQry,
    pagination: true, // TODO::10 Throw's error if api has pagination and ui doesn't
  })

  React.useEffect(() => {
    qryParams.set(apiQry)
  }, [apiQry])

  const contextValue = {
    State: resProjects,
    setApiQry,
  }

  return (
    <context.Provider value={contextValue}>
      <ProjectList />
    </context.Provider>
  )
}

export default ProjectContainer
