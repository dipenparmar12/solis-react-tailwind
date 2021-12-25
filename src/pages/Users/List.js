import React from 'react'
import Api from '@/services/ApiService'
import useFetcher from '@/hooks/useFetcher'
import cn from '@/utils/classNames'
import UserCard from './Card'
import Print from '@/components/atoms/Print'
import { spinnerMd, spinnerSm } from '@/components/atoms/Spinner'
import DropDownApp from '@/components/atoms/DropDownApp'
import useMergeState from '@/hooks/useMergeState'

/**
 *
 * @param {*} param0
 * @returns
 * @src https://codepen.io/abhisheksarmah/full/GRJyXpG
 */
function ButtonPaginator({ children, onclick, active, disabled, ...rest }) {
  if (active) {
    return (
      <span className="px-3 py-1 text-blue-500 no-underline bg-blue-100 border border-blue-100 rounded-sm dark:bg-gray-900 dark:border-gray-600 dark:text-sky-500">
        {children}
      </span>
    )
  }

  if (disabled) {
    return (
      <span
        className={cn([
          `px-3 py-1 text-sm text-gray-600 no-underline border bg-gray-100 border-gray-100 rounded-sm  hover:bg-gray-100  `,
          'dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-600',
        ])}
      >
        {children}
      </span>
    )
  }

  return (
    <button
      type="button"
      className={cn([
        `px-3 py-1 dark:hover:bg-gray-900 text-sm text-gray-600 no-underline border border-gray-100 rounded-sm   `,
        `hover:shadow-md active:shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 hover:bg-gray-100`,
        // disabled &&
        //   'cursor-not-allowed bg-gray-100 dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-500',
      ])}
      onClick={onclick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

function Paginator({ loading, data, state, setState }) {
  const { total, current_page: currentPage, per_page: perPage } = data || {}
  const totalPages = Math.ceil(total / perPage)
  const spinnerOrNull = loading ? spinnerMd : '-'

  const onPageChange = (option) => {
    setState({ page: option?.value })
  }

  const pagesOptions = Array.from({ length: totalPages }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
    // onSelect: onPageChange,
  }))

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 my-5 text-gray-600 dark:text-gray-400">
        <div className="flex">
          <div className="mx-1 ">Users</div>
          <div className="mx-1 font-semibold text-gray-700 dark:text-gray-300 ">
            {total || spinnerOrNull}
          </div>

          <div className="mx-3">
            <span className="border dark:border-gray-500" />
          </div>

          <div className="ml-1 mr-2"> Page </div>
          <div className="font-semibold text-gray-700 dark:text-gray-300 ">
            <DropDownApp
              label={currentPage}
              options={totalPages > 1 && pagesOptions}
              onSelect={onPageChange}
            />
            <span className="text-gray-400 dark:text-gray-400"> / </span>
            <span className="px-1">{totalPages || spinnerOrNull}</span>
          </div>
        </div>
        <ul className="flex items-center rounded ">
          <li>
            <ButtonPaginator disabled>«</ButtonPaginator>
          </li>
          <li>
            <ButtonPaginator disabled>Previous</ButtonPaginator>
          </li>
          <li>
            <ButtonPaginator>1</ButtonPaginator>
          </li>
          <li>
            <ButtonPaginator>2</ButtonPaginator>
          </li>
          <li>
            <ButtonPaginator>3</ButtonPaginator>
          </li>
          <li>
            <ButtonPaginator active>5</ButtonPaginator>
          </li>
          <li>
            <ButtonPaginator>Next</ButtonPaginator>
          </li>
          <li>
            <ButtonPaginator>»</ButtonPaginator>
          </li>
        </ul>
      </div>
    </>
  )
}

export default function UserList() {
  const [apiQry, setApiQry] = useMergeState({
    page: 1,
    per_page: 20,
  })

  const resUsers = useFetcher({
    apiCall: Api.users.get,
    qry: apiQry,
    pagination: true,
    immediateInvoke: true,
  })

  return (
    <>
      <div className={' '}>
        <Paginator
          data={resUsers?.paginationData}
          loading={resUsers?.loading}
          setState={setApiQry}
          state={apiQry}
        />

        <div className="grid grid-cols-1 gap-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resUsers?.data?.map((user, i) => (
            <UserCard key={`user__${Math.random()}`} data={user} />
          ))}
        </div>

        {resUsers?.sloading && <div>Loading...</div>}
        {/* <Print data={resUsers?.loading} maxHeight={'450px'} />
        <Print data={resUsers?.paginationData} maxHeight={'450px'} /> */}
      </div>
    </>
  )
}
