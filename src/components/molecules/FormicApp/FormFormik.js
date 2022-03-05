/* eslint-disable no-return-assign */
/* eslint-disable react/no-this-in-sfc */
import { Formik, Form } from 'formik'
import React from 'react'
import { InputFormik } from '../Form/InputApp'
import { DateFormik } from '../Form/InputDate'
import Debug from './DebugFormik'
import Print from '@/components/atoms/Print'
import castFormData from '@/utils/miscellaneous/castFormData'
import useMergeRefs from '@/hooks/useMergeRefsV2'

function FormikForm({
  debug, // '*' | true | false | ['errors'] | ['values', 'errors', 'touched']
  initialValues,
  validationSchema,
  onSubmit,
  children,
  inputLabels,
  castFormData: castFormDataProp,
  transformValues = (values) => values, // values.map(val => val.toUpperCase())
  innerRef,
  ...formProps
}) {
  const formikRef = React.useRef()

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

  // React.useEffect(() => {
  //   console.log('FormFormik.js::[48] innerRef.current', innerRef.current)
  // }, [innerRef.current])

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        {...formProps}
        innerRef={useMergeRefs(formikRef, innerRef)}
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

function ErrorContainer({ inputLabels, errors, touched, ...props }) {
  // React.useEffect(() => {
  //   console.log('ErrorContainer.js::[5]', errors, touched)
  // }, [errors, touched])

  if (touched && touched?.length < 0) return null
  if (errors && errors?.length < 0) return null

  const formErrorsList = React.useMemo(() => {
    const errorKeys = Object.keys(errors || {})
    return errorKeys.map((eKey) => {
      const displayLabel = (inputLabels && inputLabels[eKey]) || eKey || ''
      const errorsList = [errors[eKey]].flat()
      if (!touched[eKey]) return null
      return (
        <li key={eKey}>
          <label className="font-semibold">{displayLabel}</label>
          <ul className="pb-1 pl-5 list-disc list-inside">
            {errorsList?.map((error, index) => (
              <li key={Math.random()}>{JSON.stringify(error)}</li>
            ))}
          </ul>
        </li>
      )
    })
    // return null
  }, [errors, touched])

  return (
    <>
      <ul className="my-3 text-red-400 list-decimal list-inside">
        {formErrorsList}
      </ul>
    </>
  )
}

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
