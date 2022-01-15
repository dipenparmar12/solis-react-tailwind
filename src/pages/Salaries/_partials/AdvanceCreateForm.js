import React from 'react'
import * as yup from 'yup'
import Button from '@/components/atoms/Button'
import { InputFormik } from '@/components/molecules/Form/InputApp'
import { DateFormik } from '@/components/molecules/Form/InputDate'
import ButtonFormik from '@/components/molecules/FormicApp/ButtonFormik'
import FormikForm from '@/components/molecules/FormicApp/FormFormik'
import { useModalContext } from '@/components/molecules/Modal/ModalV3'
import { useAppContext } from '@/context/AppContext'
import Api from '@/services/ApiService'
import deepMerge from '@/utils/obj/deepMerge'
import omitVal from '@/utils/obj/omitVal'
import { InputSelectFormik } from '@/components/molecules/Form/InputSelect'
import { useSalariesContext } from '..'

const initialValues = {
  // id: '',
  user_id: '',
  advance_amount: '',
  date: '',
}

export const InputLabels = {
  // id: 'ID',
  user_id: 'User',
  advance_amount: 'Amount',
  date: 'Date',
}

const validationSchemaCb = yup.object().shape({
  user_id: yup.string().required().nullable().label(InputLabels.user_id),
  advance_amount: yup
    .number('Invalid Amount')
    .required()
    .nullable()
    .min(100, 'Value must be more then 100 Rs ')
    .max(10000000, 'Too much!')
    .typeError('Value must be a number')
    .label(InputLabels.amount),
  date: yup
    .date()
    .required()
    .nullable()
    .max(new Date(), 'Date of birth can not be future date') // Date can be future date
    .typeError('Invalid date')
    .label(InputLabels.date),
})

export default function AdvanceCreateForm({
  isEdit,
  initialData,
  onSuccess = () => {},
}) {
  const { State: FundState = {}, setQry, qry, activeTab } = useSalariesContext()
  const modalCtx = useModalContext()
  const appContext = useAppContext()

  React.useEffect(() => {
    if (!appContext?.staticData?.users?.length) {
      appContext?.fetchUsers()
    }
  }, [])

  const handleSubmit = async (values, actions, rowValues) => {
    // console.log('AdvanceCreateForm.js::[37] values', values, rowValues)
    const apiCall = () => {
      if (isEdit && values?.id) {
        return Api.advances.update({
          id: values.id,
          data: values,
        })
      }
      return Api.advances.create(values)
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
  }

  return (
    <>
      <FormikForm
        debug={['values', 'errors']}
        initialValues={deepMerge(initialValues, omitVal(initialData, null))}
        validationSchema={validationSchemaCb}
        onSubmit={handleSubmit}
        // castFormData
        // transformValues={transformValues}
      >
        <div className="space-y-3">
          <div className="flex flex-col gap-3 md:flex-row">
            <InputSelectFormik
              isRequired
              searchable
              clearable
              className={'flex-1'}
              name="user_id"
              label="Select Users"
              placeholder="Select User"
              delay={300}
              options={appContext?.staticData?.users || []}
              selectCallback={(option) => option?.id || ''}
              valueField="id"
            />{' '}
            <InputFormik
              isRequired
              className={'flex-1 '}
              type="number"
              name="advance_amount"
              label="Advance"
              placeholder="Advance Amount"
            />
            <DateFormik
              isRequired
              className={'flex-1 '}
              name="date"
              label="Advance Date"
              placeholder="mm/dd/yyyy"
            />
          </div>
        </div>

        <ButtonFormik as={Button} className="mt-5">
          {isEdit ? 'Update' : 'Add Advance'}
        </ButtonFormik>
      </FormikForm>
    </>
  )
}
