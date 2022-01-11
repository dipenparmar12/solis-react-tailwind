/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { wait } from '@testing-library/user-event/dist/utils'
import * as yup from 'yup'
import Button from '@/components/atoms/Button'
import FormikForm from '@/components/molecules/FormicApp/FormFormik'
import ButtonFormik from '@/components/molecules/FormicApp/ButtonFormik'
import { InputFormik } from '@/components/molecules/Form/InputApp'
import { RadioButtonFormik } from '@/components/molecules/Form/RadioButton'
import Api from '@/services/ApiService'
import deepMerge from '@/utils/obj/deepMerge'
import omitVal from '@/utils/obj/omitVal'
import { useModalContext } from '@/components/molecules/Modal/ModalV3'

const initialValues = {
  id: '',
  type: '',
  desc: '',
  status: '1',
}

export default function TransactionForm({
  isEdit,
  initialData,
  onSuccess = () => {},
}) {
  const modalCtx = useModalContext()

  const handleSubmit = async (values, actions, rowValues) => {
    // console.log('AddForm.js::[75] values', values, rowValues)
    const apiCall = () => {
      if (isEdit && values?.id) {
        return Api.transactions.update({
          id: values.id,
          data: values,
        })
      }
      return Api.transactions.create(values)
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
        debug
        initialValues={deepMerge(initialValues, omitVal(initialData, null))}
        validationSchema={yup.object().shape({
          type: yup.string().nullable().required('Type is required'),
          desc: yup.string().nullable().label('Description'),
          status: yup.string().nullable().label('Status'),
        })}
        onSubmit={handleSubmit}
      >
        <div className="space-y-3">
          <div className="flex flex-col gap-3 md:flex-row">
            <InputFormik
              isRequired
              className={'flex-1'}
              name="type"
              label="Transaction Type"
              placeholder="Transaction Type"
            />
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <InputFormik
              className={'flex-1'}
              as="textarea"
              type="textarea"
              name="desc"
              label="Description"
              placeholder="Transaction Description"
              rows="3"
              cols="18"
            />
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <RadioButtonFormik
              className={'flex-1'}
              name="status"
              label="Transaction Status"
              options={[
                { value: '1', label: 'Active' },
                { value: '0', label: 'InActive' },
              ]}
            />
          </div>

          {/* <div className="flex flex-col gap-3 md:flex-row">
            <div className="mb-4">
              <ImageUploadFormik
                className={'flex-1'}
                name="profile_pic"
                placeholder="Drop your image here"
                label="Select Profile Picture"
                getBase64={handleImageChange}
              />
            </div>
          </div> */}
        </div>

        <ButtonFormik as={Button} className="mt-5">
          {isEdit ? 'Update' : 'Submit'}
        </ButtonFormik>
      </FormikForm>
    </>
  )
}

// export const TransactionContainer = ({ ...props }) => {
//   return (
//     <div className="px-5 py-8 bg-white border shadow-md ">
//       <TransactionForm {...props} />
//     </div>
//   )
// }
