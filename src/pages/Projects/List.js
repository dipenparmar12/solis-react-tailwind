/* eslint-disable react/no-array-index-key */
import React from 'react'
import { RiFilter3Line, RiCloseFill, RiCloseLine } from 'react-icons/ri'
import classNames from 'classnames'
import PaginatorV1 from '@/components/molecules/PaginationV1/PaginatorV1'
import ErrorState from '@/components/atoms/ErrorState'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import Button from '@/components/atoms/Button'
import { useProjectContext } from './ProjectContainer'
import { CardLoading } from '@/components/atoms/LoadingSkeleton'
import Print from '@/components/atoms/Print'
import ProjectCard from './Card'
import ProjectForm from './ProjectForm'
import CardV1 from '@/components/atoms/CardV1'
import InputApp from '@/components/molecules/Form/InputApp'
import ToggleAnim, { TestAnimExample } from '@/hoc/animation/ToggleAnim'
import useToggle from '@/hooks/useToggle'
import SwitchSlide from '@/components/molecules/Form/SwitchSlide'
import ProjectFilters from './Filters'
import capitalize from '@/utils/str/capitalize'
import Badge from '@/components/atoms/Badge'
import BadgeButton from '@/components/atoms/BadgeButton'

export default function UserList() {
  const { State: ProjectState = {}, setQry, qry } = useProjectContext()
  const [filtersVisible, setFilterVisible] = useToggle(true)

  return (
    <>
      <div className={'container pb-20'}>
        <PaginatorV1
          label={'Projects'}
          setPage={(option) => {
            setQry({ page: option?.value || option })
          }}
          setPerPage={(option) => {
            setQry({ page: 1, per_page: option?.value || option })
          }}
          totalRecords={ProjectState?.paginationData?.total || 0}
          pageSize={ProjectState?.paginationData?.per_page || 0}
          currentPage={ProjectState?.paginationData?.current_page || 0}
          loading={ProjectState?.loading}
          siblingCount={1}
        />

        <div className="flex justify-between my-4">
          <ModalV3
            renderButton={({ setOpen }) => (
              <Button size="md" onClick={setOpen}>
                New Project
              </Button>
            )}
          >
            <div className="px-2">
              <h3 className="mb-2 text-xl ">Add new project</h3>
              <ProjectForm onSuccess={ProjectState?.reload} />
            </div>
          </ModalV3>
          <Button onClick={setFilterVisible.toggle}>
            <RiFilter3Line className="inline-block mb-1" /> Filters
          </Button>
        </div>

        <ProjectFilters isVisible={filtersVisible} />

        <div className="flex gap-2 pt-2">
          {/* Filter Badges */}
          {Object.entries(qry || {}).map(([filterKey, value]) => (
            <div key={filterKey} className="">
              <BadgeButton
                variant="green"
                icon={RiCloseLine}
                onClick={() => {}}
              >
                {capitalize(filterKey)}: {value}
              </BadgeButton>
            </div>
          ))}
        </div>

        <ErrorState error={!ProjectState?.loading && ProjectState?.error} />

        <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-5 ">
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
