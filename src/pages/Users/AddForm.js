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
import dataURLtoFile from '@/utils/miscellaneous/dataURLtoFile'

import deepMerge from '@/utils/obj/deepMerge'

const inputLabels = {
  name: 'Name',
  email: 'Email',
  password: 'Password',
  mobile: 'Mobile',
  salary: 'Salary',
  dob: 'Date of Birth',
  doj: 'Date of Joining',
  address: 'Address',
  role: 'Role',
  profile_pic: 'Profile Pic',
  // user_type: 'User Type',
  // active: 'Active',
  // education: 'Education',
}

const initialValues = {
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
}

export default function UserAddForm({ isEdit, initialData }) {
  const [image, setImage] = React.useState()

  const handleImageChange = (base64, file) => {
    setImage(base64)
  }

  const transformValues = (values) => {
    return {
      ...values,
      dob: values.dob.toISOString(),
      doj: values.doj.toISOString(),
      profile_pic:
        values?.profile_pic?.name &&
        dataURLtoFile(image, values?.profile_pic?.name),
    }
  }

  const handleSubmit = async (values, actions, rowValues) => {
    console.log('AddForm.js::[25] values', values, rowValues)

    Api.users
      .create(values)
      .then(Api.utils.getRes)
      .then(Api.utils.successMessage)
      .then(actions.resetForm)
      .catch((e) => actions?.setErrors(e?.response?.data?.errors))
      .finally(() => actions?.setSubmitting(false))

    wait(1000).then(() => {})
  }

  return (
    <>
      <FormikForm
        debug={'*'}
        // debug={['isSubmitting']}
        castFormData
        initialValues={deepMerge(initialValues, initialData)}
        validationSchema={addUserSchema()}
        onSubmit={handleSubmit}
        transformValues={transformValues}
        inputLabels={inputLabels}
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
              type="date"
              name="dob"
              label="Date of birth"
              placeholder="mm/dd/yyyy"
            />

            <DateFormik
              className={'flex-1'}
              type="date"
              name="doj"
              label="Date of joining"
              placeholder="mm/dd/yyyy"
            />
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <InputFormik
              className={'flex-1'}
              as="textarea"
              type="textarea"
              name="address"
              label="Address and notes"
              placeholder="Full Address"
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
    </>
  )
}

export const UserAddFormContainer = ({ ...props }) => {
  return (
    <div className="px-5 py-8 bg-white border shadow-md ">
      <UserAddForm {...props} />
    </div>
  )
}
