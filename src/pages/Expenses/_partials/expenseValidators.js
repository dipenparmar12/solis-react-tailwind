/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as yup from 'yup'
import { ExpCategories } from '@/store/types'

export const ExpenseInputLabels = {
  id: 'ID',
  project_id: 'Project',
  dealer_id: 'Vendor',
  transaction_id: 'Transaction Type',
  date: 'Date',
  desc: 'Description',
  particular: 'Particular',
  category: 'Category',
}

export default function expenseSchemaCB(isEdit) {
  return yup.object().shape({
    category: yup
      .string()
      .required()
      .trim()
      .nullable()
      .label(ExpenseInputLabels.category),
    particular: yup
      .string()
      .required()
      .trim()
      .nullable()
      .label(ExpenseInputLabels.particular),

    project_id: yup
      .number()
      .nullable()
      .when(['category'], {
        is: (category) => category === ExpCategories.Project,
        then: yup.number().required(),
      })
      .label(ExpenseInputLabels.project_id),

    dealer_id: yup
      .number()
      .nullable()
      .when(['category'], {
        is: (category) => category === ExpCategories.Project,
        then: yup.number().required(),
      })
      .label(ExpenseInputLabels.dealer_id),

    transaction_id: yup
      .number()
      .required()
      .nullable()
      .label(ExpenseInputLabels.transaction_id),
    date: yup
      .date()
      .required()
      .nullable()
      .max(new Date(), 'Start date can not be future date') // Date can be future date
      .typeError('Invalid date')
      .label(ExpenseInputLabels.date),
    amount: yup
      .number('Invalid amount')
      .required()
      .nullable()
      .min(1, 'Amount must be more then 1 Rs ')
      .max(10000000, 'Too much!')
      .typeError('Amount must be a number')
      .label(ExpenseInputLabels.amount),

    desc: yup.string().trim().nullable().label(ExpenseInputLabels.desc),
  })
}
