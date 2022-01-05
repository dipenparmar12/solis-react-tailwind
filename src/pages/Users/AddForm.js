/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { wait } from '@testing-library/user-event/dist/utils'
import Button from '@/components/atoms/Button'
import FormikForm from '@/components/molecules/FormicApp/FormFormik'
import addUserSchema from './_partials/validationSchema'
import { InputFormik } from '@/components/molecules/Form/InputApp'
import { DateFormik } from '@/components/molecules/Form/InputDate'
import ButtonFormik from '@/components/molecules/FormicApp/ButtonFormik'
import RadioButton, {
  RadioButtonFormik,
} from '@/components/molecules/Form/RadioButton'

export default function UserAddForm() {
  return (
    <>
      <div className="px-5 py-8 bg-white border shadow-md ">
        <FormikForm
          debug={'*'}
          // debug={['isSubmitting']}
          initialValues={{
            name: '',
            email: '',
            password: '',
            mobile: '9871231233',
            salary: '',
            dob: '',
            doj: '',
            address: '',
            role: '',
            // profile_pic: '',
            // user_type: '',
            // active: '',
            // education: '',
          }}
          validationSchema={addUserSchema()}
          onSubmit={async (values, { setSubmitting }) => {
            // console.log('FormFormik.js::[25] submit', new Date().getTime())
            wait(2000).then(() => {
              setSubmitting(false)
            })
          }}
        >
          <div className="space-y-3">
            <div className="flex flex-col gap-3 md:flex-row">
              <RadioButtonFormik
                className={'flex-1'}
                name="role"
                label="User Role"
                options={[
                  { value: 'admin', label: 'Admin' },
                  { value: 'team', label: 'Team' },
                  { value: 'accountant', label: 'Accountant' },
                  { value: 'executive', label: 'Executive' },
                ]}
              />
            </div>

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
                type="number"
                min="6000000000"
                max="9999999999"
              />
              <InputFormik
                className={'flex-1'}
                name="salary"
                label="Salary"
                type="number"
              />
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              {/* <DateFormik
                className={'flex-1 text-red-700'}
                name="dob"
                label="Date of birth"
                type="date"
              />

              <DateFormik
                className={'flex-1'}
                name="doj"
                label="Date of joining"
                type="date"
              /> */}
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              {/* <InputFormik
                className={'flex-1'}
                as="textarea"
                name="address"
                label="Address and Notes"
                placeholder="Full Address"
                type="textarea"
                rows="3"
              /> */}
            </div>
          </div>

          <ButtonFormik as={Button} className="mt-5">
            Register
          </ButtonFormik>

          {/* <Button className="mt-5 " type="submit">
            Register
          </Button> */}
        </FormikForm>
      </div>
    </>
  )
}
