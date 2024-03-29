/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import classNames from 'classnames'
import React from 'react'
import ReactDatePicker from 'react-datepicker'
import useMergeRefs from '@/hooks/useMergeRefs'
import ErrorFeedback from '@/components/atoms/ErrorFeedback'
import Types from '@/utils/validation/Types'
import debounce from '@/utils/function/debounce'
import WithFormik from '@/components/molecules/FormicApp/WithFormik'

export const inputDateStyles = classNames([
  'outline-none w-full ',
  'block rounded-lg border border-transparent text-gray-700',
  'py-2 px-4 bg-gray-100',
  'hover:bg-white hover:border-blue-300 hover:shadow-outline-blue',
  'active:bg-white',
  'focus:bg-white focus:border focus:shadow-outline-blue focus:border-blue-300 focus:shadow-outline',
  'dark:bg-gray-700 dark:text-gray-300 focus:dark:border-blue-500',
  'transition duration-200 ease-in-out',
])

function InputDate(
  {
    as: Input = 'input',
    name,
    type,
    label,
    placeholder,
    value,
    onChange,
    delay = 10,
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
  const [date, setDate] = React.useState()

  const ownRef = React.useRef(null)
  const mergedRef = useMergeRefs([inputRef, ownRef])

  const onChangeDebounced = debounce(onChange, delay)
  const onChangeDebouncedWrapper = (e) => {
    onChangeDebounced(e)
  }

  // value is not date object but string
  const dateFromProp = React.useRef(value).current
  const dateValue = React.useMemo(() => {
    if (value) {
      return Types.isDate(dateFromProp) ? dateFromProp : new Date(dateFromProp)
    }
    return null
  }, [dateFromProp])

  React.useEffect(() => {
    if (value) {
      const dd = Types.isDate(value) ? value : new Date(value)
      return setDate(dd)
    }
    return setDate(null)
  }, [value])

  return (
    <fieldset className={classNames(containerClassName, className)}>
      <label
        className={classNames(
          'flex items-center mb-1 text-gray-500 dark:text-gray-300',
          labelClassName,
        )}
        htmlFor={name}
        onClick={() => {
          ownRef.current?.focus()
        }}
      >
        {label} {isRequired && <span className="pl-1 text-red-300"> *</span>}
      </label>
      <ReactDatePicker
        ref={mergedRef}
        name={name}
        type={type}
        // value={value} // Not supported by react-datepicker
        selected={date}
        defaultSelected={date}
        onChange={onChangeDebouncedWrapper}
        placeholder={placeholder}
        placeholderText={placeholder}
        className={classNames(inputDateStyles)}
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
