/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as yup from 'yup'

export const incomeInputLabels = {
  id: 'ID',

  received_by: 'Payment collected by',
  from: 'Payment received from',
  amount: 'Amount',
  date: 'Date',
  project_id: 'Project',
  transaction_id: 'Transaction',
  particular: 'Particular',
  desc: 'Description',
}

export default function validationSchemaCb(isEdit) {
  return yup.object().shape({
    from: yup
      .string()
      .required()
      .min(2)
      .max(100)
      .nullable()
      .label(incomeInputLabels.from),
    particular: yup
      .string()
      .required()
      .min(2)
      .max(100)
      .nullable()
      .label(incomeInputLabels.from),
    amount: yup
      .number('Invalid amount')
      .required()
      .nullable()
      .min(20, 'Amount must be more then 20 Rs ')
      .max(10000000, 'Too much!')
      .typeError('Amount must be a number')
      .label(incomeInputLabels.amount),

    // date: yup
    //   .date()
    //   .required()
    //   .nullable()
    //   .max(new Date(), 'Date can not be future date') // Date can be future date
    //   .typeError('Invalid date')
    //   .label(incomeInputLabels.date),

    // project_id: yup
    //   .number()
    //   .required()
    //   .nullable()
    //   .label(incomeInputLabels.project_id),
    // transaction_id: yup
    //   .number()
    //   .required()
    //   .nullable()
    //   .label(incomeInputLabels.transaction_id),

    desc: yup.string().trim().nullable().label(incomeInputLabels.desc),
  })
}
