import cn from '@/utils/classNames'

export default function UserCard({ data }) {
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
