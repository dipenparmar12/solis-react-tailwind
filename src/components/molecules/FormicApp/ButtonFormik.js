import { useFormikContext } from 'formik'
import React from 'react'

function ButtonFormik({
  as: Component = 'button',
  onClick,
  children,
  type = 'submit',
  ...props
}) {
  const { setFieldValue, validateForm, ...formikProps } =
    useFormikContext?.() || {}

  const isWorking = formikProps?.isSubmitting
  const isValid = formikProps?.isValid
  const isDisabled = isWorking

  const handleOnClick = React.useCallback(
    (e) => {
      if (!isWorking && isValid && onClick) {
        onClick(e)
      }
    },
    [setFieldValue],
  )

  return (
    <Component
      onClick={handleOnClick}
      disabled={isDisabled}
      isWorking={isWorking}
      type={isWorking ? 'button' : type}
      {...props}
    >
      {children}
    </Component>
  )
}

export default ButtonFormik
// export default React.memo(ButtonFormik)
