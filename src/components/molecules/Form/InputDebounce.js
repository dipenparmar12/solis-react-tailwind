/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { RiCloseLine } from 'react-icons/ri'
import classNames from 'classnames'
import debounce from '@/utils/function/debounce'
import useMergeRefs from '@/hooks/useMergeRefs'
import ErrorFeedback from '@/components/atoms/ErrorFeedback'

function InputDebounce(
  {
    as: Input = 'input',
    onChange = () => {},
    onChangeDebounced: propOonChangeDebounced = () => {},
    name,
    type,
    label,
    placeholder,
    error,
    isClearable,
    isRequired,
    className,
    ...inputProps
  },
  inputRef,
) {
  const ownRef = React.useRef(null)
  const mergedRef = useMergeRefs([inputRef, ownRef])

  const onChangeDebounced = debounce(propOonChangeDebounced, 1000)
  const onChangeDebouncedWrapper = (e) => {
    onChange(e)
    onChangeDebounced(e)
  }

  // const onClear = (e) => {
  // mergedRef.current.value = ''
  // onChangeDebouncedWrapper({ target: { value: '' } })
  // }

  return (
    <fieldset>
      <label
        className={classNames(
          'flex items-center mb-1 text-gray-600 dark:text-gray-300',
          // isError && 'text-red-400',
        )}
        htmlFor={name}
        onClick={ownRef.current?.focus}
      >
        {label} {isRequired && <span className="pl-1 text-red-300"> *</span>}
      </label>

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
        ])}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChangeDebouncedWrapper}
        {...inputProps}
      />
      {/* {isClearable && (
        <button
          onClick={onClear}
          className="p-1 text-gray-400 -translate-x-8 rounded-full cursor-pointer hover:text-black"
        >
          <RiCloseLine />
        </button>
      )} */}
      <ErrorFeedback error={error} />
    </fieldset>
  )
}

export default React.forwardRef(InputDebounce)
