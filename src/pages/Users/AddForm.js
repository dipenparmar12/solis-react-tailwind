/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import Button from '@/components/atoms/Button'
import FormikForm from '@/components/molecules/FormicApp/FormFormik'
import InputFormik from '@/components/molecules/FormicApp/Input'
import addUserSchema from './_partials/validationSchema'

export default function UserAddForm() {
  return (
    <>
      <div className="px-5 py-8 bg-white border shadow-md ">
        <FormikForm
          debug={'*'}
          initialValues={{
            name: '',
            email: '',
            password: '',
            mobile: '',
            salary: '',
            dob: '',
            doj: '',
            address: '',
            // profile_pic: '',
            // user_type: '',
            // role: '',
            // active: '',
            // education: '',
          }}
          validationSchema={addUserSchema()}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true)
            console.log(values)
            setSubmitting(false)
          }}
        >
          <div className="space-y-3">
            <div className="flex flex-col gap-3 md:flex-row">
              <InputFormik
                isRequired
                className={'flex-1'}
                name="email"
                label="Email"
                placeholder="User Email"
                type="email"
              />
              <InputFormik
                isRequired
                className={'flex-1'}
                name="password"
                label="Password"
                type="password"
                placeholder="Login Password"
              />
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <InputFormik
                className={'flex-1'}
                name="name"
                label="Full Name"
                type="text"
              />
              <InputFormik
                className={'flex-1'}
                isRequired
                name="mobile"
                label="Mobile number"
                type="text"
              />
              <InputFormik
                className={'flex-1'}
                name="salary"
                label="Salary"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <InputFormik
                className={'flex-1'}
                as="textarea"
                name="address"
                label="Address and Notes"
                placeholder="Full Address"
                type="textarea"
                rows="3"
              />
            </div>
          </div>

          <Button className="mt-5 " type="submit">
            Register
          </Button>
        </FormikForm>
      </div>
    </>
  )
}
