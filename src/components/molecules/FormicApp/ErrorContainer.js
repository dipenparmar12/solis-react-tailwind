import React from 'react'
import Print from '@/components/atoms/Print'

export default function ErrorContainer({
  inputLabels,
  errors,
  touched,
  ...props
}) {
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
              <li key={Math.random()}>{error}</li>
            ))}
          </ul>
        </li>
      )
    })
  }, [errors, touched])

  return (
    <>
      <ul className="my-3 text-red-400 list-decimal list-inside">
        {formErrorsList}
      </ul>
    </>
  )
}
