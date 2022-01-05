import { Formik, Form } from 'formik'
import React from 'react'
import { InputFormik } from '../Form/InputApp'
import { DateFormik } from '../Form/InputDate'
import Debug from './DebugFormik'

function FormikForm({
  debug, // '*' | true | false | ['errors'] | ['values', 'errors', 'touched']
  initialValues,
  validationSchema,
  onSubmit,
  children,
  ...formProps
}) {
  // React.useEffect(() => {
  //   console.log('FormFormik.js::[18]', isSubmitting)
  // }, [isSubmitting])

  const handleValuesToFormData = React.useCallback((values) => {
    const formData = new FormData()
    Object.keys(values).forEach((key) => {
      values[key] !== undefined && formData.append(key, values[key])
    })
    return formData
  }, [])

  const handleSubmit = React.useCallback(
    (values, actions) => {
      actions.setSubmitting(true)
      onSubmit(values, {
        ...actions,
        getFormData: (_values) => handleValuesToFormData(_values || values),
      })
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
        {() => (
          <Form>
            {children}
            {debug && <FormikForm.Debug config={debug} />}
          </Form>
        )}
      </Formik>{' '}
    </>
  )
}

export default FormikForm

FormikForm.Input = InputFormik
FormikForm.DATE = DateFormik
FormikForm.Debug = Debug
