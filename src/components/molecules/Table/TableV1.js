import classNames from 'classnames'
import React from 'react'
import { spinnerLg } from '@/components/atoms/Spinner'

function TableV1({ children, className, ...rest }) {
  return (
    <>
      <table
        className={classNames([
          'w-full bg-white border-collapse rounded-sm dark:bg-gray-900 ',
          className,
        ])}
        {...rest}
      >
        {children}
      </table>
    </>
  )
}

function Thead({ children, className, ...rest }) {
  return (
    <thead className={classNames(['scale-100 shadow', className])} {...rest}>
      {children}
    </thead>
  )
}

function Th({ children, className, ...rest }) {
  return (
    <th
      className={classNames([
        'px-2 py-3 font-semibold text-left border-b text-slate-500 dark:text-gray-400 dark:border-sky-800',
        className,
      ])}
      {...rest}
    >
      {children}
    </th>
  )
}

function Tbody({ children, className, ...rest }) {
  return (
    <tbody
      className={classNames(['text-gray-500 dark:text-gray-400', className])}
      {...rest}
    >
      {children}
    </tbody>
  )
}

function Tr({ children, className, ...rest }) {
  return (
    <tr
      className={classNames([
        'border-b test-left dark:border-gray-700',
        'hover:bg-sky-50 dark:hover:bg-black ',
        'text-gray-500 dark:text-gray-400 hover:dark:text-blue-300 hover:text-gray-700',
        'transition duration-200 ease-in-out',
        className,
      ])}
      {...rest}
    >
      {children}
    </tr>
  )
}

function Td({ children, className, ...rest }) {
  return (
    <td className={classNames(['px-2 py-2.5 ', className])} {...rest}>
      {children}
    </td>
  )
}

const TLoading = React.memo(({ loading }) => {
  if (!loading) return null
  return (
    <tr className="absolute top-0 w-full h-full pt-6 text-gray-700 dark:text-gray-300 bg-white/60 dark:bg-black/40">
      <td
        colSpan="10000 "
        className="flex items-center justify-center font-semibold tracking-widest text-md"
      >
        {spinnerLg} <span className="ml-2">Loading...</span>
      </td>
    </tr>
  )
})

TableV1.Thead = Thead
TableV1.Th = Th
TableV1.Tbody = Tbody
TableV1.Tr = Tr
TableV1.Td = Td
TableV1.TLoading = TLoading

export default TableV1

export { Thead, Th, Tbody, Tr, Td, TLoading }
