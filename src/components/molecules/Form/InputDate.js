/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import classNames from 'classnames'
import React from 'react'
import DatePicker from 'react-datepicker'
import useMergeRefs from '@/hooks/useMergeRefs'
import WithFormik from '../FormicApp/WithFormik'
import ErrorFeedback from '@/components/atoms/ErrorFeedback'

function InputDate(
  {
    as: Input = 'input',
    name,
    type,
    label,
    placeholder,
    value,
    onChange,
    error,
    isRequired,
    className,
    classNames: {
      container: containerClassName = '',
      input: inputClassName = '',
      label: labelClassName = '',
      error: errorClassName = '',
    } = {},
    ...inputProps
  },
  inputRef,
) {
  const ownRef = React.useRef(null)
  const mergedRef = useMergeRefs([inputRef, ownRef])

  return (
    <fieldset className={classNames(containerClassName, className)}>
      <label
        className={classNames(
          'flex items-center mb-1 text-gray-600 dark:text-gray-300',
          // isError && 'text-red-400',
          labelClassName,
        )}
        htmlFor={name}
        onClick={() => {
          ownRef.current?.focus()
        }}
      >
        {label} {isRequired && <span className="pl-1 text-red-300"> *</span>}
      </label>
      <DatePicker
        ref={mergedRef}
        name={name}
        type={type}
        value={value}
        selected={value}
        onChange={onChange}
        placeholder={placeholder}
        placeholderText={placeholder}
        className={classNames([
          'outline-none w-full ',
          'block rounded-lg border border-transparent text-gray-700',
          'py-2 px-4 bg-gray-100',
          'hover:bg-white hover:border-blue-300 hover:shadow-outline-blue',
          'active:bg-white',
          'focus:bg-white focus:border focus:shadow-outline-blue focus:border-blue-300 focus:shadow-outline',
          'transition duration-200 ease-in-out',
          inputClassName,
        ])}
        {...inputProps}
      />

      <ErrorFeedback error={error} />
    </fieldset>
  )
}
export default React.forwardRef(InputDate)

export const DateFormik = ({ ...props }) => (
  <WithFormik inputAs={InputDate} {...props} />
)
