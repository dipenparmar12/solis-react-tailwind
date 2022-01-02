/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import classNames from 'classnames'
import * as yup from 'yup'
import Button from '@/components/atoms/Button'
import ModalV1 from '@/components/molecules/Modal/ModalV1'
import InputV1 from '@/components/molecules/Form/InputV1'
import FormikForm from '@/components/molecules/FormicApp/FormFormik'
import get from '@/utils/obj/get'
import InputFormik from '@/components/molecules/FormicApp/Input'
import ModalV2 from '@/components/molecules/Modal/ModalV2'

export default function AddUser() {
  React.useEffect(() => {}, [])

  return (
    <>
      <ModalV2
        renderButton={(modal) => (
          <Button onClick={modal.open} label={'Add User'} size="md" />
        )}
        renderContent={(modal) => (
          <>
            <div className="max-w-2xl mx-auto overflow-x-auto">
              <div className="flex px-5 py-8 bg-white rounded shadow-md ">
                <FormikForm
                  // debug
                  initialValues={{
                    name: '',
                    password: '',
                  }}
                  validationSchema={yup.object().shape({
                    name: yup.string().min(5).required().label('Name'),
                    password: yup.number().min(5).required().label('Password'),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    console.log(values)
                    setSubmitting(false)
                  }}
                >
                  <InputFormik
                    name="name"
                    label="Name"
                    type="text"
                    className={'mb-3'}
                  />

                  <InputFormik
                    name="password"
                    label="Password"
                    type="password"
                  />
                  <Button className="mt-5 " type="submit">
                    Register
                  </Button>

                  <ModalV1
                    renderButton={(_modal) => (
                      <Button onClick={_modal.open} label={'Nested Modal'} />
                    )}
                    renderContent={(_modal) => {
                      return (
                        <>
                          <div className="max-w-2xl overflow-x-auto">
                            <div className="flex px-5 py-8 bg-white rounded shadow-md ">
                              Nested modal content
                            </div>
                          </div>
                        </>
                      )
                    }}
                  />
                </FormikForm>
              </div>
            </div>
          </>
        )}
      />

      {/* <ModalV1
        renderButton={(modal) => (
          <Button onClick={modal.open} label={'Add User'} size="md" />
        )}
        renderContent={(modal) => (
          <>
            <div className="max-w-2xl overflow-x-auto">
              <div className="flex px-5 py-8 bg-white rounded shadow-md ">
                <FormikForm
                  // debug
                  initialValues={{
                    name: '',
                    password: '',
                  }}
                  validationSchema={yup.object().shape({
                    name: yup.string().min(5).required().label('Name'),
                    password: yup.number().min(5).required().label('Password'),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    console.log(values)
                    setSubmitting(false)
                  }}
                >
                  <InputFormik
                    name="name"
                    label="Name"
                    type="text"
                    className={'mb-3'}
                  />

                  <InputFormik
                    name="password"
                    label="Password"
                    type="password"
                  />
                  <Button className="mt-5 " type="submit">
                    Register
                  </Button>

                  <ModalV1
                    renderButton={(_modal) => (
                      <Button onClick={_modal.open} label={'Nested Modal'} />
                    )}
                    renderContent={(_modal) => {
                      return (
                        <>
                          <div className="max-w-2xl overflow-x-auto">
                            <div className="flex px-5 py-8 bg-white rounded shadow-md ">
                              Nested modal content
                            </div>
                          </div>
                        </>
                      )
                    }}
                  />
                </FormikForm>
              </div>
            </div>
          </>
        )}
      /> */}
    </>
  )
}
