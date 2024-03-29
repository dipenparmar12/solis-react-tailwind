import React from 'react'

export default function LayoutTest() {
  return (
    <>
      <div className="flex-col w-full md:flex md:flex-row md:min-h-screen">
        <div className="flex flex-col flex-shrink-0 w-full text-gray-700 bg-white shadow-xl md:w-48 dark-mode:text-gray-200 dark-mode:bg-gray-800">
          <div className="flex flex-row items-center justify-between flex-shrink-0 px-8 py-4">
            <a
              href="#/"
              className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
            >
              Solis
            </a>
          </div>
          <nav className="flex-grow px-4 pb-4 md:block md:pb-0 md:overflow-y-auto ">
            <a
              className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href="#/"
            >
              Blog
            </a>
            <a
              className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href="#/"
            >
              Portfolio
            </a>
            <a
              className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href="#/"
            >
              About
            </a>
            <a
              className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href="#/"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </>
  )
}
