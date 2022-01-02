/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import * as yup from 'yup'
import Button from '@/components/atoms/Button'
import FormikForm from '@/components/molecules/FormicApp/FormFormik'
import InputFormik from '@/components/molecules/FormicApp/Input'

export default function UserAddForm() {
  return (
    <>
      <div className="px-5 py-8 bg-white border shadow-md ">
        <FormikForm
          debug={'*'}
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
          <div className="flex flex-col gap-3 md:flex-row">
            <InputFormik
              name="name"
              label="Name"
              type="text"
              className={'flex-1'}
            />

            <InputFormik
              name="password"
              label="Password"
              type="password"
              className={'flex-1'}
            />
          </div>
          <Button className="mt-5 " type="submit">
            Register
          </Button>
        </FormikForm>
      </div>
    </>
  )
}
