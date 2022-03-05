import React from 'react'

function ErrorFeedback({ error: errorMassage }) {
  if (!errorMassage) return null
  return (
    <div className={'text-red-400 mt-1 text-sm font-medium'}>
      {errorMassage}
    </div>
  )
}

export default React.memo(ErrorFeedback)
