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
import validationSchemaCb from './_partials/validationSchemaCb'

const initialValues = {
  id: '',
  received_by: '',
  project_id: '',
  transaction_id: '',
  from: '',
  amount: '',
  date: '',
  particular: '',
  desc: '',
}

export default function IncomeForm({
  isEdit,
  initialData,
  onSuccess = () => {},
}) {
  const modalCtx = useModalContext()
  const appContext = useAppContext()

  React.useEffect(() => {
    if (!appContext?.staticData?.transactions?.length) {
      appContext?.fetchTransaction?.()
    }
    if (!appContext?.staticData?.projects?.length) {
      appContext?.fetchProjects?.()
    }
  }, [])

  const mutation = useMutation(Api.incomes.create)
  // const mutationEdit = useMutation(Api.incomes.update)
  const mutationOptions = (actions) => {
    return {
      onSuccess: (res) => {
        // console.log('Form.js::[56] onSuccess', res, actions)
        Api.utils.notifySuccess(res)
        actions.resetForm()
        modalCtx?.close()
        onSuccess()
      },
      onError: (error, variables, context) => {
        // console.log('Form.js::[59] error', { error, variables })
        actions?.setErrors(error?.response?.data?.errors)
      },
      // Just like finally, but for mutation
      onSettled: (data, error, variables, context) => {
        actions?.setSubmitting(false)
      },
    }
  }

  const handleSubmit = async (values, actions, rowValues) => {
    // console.log('Form.js::[54] values, rowValues', values, rowValues)
    mutation.mutate(values, mutationOptions(actions))
  }

  return (
    <>
      <FormikForm
        // debug={'*'}
        debug={['values', 'errors']}
        initialValues={deepMerge(initialValues, omitVal(initialData, null))}
        onSubmit={handleSubmit}
        validationSchema={validationSchemaCb(isEdit)}
        // inputLabels={projectInputLabels}
        // transformValues={transformValues}
        // castFormData
      >
        <h3 className="my-2 text-xl">New Income</h3>

        <div className="space-y-3">
          <div className="flex flex-col gap-3 md:flex-row">
            <InputFormik
              isRequired
              className={'flex-1'}
              name="from"
              label="From"
              placeholder="Person name"
            />
            <InputFormik
              isRequired
              className={'flex-1'}
              name="particular"
              label="Particular"
              placeholder="Reflected on client recept"
            />

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
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <InputFormik
              isRequired
              type="number"
              className={'flex-1'}
              name="amount"
              label="Amount (RS)"
            />
            <DateFormik
              isRequired
              className={'flex-1 '}
              name="date"
              label="Received at"
              placeholder="mm/dd/yyyy"
            />
            <InputSelectFormik
              clearable
              // searchable
              // delay={1500}
              label="Transaction type"
              placeholder="Transaction type"
              options={appContext?.staticData?.transactions || []}
              selectCallback={(value) => value?.id || value?.label}
              name="transaction_id"
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
              label="Extra note"
              placeholder="Description of the income"
              rows="3"
            />
          </div>

          {/* <div className="flex flex-col gap-3 md:flex-row">
            <RadioButtonFormik
              className={'flex-1'}
              name="transaction_format"
              label="Transaction Format"
              options={[
                {
                  value: 'cash',
                  label: 'Cash',
                },
                {
                  value: 'account',
                  label: 'Account',
                },
              ]}
            />
          </div> */}
        </div>
        <ButtonFormik as={Button} className="mt-5">
          {isEdit ? 'Update' : 'Submit'}
        </ButtonFormik>
      </FormikForm>
    </>
  )
}

export const IncomeFormContainer = ({ ...props }) => {
  return (
    <div className="px-5 py-3 bg-white border shadow-md dark:bg-gray-900 dark:border-gray-700 ">
      <IncomeForm {...props} />
    </div>
  )
}
