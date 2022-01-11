/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/alt-text */
import { RiBuildingLine } from 'react-icons/ri'
import { MdModeEditOutline } from 'react-icons/md'
import ModalV3 from '@/components/molecules/Modal/ModalV3'
import Print from '@/components/atoms/Print'
import Button from '@/components/atoms/Button'
import CardV1 from '@/components/atoms/CardV1'
import Badge from '@/components/atoms/Badge'
import formatRs from '@/utils/str/formatRs'
import capitalize from '@/utils/str/capitalize'
import ProjectEditForm from './Edit'

export default function ProjectCard({ data }) {
  return (
    <>
      <CardV1
        className={[
          'px-7 py-3',
          data?.wip === 0 &&
            `bg-green-50 border border-green-400 dark:border-2 dark:border-green-700`,
        ]}
      >
        <div className="flex justify-between text-xl y-2 text-sky-500">
          {capitalize(data?.client)}
          <ModalV3
            renderButton={({ setOpen }) => (
              <button
                className="hidden px-1 group-hover:inline-block"
                onClick={setOpen}
              >
                <span className="">
                  <MdModeEditOutline className="w-full h-full text-amber-400 hover:text-amber-600 " />
                </span>
              </button>
            )}
          >
            <h2 className="mb-3 mr-10 "> {data?.title} </h2>
            <ProjectEditForm data={data} />
          </ModalV3>
        </div>
        <div className="flex items-center justify-start my-2 ">
          <div className="flex-1">
            <h3 className="flex justify-between text-md">
              {capitalize(data?.title) || '-'}
            </h3>

            <div className="text-gray-700 dark:text-gray-400">
              <span className="text-gray-500">Income:</span> {data?.income}
            </div>

            <div className="text-gray-700 dark:text-gray-400">
              <span className="text-gray-500">Expenses:</span> {data?.expense}
            </div>

            <div className="text-gray-700 dark:text-gray-400">
              <span className="text-gray-500">Location:</span> {data?.location}
            </div>
          </div>
          <div className="w-20 h-16 mr-3 rounded-full ">
            {data?.pic ? (
              <img
                src={data?.pic}
                className="w-full h-full border rounded-full"
              />
            ) : (
              <RiBuildingLine className="w-full h-full text-gray-300 dark:text-gray-700" />
            )}
          </div>
        </div>

        <div className="flex justify-between py-1 group">
          <div className="flex space-x-1 text-xs">
            <Badge variant={'green'}> {formatRs(data?.budget || 0)} </Badge>
            <Badge variant={'yellow'}> {formatRs(data?.sqft || 0)} Sqft</Badge>
          </div>

          <div className="space-x-1 ">
            <Button size="sm" className="hidden group-hover:inline-block">
              Incomes
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
              <h2 className="mb-3 mr-10 text-2xl"> {data?.title} </h2>
              <Print>{data}</Print>
            </ModalV3>
          </div>
        </div>
      </CardV1>
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
