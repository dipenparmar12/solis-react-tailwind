/* eslint-disable indent */
/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { wait } from '@testing-library/user-event/dist/utils'
import { useMutation } from 'react-query'
import { FieldArray, useFormikContext, getIn } from 'formik'
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
import EstimateValidators from './_partials/EstimateValidators'
import ErrorFeedback from '@/components/atoms/ErrorFeedback'

const initialValues = {
  id: '',
  project_id: '',
  s_date: '',
  e_date: '',
  desc: '',
  estimates: [
    {
      amount: 0,
    },
  ],
}

export default function EstimateCreate({
  isEdit,
  initialData,
  onSuccess = () => {},
}) {
  const modalCtx = useModalContext()
  const appContext = useAppContext()
  const [estimatesRows, setEstimatesRows] = React.useState([1, 2, 3])

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
      <FormikForm
        // debug={'*'}
        debug={['values', 'errors']}
        initialValues={deepMerge(initialValues, omitVal(initialData, null))}
        onSubmit={handleSubmit}
        validationSchema={EstimateValidators(isEdit)}
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

          <InputEstimates
            appContext={appContext}
            estimatesRows={estimatesRows}
            setEstimatesRows={setEstimatesRows}
          />

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
      <EstimateCreate {...props} />
    </div>
  )
}

const generateKey = (pre) => {
  return `${pre}__${new Date().getTime()}`
}

const ErrorMessage = ({ form, name }) => {
  const error = getIn(form.errors, name)
  const touch = getIn(form.touched, name)
  return touch && error ? (
    <div className={'text-red-400 mt-1 text-sm font-medium'}>{error}</div>
  ) : null
}

function InputEstimates({ appContext, estimatesRows, setEstimatesRows }) {
  const { setFieldValue, values, validateForm, ...formikProps } =
    useFormikContext()

  // React.useEffect(() => {
  //   Object.keys(values?.estimates || {}).forEach((index) => {
  //     setFieldValue(`estimates.${index}`, values?.estimates?.[index])
  //   })
  // }, [estimatesRows])

  return (
    <div>
      {
        <FieldArray
          name="estimates"
          render={(arrayHelpers) => (
            <div>
              {values?.estimates &&
                values?.estimates?.length > 0 &&
                values?.estimates?.map((estimate, index) => (
                  <div key={index} className="flex flex-col gap-3 md:flex-row">
                    <div className="flex-1">
                      <InputSelectFormik
                        // clearable
                        searchable
                        // delay={1500}
                        isRequired
                        className={'flex-1'}
                        label="Vendor"
                        placeholder="Select Vendor"
                        options={appContext?.staticData?.dealers || []}
                        selectCallback={(value) => value?.id || value?.label}
                        // name="dealer_id"
                        name={`estimates.${index}.dealer_id`}
                        valueField="id"
                        keepSelectedInList={false}
                      />

                      {/* <ErrorMessage
                        form={formikProps}
                        name={`estimates.${index}.dealer_id`}
                      /> */}

                      {/* <ErrorFeedback
                        error={
                          formikProps?.errors?.estimates?.[index]?.dealer_id
                        }
                      /> */}
                    </div>

                    <div className="flex-1">
                      <InputFormik
                        isRequired
                        type="number"
                        className={'flex-1'}
                        name={`estimates.${index}.amount`}
                        label="Amount"
                      />

                      {/* <ErrorFeedback
                        error={
                          formikProps?.errors?.estimates?.[index]?.dealer_id
                        }
                      /> */}
                    </div>

                    {values.estimates.length > 1 &&
                      estimatesRows.length > 1 &&
                      values.estimates.length === index + 1 && (
                        // // Remove btn only on last element
                        <div className="flex items-end py-2">
                          <Button
                            onClick={() => {
                              arrayHelpers.remove(index)
                              setEstimatesRows(
                                estimatesRows.filter((_, i) => i !== index),
                              )
                            }}
                            size="sm"
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                  </div>
                ))}

              <Button
                onClick={() => {
                  arrayHelpers.push('')
                  // arrayHelpers.insert(index, '')
                  setEstimatesRows([...estimatesRows, estimatesRows?.length])
                }}
                size="sm"
                type="button"
                className="mt-2"
              >
                Add Estimate
              </Button>
            </div>
          )}
        />
      }
    </div>
  )
}
