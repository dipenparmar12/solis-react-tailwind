/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import classNames from 'classnames'
import React from 'react'
// import { BiError } from 'react-icons/bi'

function InputV1(
  {
    name,
    label,
    placeholder,
    value,
    onChange,
    onBlur,
    onFocus,
    error,
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
  const [_, setTest] = React.useState(false)
  return (
    <fieldset className={classNames(containerClassName, className)}>
      <label
        className={classNames(
          'flex items-center mb-1 text-gray-600 dark:text-gray-300',
          // isError && 'text-red-400',
          labelClassName,
        )}
        htmlFor="user_name"
        onClick={() => setTest(!error)}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        className={classNames([
          'outline-none w-full ',
          'block rounded-lg border border-transparent text-gray-700',
          'py-2 px-4 bg-gray-100',
          'hover:bg-white hover:border-blue-300 hover:shadow-outline-blue',
          'active:bg-white',
          'focus:bg-white focus:border focus:shadow-outline-blue focus:border-blue-300 focus:shadow-outline',
          'transition duration-200 ease-in-out',
          // error &&
          //   ' text-red-400  bg-red-100/80 hover:bg-red-100/80 active:bg-red-100/80 focus:bg-red-100/80',
          error &&
            '  border-red-200 hover:border-red-200 active:border-red-200 focus:border-red-200 ',
          inputClassName,
        ])}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        {...inputProps}
      />
      {error && (
        <div
          className={classNames(
            'text-red-500 text-sm font-medium',
            errorClassName,
          )}
        >
          {error}
        </div>
      )}
    </fieldset>
  )
}
export default React.forwardRef(InputV1)
