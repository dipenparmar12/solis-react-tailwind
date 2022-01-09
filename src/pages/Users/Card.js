/* eslint-disable jsx-a11y/alt-text */
import { FaRegUser, FaRegEdit } from 'react-icons/fa'
import { MdModeEditOutline } from 'react-icons/md'

import classNames from 'classnames'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
// import cn from '@/utils/classNames'
import Print from '@/components/atoms/Print'
import UserEditForm from './Edit'
import Button from '@/components/atoms/Button'

export default function UserCard({ data }) {
  return (
    <>
      {/* dark theme */}
      <div
        className={classNames([
          `group`,
          `px-4 lg:px-4 py-2 bg-white border shadow-md rounded-md hover:shadow-lg `,
          `dark:bg-gray-900 dark:hover:bg-black hover:border-gray-400 dark:border-gray-900  `,
          `flex justify-start items-center`,
          data?.active === 0 &&
            `bg-red-50 border border-red-400 dark:border-red-700`,
        ])}
      >
        <div className="w-16 h-16 mr-3 rounded-full ">
          {data?.pic ? (
            <img
              src={data?.pic}
              className="w-full h-full border rounded-full"
              // alt="Avatar"
            />
          ) : (
            <FaRegUser className="w-full h-full text-gray-300 dark:text-gray-700" />
          )}
        </div>

        <div className="flex-1 mt-2">
          <h3 className="flex justify-between">
            {data?.name}
            <ModalV3
              renderButton={({ setOpen }) => (
                <button
                  className="hidden px-1 group-hover:inline-block"
                  onClick={setOpen}
                >
                  <span className="">
                    <MdModeEditOutline className="w-full h-full text-amber-400 hover:text-amber-500 dark:text-gray-700" />
                  </span>
                </button>
              )}
            >
              <h2 className="mb-3 mr-10 text-2xl"> {data?.name} </h2>
              <UserEditForm data={data} />
            </ModalV3>
          </h3>
          <div className="flex-auto my-1 text-sm text-gray-600 dark:text-gray-500">
            <span className="mr-3 ">PettyCase {data?.fund}</span>
            {/* <span className="mr-3 border-r border-gray-400 max-h-0" />
            <span>Cochin, IND</span> */}
          </div>

          <div className="flex justify-between pb-1">
            <div className="text-xs ">Salary: {data?.salary || '00.0'}</div>
          </div>

          <div className="flex justify-end pb-1 group">
            <div className="">
              <Button size="sm" className="hidden group-hover:inline-block">
                Permission
              </Button>

              <ModalV3
                renderButton={({ setOpen }) => (
                  <Button
                    size="sm"
                    className="px-5 mx-2 text-sm"
                    onClick={setOpen}
                  >
                    View
                  </Button>
                )}
              >
                {' '}
                <h2 className="mb-3 mr-10 text-2xl"> {data?.name} </h2>
                <Print>{data}</Print>
              </ModalV3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const UserCardLoading = ({ loading }) => {
  if (!loading) return null

  return (
    <>
      {[...Array(15)].map((i) => (
        <div
          key={`user__skeleton__${Math.random()}`}
          className="w-full max-w-sm p-3 px-2 py-2 mx-auto bg-white border rounded-md shadow-md lg:px-4 hover:shadow-lg dark:bg-gray-900 hover:border-gray-400 dark:border-gray-900 dark:hover:border-gray-800 "
        >
          <div className="flex space-x-4 animate-pulse">
            <div className="flex-1 py-1 space-y-6">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 col-span-1 bg-gray-300 rounded dark:bg-gray-700" />
                  <div className="h-2 col-span-2 bg-gray-300 rounded dark:bg-gray-700" />
                </div>
                <div className="h-2 bg-gray-300 rounded dark:bg-gray-700" />
                <div className="h-2 bg-gray-300 rounded dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
