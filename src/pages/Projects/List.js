/* eslint-disable react/no-array-index-key */
import React from 'react'
import PaginatorV1 from '@/components/molecules/PaginationV1/PaginatorV1'
import ErrorState from '@/components/atoms/ErrorState'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import Button from '@/components/atoms/Button'
import { useProjectContext } from './ProjectContainer'
import { CardLoading } from '@/components/atoms/LoadingSkeleton'
import Print from '@/components/atoms/Print'
import ProjectCard from './Card'

export default function UserList() {
  const { State: ProjectState = {}, setApiQry } = useProjectContext()

  return (
    <>
      <div className={'container pb-20'}>
        <PaginatorV1
          label={'Projects'}
          setPage={(option) => {
            setApiQry({ page: option?.value || option })
          }}
          setPerPage={(option) => {
            setApiQry({ page: 1, per_page: option?.value || option })
          }}
          totalRecords={ProjectState?.paginationData?.total || 0}
          pageSize={ProjectState?.paginationData?.per_page || 0}
          currentPage={ProjectState?.paginationData?.current_page || 0}
          loading={ProjectState?.loading}
          siblingCount={1}
        />

        <div className="my-3">
          <ModalV3
            renderButton={({ setOpen }) => (
              <Button size="md" onClick={setOpen}>
                New Project
              </Button>
            )}
          >
            <div className="px-2">
              <h3 className="mb-2 text-lg ">Create Project</h3>
              <div>TODO:: Project form</div>
              {/* <UserAddForm onSuccess={ProjectState?.reload} /> */}
            </div>
          </ModalV3>
        </div>
        <ErrorState error={!ProjectState?.loading && ProjectState?.error} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-5 ">
          {/* Data List */}
          {ProjectState?.data?.map((project, i) => {
            return (
              <React.Fragment key={`project__${project?.id}${i}`}>
                <ProjectCard key={`user__${Math.random()}`} data={project} />
                {/* <Print> {project} </Print> */}
              </React.Fragment>
            )
          })}

          {/* loading  */}
          <CardLoading loading={ProjectState?.loading} />
        </div>

        {/* <Print data={resUsers?.paginationData} maxHeight={'250px'} /> */}
      </div>
    </>
  )
}
