/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable camelcase */
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
import { useSalariesContext } from '@/pages/Salaries/index'
import UserAdvanceTable from '@/pages/Salaries/_partials/UserAdvanceTable'
import CardV2 from '@/components/atoms/CardV2'
import CardV1 from '@/components/atoms/CardV1'
import formatRs from '@/utils/str/formatRs'
import { isDevEnv } from '@/utils/environment'

const initialValues = {
  // id: '',
  user_id: '',
  salary_amount: '',
  deduction: '',
  month_year: '',
}

export const InputLabels = {
  // id: 'ID',
  user_id: 'User',
  salary_amount: 'Salary Amount',
  deduction: 'Deduction Amount',
  month_year: 'Date',
}

const validationSchemaCb = yup.object().shape({
  user_id: yup
    .string()
    .trim()
    .required()
    .nullable()
    .label(InputLabels.month_year),
  salary_amount: yup
    .number()
    .required()
    .nullable()
    .default(isDevEnv ? 1000 : '')
    .min(isDevEnv ? 10 : 100, 'Amount must be more then 20 rs')
    .max(1000000, 'Too much!')
    .typeError('Value must be a number')
    .label(InputLabels.salary_amount),
  deduction: yup
    .number()
    .min(isDevEnv ? 10 : 100, 'Deduction amount must be more then 50 rs')
    .max(1000000, 'Too much!')
    .when(
      'salary_amount',
      (value, schema) =>
        value &&
        schema.max(value, `Deduction amount must be less then ${value} rs`),
    )
    .label(InputLabels.deduction),
  month_year: yup
    .date()
    .required()
    .nullable()
    .typeError('Invalid')
    .label(InputLabels.month_year),
})

export default function SalaryCreateForm({
  isEdit,
  initialData,
  onSuccess = () => {},
}) {
  const { State: FundState = {}, setQry, qry, activeTab } = useSalariesContext()
  const modalCtx = useModalContext()
  const appContext = useAppContext()
  const formikRef = React.useRef()

  React.useEffect(() => {
    if (!appContext?.staticData?.users?.length) {
      appContext.setResources(['users'])
    }
  }, [])

  const handleSubmit = async (values, actions, rowValues) => {
    // console.log('AdvanceCreateForm.js::[37] values', values, rowValues, actions)
    Api.salaries
      .create(values)
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
      <CardV2 className={''}>
        <FormikForm
          debug={['values', 'errors']}
          initialValues={deepMerge(initialValues, omitVal(initialData, null))}
          validationSchema={validationSchemaCb}
          onSubmit={handleSubmit}
          innerRef={formikRef}
        >
          <div className={'flex gap-5'}>
            <div className="flex-1 p-2 space-y-3">
              <div className="flex flex-col gap-3">
                <InputSelectFormik
                  isRequired
                  searchable
                  clearable
                  className={'flex-1'}
                  name="user_id"
                  label="Select User"
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
                  name="salary_amount"
                  label="Amount"
                  placeholder="Salary Amount"
                />
                <InputFormik
                  isRequired
                  className={'flex-1 '}
                  type="number"
                  name="deduction"
                  label="Deduction"
                  placeholder="Deduction Amount"
                />
                <DateFormik
                  isRequired
                  className={'flex-1 '}
                  name="month_year"
                  label="Salary Date"
                  placeholder="mm/dd/yyyy"
                />
              </div>
              <div>
                <ButtonFormik
                  as={Button}
                  variant="reset"
                  className="mt-5 px-6 py-1 btn_subtle__blue"
                >
                  {isEdit ? 'Update' : 'Submit'}
                </ButtonFormik>
              </div>
            </div>

            <SalaryStatusCard values={formikRef.current?.values || {}} />
          </div>

          <UserAdvanceTable />
        </FormikForm>
      </CardV2>
    </>
  )
}

const SalaryStatusCard = ({ values }) => {
  // const [values, setValues] = React.useState(parentValues)
  // React.useEffect(() => {
  //   setValues(parentValues)
  //   console.log('SalaryCreateForm.js::[164]', values)
  // }, [parentValues])

  const { salary_amount, deduction } = values || {}
  return (
    <CardV2 className={'flex-1 dark:border-sky-800'}>
      <ul className="flex flex-col justify-around h-full">
        <li className="flex items-center justify-between h-full px-4 py-4 border-b dark:border-gray-800 ">
          <div>
            <div className="text-lg text-gray-600 dark:text-gray-400">
              Net salary
            </div>
            <div className="text-gray-500 "> Monthly payable </div>
          </div>
          <div className="text-lg text-gray-700 dark:text-gray-400">
            {formatRs(salary_amount)}
          </div>
        </li>
        <li className="flex items-center justify-between h-full px-4 py-4 border-b dark:border-gray-800 ">
          <div>
            <div className="text-lg text-gray-600 dark:text-gray-400">
              Deductions
            </div>
            <div className="text-gray-500">
              EMI or any other deduction from salary{' '}
            </div>
          </div>
          <div className="text-lg text-red-500 ">{formatRs(deduction)}</div>
        </li>
        <li className="flex items-center justify-between h-full px-4 py-4 border-b dark:border-gray-800 ">
          <div>
            <div className="text-lg text-gray-600 dark:text-gray-400">
              Payable salary
            </div>
            <div className="text-gray-500">In-hand amount</div>
          </div>
          <div className="text-xl text-green-600 ">
            {formatRs(salary_amount - deduction)}
          </div>
        </li>
        <li className="flex items-center justify-between h-full px-4 py-2 ">
          <div>
            <div className="text-lg text-gray-500">
              Outstanding advance after deduction
            </div>
          </div>
          <div className="text-lg text-gray-700 dark:text-gray-400">#todo</div>
        </li>
      </ul>
    </CardV2>
  )
}
