/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import classNames from 'classnames'
import WithFormik from '../FormicApp/WithFormik'

function SwitchSlide({
  options = [], // [{ value: '', label: '' }]
  value: propsValue,
  onChange: tellParentToChange = () => {},
  name,
  label,
  className,
  ...props
}) {
  const [active, setActive] = React.useState(propsValue)
  const isControlled = propsValue !== undefined
  // const isOptionValid = options?.length > 0

  const handleChange = React.useCallback(
    (val, ...args) => {
      tellParentToChange(val, ...args)
      setActive(val, ...args)
    },
    [isControlled, tellParentToChange],
  )

  return (
    <fieldset className="flex ">
      {label && (
        <label className="flex items-center py-2 my-auto mr-3 text-gray-600 dark:text-gray-300 ">
          {label}
        </label>
      )}

      <input type="radio" className="hidden" name={name} />
      <div
        className={classNames([
          'relative flex items-center justify-between p-2 py-1 rounded-full',
          'text-sm leading-none text-gray-500 bg-gray-100 border-gray-100 rounded-full dark:text-gray-500 dark:bg-gray-800 dark:border-gray-800',
        ])}
      >
        {options.map((option, index) => {
          return (
            <React.Fragment key={option.value}>
              <button
                type="button"
                className={classNames([
                  ` flex-1 z-10 px-3 py-2 rounded-full text-gray-400`,
                  active == option?.value &&
                    `bg-white shadow-lg dark:bg-black text-gray-600`,
                ])}
                onClick={(e) =>
                  option?.value !== active && handleChange(option?.value, e)
                }
                id={`radio-button-${option?.value}`}
              >
                {option?.label}
                <input
                  type="radio"
                  className={'hidden'}
                  name={name}
                  value={option?.value}
                  checked={active == option?.value}
                  {...props}
                />
              </button>
            </React.Fragment>
          )
        })}
      </div>
    </fieldset>
  )
}

export default SwitchSlide

export const SwitchSlideFormik = ({ ...props }, ...rest) => (
  <WithFormik inputAs={SwitchSlide} {...props} /> // {...(rest || {})}
)
