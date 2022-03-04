/* eslint-disable no-unreachable */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import {
  Field,
  useFormikContext,
  Field as FormikField,
  ErrorMessage,
} from 'formik'
import get from '@/utils/obj/get'

function WithFormik(
  { inputAs: Component, name, validate, onChange, ...inputProps },
  ref,
) {
  const { setFieldValue, validateForm, ...formikProps } =
    useFormikContext?.() || {}

  const handleChange = React.useCallback(
    (e, ...args) => {
      // console.log('WithFormik.js::[21] onChange', e)
      const value = e?.target ? get(e, 'target.value') : e
      setFieldValue(name, value)
      if (onChange) onChange(e, value, ...args)
    },
    [name, onChange, setFieldValue],
  )

  return (
    <Field name={name}>
      {({ field, form }) => (
        <>
          <Component
            ref={ref}
            {...field}
            {...inputProps}
            // form={form}
            onChange={handleChange}
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

export default React.forwardRef(WithFormik)
