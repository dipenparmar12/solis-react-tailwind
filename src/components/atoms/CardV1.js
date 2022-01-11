import classNames from 'classnames'
import React from 'react'

function CardV1({ className, children }) {
  return (
    <div
      className={classNames([
        `group hover:z-10`,
        `bg-white border shadow-md rounded-md hover:shadow-lg `,
        `dark:bg-gray-900 dark:hover:bg-black hover:border-gray-400 dark:border-gray-900`,
        className,
      ])}
    >
      {children}
    </div>
  )
}

export default CardV1
