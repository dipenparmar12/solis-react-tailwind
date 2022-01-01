import { Formik, Form, Field as FormikField, useFormikContext } from 'formik'
import React from 'react'
import Print from '@/components/atoms/Print'
import { isProdEnv } from '@/utils/environment'
import InputFormik from './Input'

function FormikForm({
  debug,
  initialValues,
  validationSchema,
  onSubmit,
  children,
  ...formProps
}) {
  React.useEffect(() => {}, [])
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
      {...formProps}
    >
      {() => (
        <Form>
          {children}
          {debug && <FormikForm.Debug />}
        </Form>
      )}
    </Formik>
  )
}

FormikForm.Input = InputFormik

FormikForm.Debug = () => {
  const { errors, values, ...formikProps } = useFormikContext()
  if (isProdEnv) return null
  return (
    <Print
      data={{
        errors,
        values,
        ...formikProps,
      }}
      className={'max-w-2xl overflow-x-auto'}
    />
  )
}

export default FormikForm
