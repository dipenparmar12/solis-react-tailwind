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

function addUserSchema(isEdit) {
  return yup.object().shape({
    email: yup.string().trim().email().required().nullable().label('Email'),
    name: yup.string().trim().min(2).max(50).nullable().label('Name'),
    password: yup
      .string()
      .when('isEdit', () => {
        if (!isEdit)
          return yup
            .string()
            .min(6)
            .max(50)
            .nullable()
            .required('Password is required')
      })
      .nullable()
      .label('Password'),
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

    user_type: yup.string().trim().nullable().label('User type'),

    address: yup.string().trim().nullable().label('Address'),
    active: yup.string().trim().nullable().label('Active'),

    role_id: yup.string().trim().required().nullable().label('Role'),

    // Js file object validations
    profile_pic: yup
      .mixed()
      .nullable()
      .label('Profile pic')
      .test(
        'fileSize',
        'File size too large, please pick a smaller one (2mb max)',
        (file) => {
          // console.log('addUserSchema.js::[10] fileSize', file)
          const maxSize = 1024 * 1024 * 2 // 2MB
          if (!file?.name) return true
          return file.size <= maxSize
        },
      )
      .test(
        'fileType',
        'Invalid file type, image must be a jpeg, jpg or png ',
        (file) => {
          // console.log('addUserSchema.js::[12] fileType', file)
          if (!file?.name) return true
          return SUPPORTED_IMG_FORMATS.includes(file.type)
        },
      ),
    // profile_pic must be a image data uri base64
    // profile_pic: yup
    //   .string()
    //   .nullable()
    //   .label('Profile pic')
    //   .matches(regExp.base64Image, {
    //     message: 'Invalid image, must be a jpeg, jpg or png',
    //     excludeEmptyString: false,
    //   }),
  })
}

export default addUserSchema
