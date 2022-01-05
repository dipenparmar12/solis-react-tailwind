/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { wait } from '@testing-library/user-event/dist/utils'
import Button from '@/components/atoms/Button'
import FormikForm from '@/components/molecules/FormicApp/FormFormik'
import addUserSchema from './_partials/validationSchema'
import ButtonFormik from '@/components/molecules/FormicApp/ButtonFormik'
import { InputFormik } from '@/components/molecules/Form/InputApp'
import { RadioButtonFormik } from '@/components/molecules/Form/RadioButton'
import { ImageUploadFormik } from '@/components/molecules/Form/ImageUpload'
import { DateFormik } from '@/components/molecules/Form/InputDate'
import Api from '@/services/ApiService'

export default function UserAddForm() {
  const [image, setImage] = React.useState()

  const handleImageChange = (base64, file) => {
    setImage(base64)
  }

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
            profile_pic: '',
            // user_type: '',
            // active: '',
            // education: '',
          }}
          validationSchema={addUserSchema()}
          onSubmit={async (
            values,
            { setSubmitting, getFormData, setErrors },
          ) => {
            wait(1000).then(() => {
              console.log('AddForm.js::[47] values', values)
              // TODO:::setErrors
              Api.users.create(getFormData()).catch((e) => {
                console.log('AddForm.js::[53] e.response', e.response)
              })
              setSubmitting(false)
            })
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
              <DateFormik
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
              <ImageUploadFormik
                className={'flex-1'}
                name="profile_pic"
                placeholder="Drop your image here"
                label="Select Profile Picture"
                getBase64={handleImageChange}
              />
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
