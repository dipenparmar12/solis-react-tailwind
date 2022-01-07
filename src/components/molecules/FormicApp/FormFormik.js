import { Formik, Form } from 'formik'
import React from 'react'
import { InputFormik } from '../Form/InputApp'
import { DateFormik } from '../Form/InputDate'
import Debug from './DebugFormik'
import ErrorContainer from './ErrorContainer'
import Print from '@/components/atoms/Print'
import castFormData from '@/utils/miscellaneous/castFormData'

function FormikForm({
  debug, // '*' | true | false | ['errors'] | ['values', 'errors', 'touched']
  initialValues,
  validationSchema,
  onSubmit,
  children,
  inputLabels,
  castFormData: castFormDataProp,
  transformValues = (values) => values,
  ...formProps
}) {
  // React.useEffect(() => {
  //   console.log('FormFormik.js::[18]', isSubmitting)
  // }, [isSubmitting])

  const handleSubmit = React.useCallback(
    (values, actions) => {
      actions.setSubmitting(true)
      const v1 = transformValues(values)
      const formValues = castFormDataProp ? castFormData(v1) : v1
      onSubmit(
        formValues,
        {
          ...actions,
          castFormData: (_values) => castFormData(_values || values),
        },
        values,
      )
    },
    [onSubmit],
  )

  React.useEffect(() => {}, [])
  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        {...formProps}
      >
        {(props) => (
          <>
            <Form>
              {children}
              {debug && <FormikForm.Debug config={debug} />}
            </Form>

            <ErrorContainer
              inputLabels={inputLabels}
              errors={props.errors}
              touched={props.touched}
            />
          </>
        )}
      </Formik>{' '}
    </>
  )
}

export default FormikForm

FormikForm.Input = InputFormik
FormikForm.DATE = DateFormik
FormikForm.Debug = Debug

/* 
========================================================
  dump
======================================================== 
// const valuesToFormData = React.useCallback((values) => {
//   const formData = new FormData()
//   Object.keys(values).forEach((key) => {
//     values[key] !== undefined && formData.append(key, values[key])
//   })
//   return formData
// }, [])

*/
