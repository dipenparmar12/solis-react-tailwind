/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import { Formik, Form, Field as FormikField, useFormikContext } from 'formik'
import React from 'react'
import Print from '@/components/atoms/Print'
import { isProdEnv } from '@/utils/environment'
import pick from '@/utils/obj/pick'
import { InputFormik } from '../Form/InputApp'
import { DateFormik } from '../Form/InputDate'

function FormikForm({
  debug, // '*' | true | false | ['errors'] | ['values', 'errors', 'touched']
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
          {debug && <FormikForm.Debug config={debug === true ? true : debug} />}
        </Form>
      )}
    </Formik>
  )
}

FormikForm.Input = InputFormik
FormikForm.DATE = DateFormik

FormikForm.Debug = ({ config }) => {
  const formikProps = useFormikContext()
  if (isProdEnv) return null

  return (
    <Print
      data={{
        ...(config === true
          ? pick(formikProps, 'values', 'errors')
          : config === '*'
            ? formikProps
            : pick(formikProps, ...config)),
      }}
      className={'max-w-2xl overflow-x-auto'}
    />
  )
}

export default FormikForm
