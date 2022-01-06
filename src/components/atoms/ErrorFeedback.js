import React from 'react'

function ErrorFeedback({ error }) {
  if (!error) return null
  return <div className={'text-red-400 mt-1 text-sm font-medium'}>{error}</div>
}

export default React.memo(ErrorFeedback)
