/* eslint-disable no-param-reassign */
/* eslint-disable indent */
/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { useMutation } from 'react-query'
import { useFormikContext } from 'formik'
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
import { ExpCategories } from '@/store/types'
import expenseSchemaCB from '@/pages/Expenses/_partials/expenseValidators'
import { usePermissionContext } from '@/context/PermissionContext'
import AccessControl from '@/components/atoms/AccessControl'

const initialValues = {
  id: '',
  project_id: '',
  dealer_id: '',
  transaction_id: '',
  amount: '',
  date: '',
  desc: '',
  particular: '',
  category: 'dealer',
}

export default function DealerPaymentCreate({
  isEdit,
  initialData,
  onSuccess = () => {},
}) {
  const modalCtx = useModalContext()
  const appContext = useAppContext()
  // const { authPermissions } = usePermissionContext()
  // const [estimatesRows, setExpensesRows] = React.useState([1, 2, 3])
  // const [files, setFiles] = React.useState([])

  React.useEffect(() => {
    if (
      !appContext?.staticData?.dealers?.length ||
      !appContext?.staticData?.transactions?.length
    ) {
      appContext.setResources(['dealers', 'transactions'])
    }
  }, [])

  const mutation = useMutation(Api.expenses.create)
  const mutationOptions = (actions) => {
    return {
      onSuccess: (res) => {
        Api.utils.notifySuccess(res)
        // actions.resetForm()
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
    // return actions?.setSubmitting(false)
    if (values.category !== ExpCategories.Project) {
      delete values.project_id
      delete values.dealer_id
    }
    mutation.mutate(values, mutationOptions(actions))
  }

  return (
    <>
      <AccessControl permissionsRequired={'payment-create'}>
        <FormikForm
          // debug={'*'}
          debug={['values', 'errors']}
          initialValues={deepMerge(initialValues, omitVal(initialData, null))}
          onSubmit={handleSubmit}
          validationSchema={expenseSchemaCB(isEdit)}
          // inputLabels={projectInputLabels}
          // transformValues={transformValues}
          // castFormData
        >
          <h3 className="my-2 text-xl">New Vendor Payment</h3>

          <div className="space-y-3">
            <ExpenseCreateFields />
          </div>

          <ButtonFormik
            as={Button}
            variant="reset"
            className="mt-5 px-6 py-1 btn_subtle__blue"
          >
            {isEdit ? 'Update' : 'Submit'}
          </ButtonFormik>
        </FormikForm>
      </AccessControl>
    </>
  )
}

export const DealerPaymentFormContainer = ({ ...props }) => {
  return (
    // <div className="px-5 py-3 bg-white border shadow-md dark:bg-gray-900 dark:border-gray-700 ">
    <DealerPaymentCreate {...props} />
    // </div>
  )
}

function ExpenseCreateFields() {
  const { setFieldValue, validateForm, ...formikProps } = useFormikContext()
  const appContext = useAppContext()

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row">
        <InputFormik
          isRequired
          className={'flex-1'}
          name="particular"
          label="Particular"
          placeholder="Reflected on client recept"
        />

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
          label="Date"
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
        <div className="flex-1">
          <InputSelectFormik
            clearable
            // searchable
            // delay={1500}
            isRequired
            label="Transaction type"
            placeholder="Transaction type"
            options={appContext?.staticData?.transactions || []}
            selectCallback={(value) => value?.id || value?.label}
            name="transaction_id"
            valueField="id"
            keepSelectedInList={false}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <InputFormik
          className={'flex-1'}
          as="textarea"
          type="textarea"
          name="desc"
          label="Description"
          placeholder="Description for this expense"
          rows="3"
        />
      </div>
    </>
  )
}
