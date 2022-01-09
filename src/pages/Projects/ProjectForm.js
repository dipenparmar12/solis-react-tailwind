/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { wait } from '@testing-library/user-event/dist/utils'
import Button from '@/components/atoms/Button'
import FormikForm from '@/components/molecules/FormicApp/FormFormik'
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
import validationSchemaCb, {
  projectInputLabels,
} from './_partials/validationSchemaCb'

const initialValues = {
  id: '',
  client: '',
  title: '',
  budget: '',
  s_date: '',
  e_date: '',
  location: '',
  p_type: '',
  sqft: '',
  address: '',
  wip: '1',
  // income: '',
  // expense: '',
}

export default function ProjectForm({
  isEdit,
  initialData,
  onSuccess = () => {},
}) {
  const [image, setImage] = React.useState()
  const modalCtx = useModalContext()
  const appContext = useAppContext()

  React.useEffect(() => {
    if (!appContext?.staticData?.property_types?.length) {
      appContext?.fetchPropertyTypes()
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
        return Api.projects.update({
          id: values.id,
          data: values,
        })
      }
      return Api.projects.create(values)
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
        validationSchema={validationSchemaCb(isEdit)}
        onSubmit={handleSubmit}
        transformValues={transformValues}
        inputLabels={projectInputLabels}
      >
        <div className="space-y-3">
          <div className="flex flex-col gap-3 md:flex-row">
            <InputFormik
              isRequired
              className={'flex-1'}
              name="client"
              label="Client Name"
              placeholder="Client fullname"
            />
            <InputFormik
              isRequired
              className={'flex-1'}
              name="title"
              label="Site Name"
              placeholder="Project title (Site name)"
            />
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <InputFormik
              isRequired
              type="number"
              className={'flex-1'}
              name="budget"
              label="Project Value (in RS)"
            />
            <InputFormik
              className={'flex-1'}
              type="number"
              name="sqft"
              label="Sqft"
            />
            <InputFormik
              className={'flex-1'}
              name="location"
              label="Location"
            />
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <DateFormik
              isRequired
              className={'flex-1 '}
              name="s_date"
              label="Start Date"
              placeholder="mm/dd/yyyy"
            />

            <DateFormik
              isRequired
              className={'flex-1'}
              name="e_date"
              label="End Date"
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
              name="p_type"
              label="Property Type"
              options={appContext?.staticData?.property_types || []}
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

          <div className="py-1" />
          <div className="flex flex-col gap-3 md:flex-row">
            <SwitchSlideFormik
              className={'flex-1'}
              name="wip"
              label="Work in Progress"
              options={[
                { value: 1, label: 'Working' },
                { value: 0, label: 'Finished' },
              ]}
            />
          </div>
        </div>

        <ButtonFormik as={Button} className="mt-5">
          {isEdit ? 'Update' : 'Create project'}
        </ButtonFormik>
      </FormikForm>
    </>
  )
}

export const ProjectFormContainer = ({ ...props }) => {
  return (
    <div className="px-5 py-8 bg-white border shadow-md ">
      <ProjectForm {...props} />
    </div>
  )
}
