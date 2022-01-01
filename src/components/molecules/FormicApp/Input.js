/* eslint-disable no-unreachable */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import {
  Field as FormikField,
  ErrorMessage,
  Field,
  useFormikContext,
} from 'formik'
import InputV1 from '../Form/InputV1'
import get from '@/utils/obj/get'

export default function InputFormik({
  className,
  name,
  validate,
  ...inputProps
}) {
  const { setFieldValue, validateForm, ...formikProps } =
    useFormikContext?.() || {}

  // React.useEffect(() => {
  //   console.log('Input.js::[22] formikProps', formikProps)
  // }, [formikProps.values[name]])

  return (
    <Field name={name}>
      {({ field, form }) => (
        <>
          <InputV1
            {...field}
            {...inputProps}
            form={form}
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
