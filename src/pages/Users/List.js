import React from 'react'
import Api from '@/services/ApiService'
import useFetcher from '@/hooks/useFetcher'
import Random from '@/utils/faker/random'
import Print from '@/components/atoms/Print'
import cn from '@/utils/classNames'

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

function Paginator() {
  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 my-5 text-gray-600 dark:text-gray-400">
        <div className="flex">
          <div className="mx-1 ">Users</div>
          <div className="mx-1 font-semibold text-gray-700 dark:text-gray-300 ">
            40
          </div>

          <div className="mx-3">
            <span className="border dark:border-gray-500" />
          </div>

          <div className="mx-1 "> Page </div>
          <div className="font-semibold text-gray-700 dark:text-gray-300 ">
            <span>
              <input
                type="text"
                className="w-10 px-1 font-semibold border border-gray-300 rounded dark:bg-transparent dark:border-gray-500"
              />
            </span>
            <span> / </span>
            <span>15</span>
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
  const [qry, setQry] = React.useState({
    page: 1,
    per_page: 20,
  })

  const resUsers = useFetcher({
    apiCall: Api.users.get,
    qry,
    pagination: true,
    immediateInvoke: true,
  })

  return (
    <>
      <div className={' '}>
        <Paginator />
        <div className="grid grid-cols-1 gap-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resUsers?.data?.map((user, i) => (
            <UserCard key={`user__${Math.random()}`} data={user} />
          ))}
        </div>
        {resUsers?.loading && <div>Loading...</div>}
        {/* <Print data={resUsers} maxHeight={'450px'} /> */}
      </div>
    </>
  )
}

function UserCard({ data }) {
  return (
    <>
      {/* dark theme */}
      <div
        className={cn([
          `px-2 lg:px-4 py-2 bg-white border shadow-md rounded-md hover:shadow-lg `,
          `dark:bg-gray-900 dark:hover:bg-black hover:border-gray-400 dark:border-gray-900 dark:hover:border-gray-800 `,
        ])}
      >
        <h3 className=""> {data?.name}</h3>
        <div className="flex-auto my-1 text-sm text-gray-600 dark:text-gray-500">
          <span className="mr-3 ">PettyCase {data?.fund}</span>
          <span className="mr-3 border-r border-gray-400 max-h-0" />
          <span>Cochin, IND</span>
        </div>
        <div className="text-xs">Salary: {data?.salary || '00.0'}</div>
      </div>
    </>
  )
}
