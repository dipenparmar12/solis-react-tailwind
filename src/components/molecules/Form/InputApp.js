/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import classNames from 'classnames'
import { RiCloseLine } from 'react-icons/ri'
import useMergeRefs from '@/hooks/useMergeRefs'
import WithFormik from '../FormicApp/WithFormik'
import ErrorFeedback from '@/components/atoms/ErrorFeedback'

function InputApp(
  {
    as: Input = 'input',
    name,
    type,
    label,
    placeholder,
    value = '',
    onChange = () => {},
    error,
    isRequired,
    className,
    classNames: {
      container: containerClassName = '',
      input: inputClassName = '',
      label: labelClassName = '',
      error: errorClassName = '',
    } = {},
    isClearable,
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
        onClick={ownRef.current?.focus}
      >
        {label} {isRequired && <span className="pl-1 text-red-300"> *</span>}
      </label>
      <div className="relative flex items-center">
        <Input
          ref={mergedRef}
          className={classNames([
            'pr-7',
            'outline-none w-full ',
            'block rounded-lg border border-transparent text-gray-700',
            'py-2 px-4 bg-gray-100',
            'hover:bg-white hover:border-blue-300 hover:shadow-outline-blue',
            'active:bg-white',
            'focus:bg-white focus:border focus:shadow-outline-blue focus:border-blue-300 focus:shadow-outline',
            'transition duration-200 ease-in-out',
            // error &&
            //   ' text-red-400  bg-red-100/80 hover:bg-red-100/80 active:bg-red-100/80 focus:bg-red-100/80',
            // error &&
            //   '  border-red-200 hover:border-red-200 active:border-red-200 focus:border-red-200 ',
            inputClassName,
          ])}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...inputProps}
        />

        {isClearable && value && (
          <button
            // onClick={onClear}
            className="p-1 text-gray-400 -translate-x-8 rounded-full cursor-pointer hover:text-black"
          >
            <RiCloseLine />
          </button>
        )}
      </div>

      <ErrorFeedback error={error} />
    </fieldset>
  )
}
export default React.forwardRef(InputApp)

export const InputFormik = ({ ...props }, ...rest) => (
  <WithFormik inputAs={InputApp} {...props} /> // {...(rest || {})}
)
