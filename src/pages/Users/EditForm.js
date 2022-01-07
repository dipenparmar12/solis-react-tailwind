import React from 'react'
import { useModalContext } from '@/components/molecules/Modal/ModalV3'
import UserAddForm from './AddForm'

function UserEditForm({ data, ...props }) {
  const modalCtx = useModalContext()
  return (
    <UserAddForm
      {...props}
      isEdit
      initialData={data}
      onSuccess={modalCtx.onClose}
    />
  )
}

export default React.memo(UserEditForm)
