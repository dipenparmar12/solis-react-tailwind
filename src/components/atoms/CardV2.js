import classNames from 'classnames'
import React from 'react'

function CardV2({ className, children }) {
  return (
    <div
      className={classNames([
        `group hover:z-10`,
        `bg-white border shadow-lg rounded-md`,
        `dark:bg-gray-900 dark:border-gray-900`,
        'px-4 py-4',
        className,
      ])}
    >
      {children}
    </div>
  )
}

export default CardV2
