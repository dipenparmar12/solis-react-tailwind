import React from 'react'

export const CardLoading = ({ loading, count = 15 }) => {
  if (!loading) return null

  return (
    <>
      {[...Array(count)].map((i) => (
        <div
          key={`user__skeleton__${Math.random()}`}
          className="w-full max-w-lg p-3 px-2 py-2 mx-auto bg-white border rounded-md shadow-md lg:px-4 hover:shadow-lg dark:bg-gray-900 hover:border-gray-400 dark:border-gray-900 dark:hover:border-gray-800 "
        >
          <div
            className="flex items-center space-x-4 animate-pulse"
            style={{
              minHeight: '100px',
            }}
          >
            <div className="flex-1 py-1 space-y-6">
              <div className="space-y-3 ">
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

export default {}
