/* eslint-disable prettier/prettier */
import React from 'react'

export const BtnSize = {
  sm: `px-2 py-1 text-xs `,
  md: `px-2 py-1 text-sm `,
  lg: `px-3 py-1 text-base `,
  xl: `px-4 py-1 text-lg `,
  '2xl': `px-4 py-1 text-xl `,
}

export const BtnVariant = {
  default: `text-gray-700 bg-gray-50 border border-gray-500 rounded-md shadow-sm hover:bg-gray-100  dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-900 active:bg-gray-200 dark:active:bg-gray-700 focus:outline-none focus:shadow-outline focus:outline-none focus:ring focus:ring-offset-1 focus:ring-sky-200 dark:focus:ring-sky-800`,
}

function ButtonUnMemo({
  onClick = () => {},
  children,
  size = 'md',
  variant = 'default',
  className,
  ...props
}) {
  return (
    <button
      type="button"
      className={`${BtnSize[size] || size} ${BtnVariant[variant] || variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default React.memo(ButtonUnMemo)