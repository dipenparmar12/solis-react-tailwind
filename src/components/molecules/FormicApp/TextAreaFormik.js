/* eslint-disable no-unreachable */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import {
  Field as FormikField,
  ErrorMessage,
  Field,
  useFormikContext,
} from 'formik'
import InputApp from '../Form/InputApp'
import get from '@/utils/obj/get'

function InputFormik({ name, type, validate, ...inputProps }, ref) {
  const { setFieldValue, validateForm, ...formikProps } =
    useFormikContext?.() || {}

  // React.useEffect(() => {
  //   console.log('Input.js::[22] formikProps', formikProps)
  // }, [formikProps.values[name]])

  return (
    <Field name={name}>
      {({ field, form }) => (
        <>
          <InputApp
            ref={ref}
            {...field}
            {...inputProps}
            form={form}
            type={type}
            onChange={(e) => {
              setFieldValue(name, e?.target?.value || '')
            }}
            error={
              get(formikProps, `touched.${name}`) &&
              get(formikProps, `errors.${name}`)
            }
          />
        </>
      )}
    </Field>
  )
}

export default React.forwardRef(InputFormik)
