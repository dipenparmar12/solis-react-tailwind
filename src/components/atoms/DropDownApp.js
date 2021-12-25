/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'
import useOutsideClicked from '@/hooks/useOutsideClicked'
import cn from '@/utils/classNames'
import isFunctionAndCall from '@/utils/function/isFunctionAndCall'

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
  const [selected, setSelected] = useState(null)

  // eslint-disable-next-line no-underscore-dangle
  const _onSelect = (option) => {
    setSelected(option)
    onSelect(option)
    onChange && onChange(option)
    setIsVisible(false)
  }

  // Empty option for default
  if (options?.length === 0) {
    return (
      <span className="px-2 py-2 overflow-hidden rounded-md cursor-pointer bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-gray-200">
        {label}
      </span>
    )
  }

  return (
    <>
      <div ref={ref} className="relative inline-block">
        <button
          className="block px-2 overflow-hidden border border-gray-300 rounded-md cursor-pointer dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-gray-200"
          onClick={() => setIsVisible(!isVisible)}
        >
          {selected?.label || label}
        </button>

        <ul
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
                  className="text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
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
        </ul>
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
