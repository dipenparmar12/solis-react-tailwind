/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import classNames from 'classnames'
import Button from '@/components/atoms/Button'
import ModalV1 from '@/components/molecules/Modal/ModalV1'
import InputV1 from '@/components/molecules/Form/InputV1'
import FormikForm from '@/components/molecules/FormicApp/FormFormik'
import get from '@/utils/obj/get'
import InputFormik from '@/components/molecules/FormicApp/Input'

export default function AddUser() {
  React.useEffect(() => {}, [])

  return (
    <>
      <div className="px-3 py-4 rounded shadow-md">
        <div>
          <FormikForm
            initialValues={{
              name: '',
              email: '',
              password: '',
              passwordConfirm: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true)
              console.log(values)
              setSubmitting(false)
            }}
            debug
          >
            <InputFormik name="name" label="Name" type="text" />
            <InputFormik name="password" label="password" type="password" />
          </FormikForm>
        </div>
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
