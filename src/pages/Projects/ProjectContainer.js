/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react'
import useFetcher from '@/hooks/useFetcher'
import useMergeState from '@/hooks/useMergeState'
import useQryParams from '@/hooks/useQryParams'
import Api from '@/services/ApiService'
import ProjectList from './List'

const Context = React.createContext(null)
export const useProjectContext = () => React.useContext(Context)

const ProjectContainer = ({ children }) => {
  const [qry, setQry] = useMergeState({ per_page: 15 })
  const qryParams = useQryParams({ setParams: setQry })
  const resProjects = useFetcher({
    apiCall: Api.projects.get,
    qry,
    pagination: true, // TODO::10 Throw's error if api has pagination and ui doesn't
  })

  React.useEffect(() => {
    qryParams.set(qry)
  }, [qry])

  const contextValue = {
    State: resProjects,
    qry,
    setQry,
  }

  return (
    <Context.Provider value={contextValue}>
      <ProjectList />
    </Context.Provider>
  )
}

export default ProjectContainer
