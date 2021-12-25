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
