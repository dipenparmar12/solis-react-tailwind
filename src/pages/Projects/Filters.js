import React from 'react'
import InputApp from '@/components/molecules/Form/InputApp'
import ToggleAnim from '@/hoc/animation/ToggleAnim'
import SwitchSlide from '@/components/molecules/Form/SwitchSlide'
import { useProjectContext } from './ProjectContainer'
import InputDebounce from '@/components/molecules/Form/InputDebounce'

function ProjectFilters({ isVisible }) {
  const { State: ProjectState = {}, setQry, qry } = useProjectContext()
  return (
    <ToggleAnim isVisible={isVisible}>
      <div className="p-5 py-3 my-4 space-y-2 text-gray-400 border dark:border-gray-600">
        <div className="py-2 text-xl">Project Filters </div>
        <div className="flex gap-4 ">
          <InputDebounce
            isClearable
            className="flex-1"
            label="Title"
            onChangeDebounced={(e) => {
              const { value } = e.target
              value === ''
                ? setQry.omit('title')
                : setQry.merge({ title: value })
            }}
          />
          <InputDebounce
            className="flex-1"
            label="Client"
            onChangeDebounced={(e) => {
              const { value } = e.target
              value === ''
                ? setQry.omit('client')
                : setQry.merge({ client: value })
            }}
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
