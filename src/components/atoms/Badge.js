import classNames from 'classnames'
import React from 'react'

const variants = {
  green: 'text-green-800 bg-green-200 dark:text-green-200 dark:bg-green-800',
  orange:
    'text-orange-800 bg-orange-200 dark:text-orange-200 dark:bg-orange-800',
  yellow:
    'text-yellow-800 bg-yellow-200  dark:text-yellow-200 dark:bg-yellow-800',
  red: 'text-red-800 bg-red-200 dark:text-red-200 dark:bg-red-800',
  blue: 'text-blue-800 bg-blue-200 dark:text-blue-200 dark:bg-blue-800',
  purple:
    'text-purple-800 bg-purple-200 dark:text-purple-200 dark:bg-purple-800',
  indigo:
    'text-indigo-800 bg-indigo-200 dark:text-indigo-200 dark:bg-indigo-800',
  pink: 'text-pink-800 bg-pink-200 dark:text-pink-200 dark:bg-pink-800',
}

/**
 *
 * @param {*} { children, className, variant, size, ...rest } - props
 * @see https://codepen.io/oidre/pen/jOqNpKQ
 */
function Badge({ variant, className = 'px-2 py-1', children, ...rest }) {
  return (
    <span
      className={classNames([
        'inline-block items-center max-w-full rounded-lg align-middle',
        variants[variant],
        className,
      ])}
      style={{ minHeight: '1.5rem', minWidth: '1.5rem' }}
      {...rest}
    >
      {children}
    </span>
  )
}

export default Badge
