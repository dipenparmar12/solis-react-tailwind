import React from 'react'

function ErrorStateUnMemoized({ error }) {
  if (!error) return null
  // Empty bin error SVG state
  return (
    <>
      <div className="w-full text-red-500 h-36 ">
        <div className="flex items-center justify-center mt-10 ">
          <svg
            className="w-10 h-10 "
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="mt-2 text-sm text-center ">
          {error?.message || error}
        </div>
      </div>
    </>
  )
}
const ErrorState = React.memo(ErrorStateUnMemoized)
export default ErrorState
