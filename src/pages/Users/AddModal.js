import React from 'react'
import Button from '@/components/atoms/Button'
import Modal from './Modal'

export default function AddUser() {
  return (
    <>
      <Button label={'Add User'} isWorking size="sm" />
      <Button label={'Add User'} isWorking size="md" />
      <Button label={'Add User'} size="lg" />
      <Button label={'Add User'} isWorking size="xl" />
      <Button label={'Add User'} isWorking size="2xl" />

      <Button label={'Add User'} disabled size="sm" />
      <Button label={'Add User'} disabled size="md" />
      <Button label={'Add User'} disabled size="lg" />
      <Button label={'Add User'} disabled size="xl" />
      <Button label={'Add User'} disabled size="2xl" />

      <Modal
        renderButton={(modal) => (
          <Button onClick={modal.open} label={'Add User'} isWorking size="md" />
        )}
      />
    </>
  )
}
