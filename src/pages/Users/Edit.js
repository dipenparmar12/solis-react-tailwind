import React from 'react'
import UserAddForm from './AddForm'
import { useUserContext } from '@/pages/Users/Context'

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
