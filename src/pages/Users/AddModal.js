/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import Button from '@/components/atoms/Button'
import Random from '@/utils/faker/random'
import ModalV1 from '@/components/molecules/ModalV1/ModalV1'

export default function AddUser() {
  return (
    <>
      <ModalV1
        renderButton={(modal) => (
          <Button onClick={modal.open} label={'Add User'} size="md" />
        )}
        renderContent={(modal) => <> Empty </>}
      />
    </>
  )
}
