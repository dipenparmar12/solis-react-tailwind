/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import classNames from 'classnames'
import Button from '@/components/atoms/Button'
import ModalV1 from '@/components/molecules/Modal/ModalV1'
import InputV1 from '@/components/molecules/Form/InputV1'

export default function AddUser() {
  return (
    <>
      <div className="px-3 py-4 rounded shadow-md">
        <div className="flex gap-3">
          <InputV1
            label="First Name"
            autoComplete="name"
            type="text"
            name="username"
            defaultValue={'dipen parmar12'}
            classNames={{
              container: 'flex-1',
            }}
          />
          <InputV1
            label="First Name"
            autoComplete="name"
            type="text"
            name="username"
            defaultValue={'dipen parmar12'}
            error={'This is error'}
            classNames={{
              container: 'flex-1',
            }}
          />
        </div>
        <Button className={'my-3'}>Register</Button>
      </div>
    </>
  )
}

/*
 <ModalV1
    renderButton={(modal) => (
      <Button onClick={modal.open} label={'Add User'} size="md" />
    )}
    renderContent={(modal) => (
      <>
        <div className="w-48 px-5 py-10 bg-white rounded">Hello word</div>
      </>
    )}
  />
*/
