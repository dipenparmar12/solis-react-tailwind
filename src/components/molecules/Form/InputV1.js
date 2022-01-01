/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import classNames from 'classnames'
import React from 'react'

function InputV1({
  name,
  className,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  ...inputProps
}) {
  return (
    <div className={classNames('flex flex-col', className)}>
      <label
        className={classNames(
          'block mb-1 text-gray-700',
          error && 'text-red-400',
        )}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        onFocus={onFocus}
        value={value}
        placeholder={placeholder}
        className={classNames(
          'outline-none w-full ',
          'block rounded-lg border border-transparent text-gray-700',
          'py-2 px-4 bg-gray-100',
          'hover:bg-white hover:border-blue-300 hover:shadow-outline-blue',
          'active:bg-white',
          'focus:bg-white focus:border focus:shadow-outline-blue focus:border-blue-300 focus:shadow-outline',
          'transition duration-200 ease-in-out',
          error &&
            'bg-red-100/80 text-red-400  hover:bg-red-100/80 active:bg-red-100/80 focus:bg-red-100/80',
        )}
      />
      {error && (
        <div className="px-1 text-sm italic text-red-400 ">{error}</div>
      )}
    </div>
  )
}
export default React.forwardRef(InputV1)
