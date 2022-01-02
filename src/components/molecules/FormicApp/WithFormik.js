/* eslint-disable no-unreachable */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import {
  Field as FormikField,
  ErrorMessage,
  Field,
  useFormikContext,
} from 'formik'
import get from '@/utils/obj/get'

function WithFormik(
  { as: Component, name, validate, onChange, ...inputProps },
  ref,
) {
  const { setFieldValue, validateForm, ...formikProps } =
    useFormikContext?.() || {}

  const handleChange = React.useCallback(
    (e) => {
      const value = e?.target ? get(e, 'target.value') : e
      setFieldValue(name, value)
      if (onChange) onChange(e, value)
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
            form={form}
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
