import React from 'react'
import { useNavigate } from 'react-router-dom'
import Icons from '@/components/icons/Icons'

const AccessDenied = ({ msg = 'Access Denied', className, ...props }) => {
  const navigate = useNavigate()
  return (
    <span
      className={`mx-auto px-1 gap-1 text-red-500 flex items-center ${className}`}
      {...props}
    >
      <Icons.Lock className={'text-2xl '} />
      {msg}
      {/* <button className="inline-block link" onClick={() => navigate('/')}> */}
      {/*  Home{' '} */}
      {/* </button> */}
    </span>
  )
}
export default React.memo(AccessDenied)
