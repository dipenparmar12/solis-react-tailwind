/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as yup from 'yup'

export const EstimateInputLabels = {
  id: 'ID',
  project_id: 'Project',
  s_date: 'Start Date',
  e_date: 'End Date',
  desc: 'Description',
  dealer_id: 'Vendor',
  amount: 'Amount',
  estimates: 'Estimates',
}

export default function EstimateSchemaCB(isEdit) {
  return yup.object().shape({
    project_id: yup
      .number()
      .required()
      .nullable()
      .label(EstimateInputLabels.project_id),

    s_date: yup
      .date()
      .required()
      .nullable()
      .max(new Date(), 'Start date can not be future date') // Date can be future date
      .typeError('Invalid date')
      .label(EstimateInputLabels.s_date),

    // End date must be after start date, not before s_date
    e_date: yup
      .date()
      .required()
      .nullable()
      .when(
        's_date',
        (s_date, schema) =>
          s_date && schema.min(s_date, 'End date must be after start date'),
      )
      .label(EstimateInputLabels.e_date),

    estimates: yup
      .array()
      .of(
        yup.object().shape({
          dealer_id: yup
            .number()
            .required()
            .nullable()
            .label(EstimateInputLabels.dealer_id),
          amount: yup
            .number('Invalid amount')
            .required()
            .nullable()
            .min(20, 'Amount must be more then 20 Rs ')
            .max(10000000, 'Too much!')
            .typeError('Amount must be a number')
            .label(EstimateInputLabels.amount),
        }),
      )
      .required('Must have estimate') // these constraints are shown if and only if inner constraints are satisfied
      .min(1, 'Minimum  1 estimate'),

    desc: yup.string().trim().trim().nullable().label(EstimateInputLabels.desc),
  })
}
