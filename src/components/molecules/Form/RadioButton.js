/* eslint-disable eqeqeq */
import classNames from 'classnames'
import React from 'react'
import WithFormik from '../FormicApp/WithFormik'
import ErrorFeedback from '@/components/atoms/ErrorFeedback'
/*
 *
 * RadioButton
 * @src https://freefrontend.com/css-radio-buttons/
 * @src3 https://codepen.io/Metty/pen/MWjOavR
 * @src2 https://codepen.io/simonswiss/pen/bprJmw
 * @todo variants: https://codepen.io/azhsetiawan/pen/ExPNBxb
 */
function RadioButton({
  name,
  label,
  options, // [{ value: '', label: '' }]
  error,
  isRequired,
  className,
  type = 'radio', // 'radio', TODO:: ->'checkbox'
  onChange = () => {},
  ...radioProps
}) {
  const [checked, setChecked] = React.useState(radioProps?.value)
  // const [checkedOpt, setCheckedOpt] = React.useState({})

  const handleChange = React.useCallback(
    (e) => {
      setChecked(e.target.value)
      onChange(e)
      // setCheckedOpt(options.find((opt) => opt.value == e.target.value))
    },
    [onChange, setChecked],
  )

  // React.useEffect(() => {
  //   console.log('RadioButton.js::[36]', checked)
  // }, [checked])

  return (
    <>
      <fieldset>
        {label && (
          <label className="flex items-center py-2 my-auto mr-3 text-gray-500 dark:text-gray-300 title">
            {label}
          </label>
        )}

        <div className={classNames(['flex gap-2 flex-wrap overflow-hidden'])}>
          {options.map((option, index) => {
            return (
              <React.Fragment key={option?.value}>
                <label
                  className={classNames(
                    [
                      'flex items-center outline-none py-1 px-2 rounded-lg border',
                      ' border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300',
                      'bg-white dark:bg-gray-700',
                      'focus:bg-white focus:border focus:shadow-outline-blue focus:border-blue-300 focus:shadow-outline',
                      'transition duration-100 ease-in-out',
                    ],
                    {
                      'hover:border-blue-300': checked != option?.value,
                      'bg-gray-100 dark:bg-sky-800 border-gray-400 dark:text-sky-400':
                        checked == option?.value,
                    },
                  )}
                  htmlFor={`${name}-${option?.value}`}
                >
                  <input
                    // className="hidden ml-1"
                    className="ml-1"
                    type={type}
                    {...option}
                    id={`${name}-${option?.value}`}
                    value={option?.value}
                    name={name}
                    onChange={handleChange}
                    checked={checked == option?.value}
                  />
                  <div className="px-2 title">{option?.label}</div>
                </label>
              </React.Fragment>
            )
          })}
        </div>

        <ErrorFeedback error={error} />
      </fieldset>
    </>
  )
}

export default RadioButton

export const RadioButtonFormik = ({ ...props }, ...rest) => (
  <WithFormik inputAs={RadioButton} {...props} /> // {...(rest || {})}
)
