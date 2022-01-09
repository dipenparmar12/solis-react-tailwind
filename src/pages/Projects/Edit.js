import React from 'react'
import { useModalContext } from '@/components/molecules/Modal/ModalV3'
import ProjectForm from './ProjectForm'
import { useProjectContext } from './ProjectContainer'

function ProjectEditForm({ data, ...props }) {
  // const modalCtx = useModalContext()
  const projectContext = useProjectContext()
  return (
    <ProjectForm
      {...props}
      isEdit
      initialData={data}
      onSuccess={(e) => {
        // modalCtx.onClose()
        projectContext?.State?.reload()
      }}
    />
  )
}

export default React.memo(ProjectEditForm)
