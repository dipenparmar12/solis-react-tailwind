/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import classNames from 'classnames'
import Button from '@/components/atoms/Button'
import Random from '@/utils/faker/random'
import ModalV1 from '@/components/molecules/Modal/ModalV1'
import InputV1 from '@/components/molecules/Form/InputV1'

export default function AddUser() {
  const [isError, setTest] = React.useState(false)
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
            error={'This is error'}
          />
          <fieldset>
            <label
              className="block mb-1 text-gray-700"
              htmlFor="user_name"
              onClick={() => setTest(!isError)}
            >
              Error Name
            </label>
            <input
              autoComplete="name"
              type="text"
              name="username"
              defaultValue={'dipen parmar12'}
              className={classNames([
                'outline-none w-full ',
                'block rounded-lg border border-transparent text-gray-700',
                'py-2 px-4 bg-gray-100',
                'hover:bg-white hover:border-blue-300 hover:shadow-outline-blue',
                'active:bg-white',
                'focus:bg-white focus:border focus:shadow-outline-blue focus:border-blue-300 focus:shadow-outline',
                'transition duration-200 ease-in-out',
                isError &&
                  'bg-red-100/80 text-red-400  hover:bg-red-100/80 active:bg-red-100/80 focus:bg-red-100/80',
              ])}
            />
            {isError && (
              <div className="px-1 text-sm italic text-red-400 ">
                Something went wrong Something
              </div>
            )}
          </fieldset>
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
