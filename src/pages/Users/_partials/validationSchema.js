/* eslint-disable no-useless-escape */
import * as yup from 'yup'
import regExp from '@/utils/regExp'

function addUserSchema(init) {
  console.log('addUserSchema.js::[4] Add user schema', init)
  return yup.object().shape({
    email: yup.string().email().required().nullable().label('Email'),
    password: yup.string().min(4).required().nullable().label('Password'),
    name: yup.string().min(2).max(50).nullable().label('Name'),
    mobile: yup
      .string()
      .nullable()
      .min(10)
      .max(15)
      .matches(regExp.mobile, {
        message: 'Invalid number',
        excludeEmptyString: false,
      })
      .required()
      .label('Mobile number'),
    salary: yup
      .number('Invalid number')
      .nullable()
      .min(20, 'Salary must be more then 20 ')
      .max(1000000, 'Too much!')
      .typeError('Salary must be a number')
      .label('Salary'),

    dob: yup.string().nullable().required().label('Date of birth'),
    doj: yup.string().nullable().required().label('Date of joining'),
    user_type: yup.string().nullable().required().label('User type'),

    address: yup.string().nullable().label('Address'),
    active: yup.string().nullable().label('Active'),
  })
}

export default addUserSchema
