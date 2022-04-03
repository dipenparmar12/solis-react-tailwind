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
import formatDate from '@/utils/date/formatDate'
import useMergeState from '@/hooks/useMergeState'
import { useModalContext } from '@/components/molecules/Modal/ModalV3'
import { useAppContext } from '@/context/AppContext'
import omitVal from '@/utils/obj/omitVal'
import SwitchSlide, {
  SwitchSlideFormik,
} from '@/components/molecules/Form/SwitchSlide'

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
  active: 'User status',
  // user_type: 'User Type',
  // education: 'Education',
}

const initialValues = {
  id: '',
  name: '',
  email: '',
  password: '',
  mobile: '9871231233',
  salary: '',
  dob: '',
  doj: '',
  address: '',
  role_id: '',
  profile_pic: '',
  active: '1',
  // user_type: '',
  // education: '',
}

export default function UserAddForm({
  isEdit,
  initialData,
  onSuccess = () => {},
}) {
  const [image, setImage] = React.useState()
  const modalCtx = useModalContext()
  const appContext = useAppContext()

  React.useEffect(() => {
    if (!appContext?.staticData?.roles?.length) {
      appContext.setResources(['roles'])
    }
  }, [])

  const handleImageChange = (base64, file) => {
    setImage(base64)
  }

  const transformValues = (values) => {
    return {
      ...values,
      dob: values.dob && formatDate(values.dob, 'yyyy-MM-dd'),
      doj: values.doj && formatDate(values.doj, 'yyyy-MM-dd'),
      profile_pic:
        values?.profile_pic?.name &&
        dataURLtoFile(image, values?.profile_pic?.name),
    }
  }

  const handleSubmit = async (values, actions, rowValues) => {
    // console.log('AddForm.js::[75] values', values, rowValues)
    const apiCall = () => {
      if (isEdit && values?.id) {
        return Api.users.update({
          id: values.id,
          data: values,
        })
      }
      return Api.users.create(values)
    }

    apiCall()
      .then(Api.utils.getRes)
      .then(Api.utils.notifySuccess)
      .then((e) => {
        onSuccess(e)
        modalCtx?.onClose()
      })
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
        // castFormData
        initialValues={deepMerge(initialValues, omitVal(initialData, null))}
        validationSchema={addUserSchema(isEdit)}
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
              isRequired={!isEdit}
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
              name="role_id"
              label="User Role"
              options={appContext?.staticData?.roles || []}
              // options={[
              //   { value: 'admin', label: 'Admin' },
              //   { value: 'team', label: 'Team' },
              //   { value: 'accountant', label: 'Accountant' },
              //   { value: 'executive', label: 'Executive' },
              // ]}
            />
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <div className="mb-4">
              <ImageUploadFormik
                className={'flex-1'}
                name="profile_pic"
                placeholder="Drop your image here"
                label="Select Profile Picture"
                getBase64={handleImageChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <SwitchSlideFormik
              className={'flex-1'}
              name="active"
              label="User Status"
              options={[
                { value: 1, label: 'Active' },
                { value: 0, label: 'Deactivate' },
              ]}
            />
          </div>
        </div>

        <ButtonFormik
          as={Button}
          variant="reset"
          className="mt-5 px-6 py-1 btn_subtle__blue"
        >
          {isEdit ? 'Update' : 'Submit'}
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
    <div className="px-5 py-8 bg-white border shadow-md dark:bg-gray-900 dark:border-gray-700 ">
      <UserAddForm {...props} />
    </div>
  )
}
