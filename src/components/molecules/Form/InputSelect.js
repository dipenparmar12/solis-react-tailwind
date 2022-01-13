/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import classNames from 'classnames'
import { RiCloseLine } from 'react-icons/ri'
import Select from 'react-dropdown-select'
import useMergeRefs from '@/hooks/useMergeRefs'
import WithFormik from '../FormicApp/WithFormik'
import ErrorFeedback from '@/components/atoms/ErrorFeedback'
import debounce from '@/utils/function/debounce'
import { inputDateStyles } from './InputDate'

const selectInputBoxRenderer = ({ props, state, methods }) => {
  // console.log('Filters.js::[26] ', state, props.labelField, methods)
  return (
    <span className={'relative px-2 w-full flex items-center '}>
      <span className="absolute left-0 right-0 px-1 pr-3 overflow-hidden whitespace-nowrap text-ellipsis">
        {state?.values?.map((item, index) => (
          <span key={item[props.valueField] || index} className="px-0.5">
            {item[props.labelField]},
          </span>
        ))}
      </span>
      {state?.values?.length > 0 && (
        <span className="absolute -right-1">
          <button
            className="pt-1 text-gray-400 hover:text-red-400"
            onClick={() => methods.clearAll()}
          >
            <RiCloseLine />
          </button>
        </span>
      )}
    </span>
  )
}

function InputSelect(
  {
    as: Input = 'input',
    name,
    label,
    placeholder,
    values,
    options,
    onChange = () => {},
    // setOptions = () => {},
    valueField = 'value',
    labelField = 'label',
    multi,
    delay = 100,
    error,
    isRequired,
    className,
    ...inputProps
  },
  inputRef,
) {
  const ownRef = React.useRef(null)
  const mergedRef = useMergeRefs([inputRef, ownRef])

  const onChangeDebounced = debounce(onChange, delay)
  const onChangeDebouncedWrapper = (_values) => {
    // setOptions(_values)
    onChangeDebounced(_values)
  }

  return (
    <fieldset className={className}>
      <label
        className={classNames(
          'flex items-center mb-1 text-gray-500 dark:text-gray-400',
        )}
        htmlFor={name}
        onClick={ownRef.current?.focus}
      >
        {label} {isRequired && <span className="pl-1 text-red-300"> *</span>}
      </label>
      <div className="relative items-center flex-1">
        <Select
          style={{
            border: 'transparent',
            borderRadius: '0.5rem',
            minHeight: '40px',
          }}
          multi={multi}
          className={classNames([inputDateStyles, ''])}
          searchable
          options={options || []}
          onChange={onChangeDebouncedWrapper}
          values={values || []}
          valueField={valueField}
          labelField={labelField}
          contentRenderer={selectInputBoxRenderer}
          // itemRenderer={itemRenderer}
          // keepSelectedInList={false}
          {...inputProps}
        />
      </div>

      <ErrorFeedback error={error} />
    </fieldset>
  )
}
export default React.forwardRef(InputSelect)

// const itemRenderer = ({ item, itemIndex, props, state, methods }) => (
//   <div key={item[props.valueField]} onClick={() => methods.addItem(item)}>
//     <div className="px-3 py-2 hover:bg-sky-100">
//       {/* <input type="checkbox" checked={methods.isSelected(item)} /> */}
//       <span className="px-2">{item[props.labelField]}</span>
//     </div>
//   </div>
// )

export const InputSelectFormik = ({ ...props }, ...rest) => (
  <WithFormik inputAs={InputSelect} {...props} /> // {...(rest || {})}
)
