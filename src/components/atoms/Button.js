/* eslint-disable prettier/prettier */
import React from 'react'
import cn from '@/utils/classNames'

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