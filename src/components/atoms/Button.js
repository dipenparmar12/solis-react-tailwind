/* eslint-disable no-underscore-dangle */
/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
import classNames from 'classnames'
import React from 'react'
import SpinnerV2 from './SpinnerV2'

function ButtonUnMemo(
  {
    onClick = () => {},
    children,
    size = 'lg', // md, lg, xl or 2xl
    // variant = 'default',
    className,
    label,
    disabled,
    isWorking,
    icon,
    iconSize,
    variant = 'default',
    ...buttonProps
  },
  forwardRef,
) {

  const handleClick = () => {
    if (!disabled && !isWorking) onClick()
  }

  let styles = ''

  // button isWorking and disabled state
  const variantDefault = ['rounded-md shadow-sm', {
    'shadow-lg ': true,
    'px-2 py-1 text-xs font-semibold': size === 'sm',
    'px-3 py-1 text-sm ': size === 'md',
    'px-4 py-1 text-lg': size === 'lg',
    'px-5 py-1 text-xl': size === 'xl',
    'px-6 py-1 text-2xl': size === '2xl',
    'active:scale-95 border border-gray-500 dark:border-sky-300': !disabled,
    'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 active:bg-gray-200 dark:active:bg-gray-800':!disabled,
    'text-gray-400 bg-gray-200 dark:bg-gray-700 dark:text-gray-500 border border-gray-200 dark:border-sky-700': disabled,
    'cursor-not-allowed':isWorking || disabled,
    // 'focus:shadow-outline focus:outline-none focus:ring focus:ring-gray-200 dark:focus:ring-0 focus:border-black dark:focus:border-sky-500': true,
    // 'focus:outline-none focus:ring focus:ring-gray-200 dark:focus:ring-sky-700': true,
    // 'focus:ring hover:ring-sky-200 dark:hover:ring-sky-600': true,
  }]

  const variantSubtle = [
    'text-gray-600',
    ' transition-colors duration-200 transform border rounded',
    'bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none',
    ' active:bg-gray-200 dark:active:bg-gray-600',
  ]

  switch (variant) {
      case 'default':
        styles = variantDefault
        break;
      case 'subtle':
        styles = variantSubtle
        break;
  
      default:
        styles = variantDefault
        break;
  }
  
  return (
    <button
      ref={forwardRef}
      onClick={handleClick}
      className={classNames(styles, className)}    
      {...buttonProps}
    >
      {label || children} 
      {isWorking && <SpinnerV2 size={size}/>}
    </button>
  )
}

export default React.memo(React.forwardRef(ButtonUnMemo))



/**
 
export const BtnSize = {
  sm: `px-2 py-1 text-xs `,
  md: `px-2 py-1 text-sm `,
  lg: `px-3 py-1 text-base `,
  xl: `px-4 py-1 text-lg `,
  '2xl': `px-4 py-1 text-xl `,
}

export const BtnVariant = {
  default: cn([
    `rounded-md shadow-sm`,
    `text-gray-700 dark:text-sky-300 focus:text-black`,
    `border border-gray-500 dark:border-sky-900 dark:hover:border-sky-500 `,
    `bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 active:bg-gray-200 dark:active:bg-gray-800`,
    `focus:shadow-outline focus:outline-none focus:ring focus:ring-gray-200 dark:focus:ring-0 dark:focus:border-sky-500`,
    `active:scale-95 transition ease-in-out duration-150`,
  ]),
}
 */