import { Formik, Form, Field as FormikField, useFormikContext } from 'formik'
import React from 'react'
import Print from '@/components/atoms/Print'
import { isProdEnv } from '@/utils/environment'
import InputFormik from './Input'

function FormikForm({
  debug,
  initialValues,
  onSubmit,
  children,
  ...formProps
}) {
  React.useEffect(() => {}, [])
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} {...formProps}>
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
  const formikProps = useFormikContext()
  if (isProdEnv) return null
  return (
    <Print data={{ error: formikProps.errors, values: formikProps.values }} />
  )
}

export default FormikForm
