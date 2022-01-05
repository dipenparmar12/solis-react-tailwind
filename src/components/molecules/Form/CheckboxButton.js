import classNames from 'classnames'
import React from 'react'
import get from '@/utils/obj/get'
import WithFormik from '../FormicApp/WithFormik'

/*
 * TODO::: Implement variants: https://codepen.io/azhsetiawan/pen/ExPNBxb
 * @returns
 */
function CheckboxButton({
  name,
  label,
  options,
  error,
  isRequired,
  className,
  type = 'radio', // 'radio', TODO:: ->'checkbox'
  onChange = () => {},
  ...radioProps
}) {
  return null
  // const [selectedValues, setSelectedValues] = React.useState([])
  // const handleOnChange = React.useCallback(
  //   (e) => {
  //     const { value, checked } = e.target
  //     if (checked) {
  //       setSelectedValues([...selectedValues, value])
  //     } else {
  //       setSelectedValues(selectedValues.filter((v) => v !== value))
  //     }
  //     onChange(e)
  //   },
  //   [onChange, selectedValues],
  // )

  // return (
  //   <div className={classNames('flex flex-col gap-3 md:flex-row', className)}>
  //     {options.map((option) => {
  //       const { value, label: optionLabel } = option
  //       const isSelected = selectedValues.includes(value)
  //       return (
  //         <React.Fragment key={option?.value}>
  //           <label
  //             className={classNames(
  //               [
  //                 'flex items-center outline-none py-1 px-2 ',
  //                 'rounded-lg border border-gray-300  text-gray-700',
  //                 'focus:bg-white focus:border focus:shadow-outline-blue focus:border-blue-300 focus:shadow-outline',
  //                 'transition duration-100 ease-in-out',
  //               ],
  //               {
  //                 'hover:border-blue-300': !isSelected,
  //                 'bg-gray-100 border-gray-400': isSelected,
  //                 // 'opacity-50': isDisabled,
  //               },
  //             )}
  //             htmlFor={`${name}-${option?.value}`}
  //           >
  //             <input
  //               type={type}
  //               id={`${name}-${option?.value}`}
  //               className={classNames(
  //                 'w-full h-10',
  //                 // isDisabled && 'cursor-not-allowed',
  //               )}
  //               name={name}
  //               value={value}
  //               checked={isSelected}
  //               onChange={handleOnChange}
  //               {...radioProps}
  //             />

  //             <div
  //               className={classNames(
  //                 'px-2 text-sm',
  //                 // isDisabled && 'text-gray-600',
  //               )}
  //             >
  //               {optionLabel}
  //             </div>
  //           </label>
  //         </React.Fragment>
  //       )
  //     })}
  //   </div>
  // )
}

export default CheckboxButton

export const CheckboxButtonFormik = ({ ...props }, ...rest) => (
  <WithFormik inputAs={CheckboxButton} {...props} /> // {...(rest || {})}
)
