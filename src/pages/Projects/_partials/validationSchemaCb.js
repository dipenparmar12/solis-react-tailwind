/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */
import * as yup from 'yup'
import regExp from '@/utils/regExp'

export const SUPPORTED_IMG_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
]

export const projectInputLabels = {
  id: 'ID',
  client: 'Client Name',
  title: 'Site name',
  budget: 'Project Value (in RS)',
  s_date: 'Start Date',
  e_date: 'End Date',
  location: 'Location',
  p_type: 'Property Type',
  sqft: 'Sqft',
  address: 'Address',
  wip: 'Work in Progress',
  // income: 'Income',
  // expense: 'Expense',
}

function validationSchemaCb(isEdit) {
  return yup.object().shape({
    client: yup
      .string()
      .required()
      .min(2)
      .max(100)
      .nullable()
      .label(projectInputLabels.client),
    title: yup
      .string()
      .required()
      .min(2)
      .max(50)
      .nullable()
      .label(projectInputLabels.title),
    budget: yup
      .number('Invalid number')
      .required()
      .nullable()
      .min(20, 'Project value must be more then 100 Rs ')
      .max(10000000, 'Too much!')
      .typeError('Project value must be a number')
      .label(projectInputLabels.budget),
    s_date: yup
      .date()
      .required()
      .nullable()
      .max(new Date(), 'Date of birth can not be future date') // Date can be future date
      .typeError('Invalid date')
      .label(projectInputLabels.s_date),

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
      .label(projectInputLabels.e_date),

    address: yup.string().nullable().label(projectInputLabels.address),
    wip: yup.string().nullable().label(projectInputLabels.wip),
    p_type: yup.string().nullable().label(projectInputLabels.p_type),
    sqft: yup.string().nullable().label(projectInputLabels.p_type),

    // Not required fields
    // income,
    // expense,
  })
}

export default validationSchemaCb
