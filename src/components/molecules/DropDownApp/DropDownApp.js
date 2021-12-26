/* eslint-disable no-dupe-keys */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import useOutsideClicked from '@/hooks/useOutsideClicked'
import cn from '@/utils/classNames'
import isFunctionAndCall from '@/utils/function/isFunctionAndCall'
import FadeScaleAnim from '@/hoc/animation/FadeScaleAnim'

export default function DropDownApp({
  label,
  options = [],
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
  const { ref, isVisible, setIsVisible } = useOutsideClicked()
  const [_label, _setLabel] = useState(label)
  // const [_selected, _setSelected] = useState({})

  // eslint-disable-next-line no-underscore-dangle
  const _onSelect = (option) => {
    // _setSelected(option)
    _setLabel(option?.label || option)
    onSelect(option)
    setIsVisible(false)
    isFunctionAndCall(onChange, option)
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
      <div ref={ref} className="relative inline-block">
        <button
          className="block px-2 overflow-hidden border border-gray-300 rounded-md cursor-pointer dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-slate-100"
          onClick={() => setIsVisible(!isVisible)}
        >
          {_label}
        </button>

        <FadeScaleAnim isVisible={isVisible}>
          <div
            className={cn([
              `absolute right-0 z-10 py-2 text-sm bg-white rounded-lg shadow-lg dark:bg-gray-900 dark:shadow-xl `,
              isVisible ? 'block' : 'hidden',
            ])}
          >
            {options &&
              options?.map((option, index) => (
                <div
                  key={`${Math.random()}`}
                  className={cn([
                    'block px-4 py-2 text-sm cursor-pointer dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white hover:bg-slate-100',
                    {
                      'bg-gray-50 dark:bg-gray-700': option?.disabled,
                      'bg-slate-100 dark:bg-gray-900': option?.selected,
                      'bg-gray-100 dark:bg-gray-700': option?.active,
                      'bg-gray-200 dark:bg-gray-700':
                        option?.disabled && option?.selected,
                      'bg-gray-200 dark:bg-gray-700':
                        option?.disabled && option?.active,
                      'bg-gray-200 dark:bg-gray-700':
                        option?.selected && option?.active,
                      'bg-gray-200 dark:bg-gray-700':
                        option?.disabled && option?.selected && option?.active,
                    },
                  ])}
                  onClick={() => _onSelect(option)}
                >
                  {option?.label || option}
                </div>
              ))}
          </div>
        </FadeScaleAnim>

        {/* <ul
          className={cn(
            'absolute z-30 mt-1 transform bg-white dark:bg-gray-900 dark:text-gray-100 py-1 pb-2 rounded-lg shadow-xl',
            isVisible ? 'block' : 'hidden',
          )}
        >
          {options &&
            options?.map((option, i) => {
              return (
                <li
                  key={`option__${i + option}`}
                  className="text-gray-600 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  <a
                    className="block px-3 py-2"
                    onClick={() => {
                      _onSelect(option)
                      isFunctionAndCall(option?.onSelect)(option)
                    }}
                  >
                    {option.label}
                  </a>
                </li>
              )
            })}
        </ul> */}
      </div>
    </>
  )
}

/**
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
