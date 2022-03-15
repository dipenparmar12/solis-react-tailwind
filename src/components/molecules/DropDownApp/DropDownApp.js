/* eslint-disable no-dupe-keys,react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import cn from '@/utils/classNames'
import isFunctionAndCall from '@/utils/function/isFunctionAndCall'
import FadeScaleAnim from '@/hoc/animation/FadeScaleAnim'
import { useOnOutsideClickWithState } from '@/hooks/useOnOutsideClick'
import useOnEscapeKeyDown from '@/hooks/useOnEscapeKeyDown'

/**
 * TODO:: Cherovn ICON (up/down)
 * @param label
 * @param options
 * @param stateLess
 * @param onChange
 * @param onSelect
 * @param styles
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function DropDownApp({
  label,
  options = [],
  stateLess = false,
  onChange = () => {},
  onSelect = () => {},
  styles = {
    button: undefined, // {},
    dropdown: undefined, // {},
    dropdownItem: undefined, // {},
    dropdownItemActive: undefined, // {},
    dropdownItemDisabled: undefined, // {},
    dropdownItemSelected: undefined, // {},
  },

  ...props
}) {
  const [_label, _setLabel] = useState(label)
  const {
    ref: dropDownContainerRef,
    isOpen,
    setOpen,
  } = useOnOutsideClickWithState()
  useOnEscapeKeyDown(isOpen, () => setOpen(false))

  // eslint-disable-next-line no-underscore-dangle
  const _onSelect = (option) => {
    // For simple dropdown list component
    if (stateLess) {
      option?.onSelect(option)
      setOpen(false)
      return null
    }
    // _setSelected(option)
    _setLabel(option?.label || option)
    onSelect(option)
    setOpen(false)
    isFunctionAndCall(onChange, option)
    return null
  }

  React.useEffect(() => {
    _setLabel(label)
  }, [label])

  // Empty option for default
  if (options?.length === 0) {
    return (
      <span className="px-2 py-2 overflow-hidden rounded-md cursor-pointer bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-slate-100">
        {label}
      </span>
    )
  }

  return (
    <>
      <div ref={dropDownContainerRef} className="relative inline-block">
        <button className="px-2 btn-subtle" onClick={() => setOpen(!isOpen)}>
          {_label}
        </button>

        <FadeScaleAnim isVisible={isOpen}>
          <div
            className={cn([
              `absolute right-0 py-2 text-sm bg-white rounded-lg shadow-lg dark:bg-gray-900 dark:shadow-xl `,
              `border dark:border-sky-900`,
              isOpen ? 'block' : 'hidden',
            ])}
          >
            {options &&
              options?.map((option, index) => (
                <div
                  key={`${Math.random()}`}
                  className={cn([
                    'block px-4 py-2 text-sm cursor-pointer dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white hover:bg-slate-100',
                    option?.label === _label && 'bg-sky-100 text-sky-500', // TODO::1
                  ])}
                  onClick={() => _onSelect(option)}
                >
                  {option?.label || option}
                </div>
              ))}
          </div>
        </FadeScaleAnim>
      </div>
    </>
  )
}

/* ------------------------------------
  EXAMPLES
 1 ----------- Simple dropdown select (ex. navigation list stateless)
    <DropDownApp
      stateLess
      label={'View'}
      options={[
        {
          label: `1111`,
          onSelect: () => {  console.log('CardList.js::97 111')  },
        },
        {
          label: `2222`,
          onSelect: () => {  console.log('CardList.js::97 222')  },
        },
      ]}
    />

 3 ----------- Reactive (state) select Dropdown
 <DropDownApp
    label={currentPage}
    onSelect={setPage}
    options={Array.from({ length: <totalPages> }, (_, i) => ({
      label: `${i}`,
      value: i,
    }))}
  />
 ------------------------------------ */

/**
 *
 TODO:::OPTIONAL Features 
  const [isOpen, setIsOpen] = useState(false) // // Feature:On Open event
  
  /// DEV_ONLY TEST DATA 
  const options = [
    ...Random.arrRandom(100).map((_, i) => ({
      label: `${i}`,
      value: `OptionValue ${i}`,
       // onSelect: (option)=>{ console.log('onSelect', option) },
      // render: Random.bool() ? <>Render </> : undefined, // Feature:
    })),
  ]
 */
