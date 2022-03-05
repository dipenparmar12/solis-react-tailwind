/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { wait } from '@testing-library/user-event/dist/utils'
import { useMutation } from 'react-query'
import Button from '@/components/atoms/Button'
import FormikForm from '@/components/molecules/FormicApp/FormFormik'
import ButtonFormik from '@/components/molecules/FormicApp/ButtonFormik'
import { InputFormik } from '@/components/molecules/Form/InputApp'
import { DateFormik } from '@/components/molecules/Form/InputDate'
import Api from '@/services/ApiService'

import deepMerge from '@/utils/obj/deepMerge'
import { useModalContext } from '@/components/molecules/Modal/ModalV3'
import { useAppContext } from '@/context/AppContext'
import omitVal from '@/utils/obj/omitVal'
import Print from '@/components/atoms/Print'
import { InputSelectFormik } from '@/components/molecules/Form/InputSelect'

const initialValues = {
  id: '',
  project_id: '',
  s_date: '',
  e_date: '',
  desc: '',
  estimates: [],
}

export default function EstimateForm({
  isEdit,
  initialData,
  onSuccess = () => {},
}) {
  const modalCtx = useModalContext()
  const appContext = useAppContext()

  React.useEffect(() => {
    if (
      !appContext?.staticData?.dealers?.length ||
      !appContext?.staticData?.projects?.length
    ) {
      appContext.setResources(['projects', 'dealers'])
    }
  }, [])

  const mutation = useMutation(Api.estimates.create)
  const mutationOptions = (actions) => {
    return {
      onSuccess: (res) => {
        Api.utils.notifySuccess(res)
        actions.resetForm()
        modalCtx?.close()
        onSuccess()
      },
      onError: (error, variables, context) => {
        actions?.setErrors(error?.response?.data?.errors)
      },
      // Just like finally, but for mutation
      onSettled: (data, error, variables, context) => {
        actions?.setSubmitting(false)
      },
    }
  }

  const handleSubmit = async (values, actions, rowValues) => {
    // console.log('Create.js::[70] values, rowValues', values, rowValues)
    mutation.mutate(values, mutationOptions(actions))
  }

  return (
    <>
      <button
        onClick={() => {
          appContext.setResources([
            'projects',
            'transactions',
            // {
            //   transactions: (v) => v,
            // },
          ])
        }}
      >
        Fetch
      </button>
      <FormikForm
        // debug={'*'}
        debug={['values', 'errors']}
        initialValues={deepMerge(initialValues, omitVal(initialData, null))}
        onSubmit={handleSubmit}
        // validationSchema={validationSchemaCb(isEdit)}
        // inputLabels={projectInputLabels}
        // transformValues={transformValues}
        // castFormData
      >
        <h3 className="my-2 text-xl">New Estimate</h3>

        <div className="space-y-3">
          <div className="flex flex-col gap-3 md:flex-row">
            <InputSelectFormik
              clearable
              // searchable
              // delay={1500}
              isRequired
              className={'flex-1'}
              label="Project"
              placeholder="Select Project"
              options={appContext?.staticData?.projects || []}
              selectCallback={(value) => value?.id || value?.label}
              name="project_id"
              valueField="id"
              keepSelectedInList={false}
            />
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
            <InputSelectFormik
              clearable
              // searchable
              // delay={1500}
              isRequired
              className={'flex-1'}
              label="Vendor"
              placeholder="Select Vendor"
              options={appContext?.staticData?.dealers || []}
              selectCallback={(value) => value?.id || value?.label}
              name="dealer_id"
              valueField="id"
              keepSelectedInList={false}
            />
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <InputFormik
              className={'flex-1'}
              as="textarea"
              type="textarea"
              name="desc"
              label="Description"
              placeholder="Description of the income"
              rows="3"
            />
          </div>
        </div>

        <ButtonFormik as={Button} className="mt-5">
          {isEdit ? 'Update' : 'Submit'}
        </ButtonFormik>
      </FormikForm>
    </>
  )
}

export const EstimateFormContainer = ({ ...props }) => {
  return (
    <div className="px-5 py-3 bg-white border shadow-md dark:bg-gray-900 dark:border-gray-700 ">
      <EstimateForm {...props} />
    </div>
  )
}
