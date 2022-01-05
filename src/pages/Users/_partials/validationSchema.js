/* eslint-disable no-useless-escape */
import * as yup from 'yup'
import regExp from '@/utils/regExp'

function addUserSchema(init) {
  // console.log('addUserSchema.js::[4] Add user schema', init)
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

    dob: yup
      .date()
      .nullable()
      .max(new Date(), 'Date of birth can not be future date') // Date can be future date
      .typeError('Invalid date')
      .label('Date of birth'),
    doj: yup
      .date()
      .nullable()
      .max(new Date(), 'Date of joining can not be future date') // Date can be future date
      .typeError('Invalid date')
      .label('Date of joining'),

    user_type: yup.string().nullable().label('User type'),

    address: yup.string().nullable().label('Address'),
    active: yup.string().nullable().label('Active'),

    role: yup.string().required().nullable().label('Role'),

    // profile_pic must be a image data uri base64
    profile_pic: yup
      .string()
      .nullable()
      .label('Profile pic')
      .matches(regExp.base64Image, {
        message: 'Invalid image, must be a jpeg, jpg or png',
        excludeEmptyString: false,
      }),
  })
}

export default addUserSchema
