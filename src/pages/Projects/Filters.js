import React from 'react'
import InputApp from '@/components/molecules/Form/InputApp'
import ToggleAnim from '@/hoc/animation/ToggleAnim'
import SwitchSlide from '@/components/molecules/Form/SwitchSlide'

function ProjectFilters({ isVisible }) {
  return (
    <ToggleAnim isVisible={isVisible}>
      <div className="my-4 space-y-2 ">
        <div className="flex gap-4">
          <InputApp isClearable className="flex-1" label="Title " />
          <InputApp className="flex-1" label="Client " />
          <InputApp type="number" className="flex-1" label="Project Value " />
        </div>
        <div className="pt-3">
          <SwitchSlide
            className={'flex-1'}
            name="wip"
            label="Work in Progress"
            options={[
              { value: null, label: 'All ' },
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
