import React from 'react'
import UserAddForm from './AddForm'
import { useUserContext } from './UserContainer'
import { useModalContext } from '@/components/molecules/Modal/ModalV3'

function UserEditForm({ data, ...props }) {
  // const modalCtx = useModalContext()
  const userContext = useUserContext()
  return (
    <UserAddForm
      {...props}
      isEdit
      initialData={data}
      onSuccess={(e) => {
        // modalCtx.onClose()
        userContext?.UsersState?.reload()
      }}
    />
  )
}

export default React.memo(UserEditForm)
