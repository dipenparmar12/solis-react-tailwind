import React from 'react'
import InputApp from '@/components/molecules/Form/InputApp'
import ToggleAnim from '@/hoc/animation/ToggleAnim'
import SwitchSlide from '@/components/molecules/Form/SwitchSlide'
import { useProjectContext } from './ProjectContainer'

function ProjectFilters({ isVisible }) {
  const { State: ProjectState = {}, setQry, qry } = useProjectContext()

  return (
    <ToggleAnim isVisible={isVisible}>
      <div className="p-5 py-3 my-4 space-y-2 border">
        <div className="py-2 text-xl">Project Filters </div>
        <div className="flex gap-4">
          <InputApp value="" isClearable className="flex-1" label="Title " />
          <InputApp value="" className="flex-1" label="Client " />
          <InputApp
            value=""
            type="number"
            className="flex-1"
            label="Project Value "
          />
        </div>
        <div className="pt-3">
          <SwitchSlide
            className={'flex-1'}
            name="wip"
            label="Work in Progress"
            value={qry?.wip}
            onChange={(option) => {
              setQry?.merge({ wip: option?.value || option })
            }}
            options={[
              { value: '', label: 'All', onSet: () => setQry.omit('wip') },
              { value: 1, label: 'Working' },
              { value: 0, label: 'Finished' },
            ]}
          />
        </div>
      </div>
    </ToggleAnim>
  )
}

export default ProjectFilters
