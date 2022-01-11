import React from 'react'
import Env from '../../utils/environment'

function ResponsiveBadgeHelper() {
  if (Env.IsProd) return null
  return (
    <>
      <div className="fixed z-50 hidden py-2 text-sm font-bold text-center text-blue-900 bg-red-400 rounded-full sm:block bottom-2 right-2 w-14 sm:bg-green-400 md:bg-blue-500 lg:bg-yellow-300 xl:bg-purple-400 2xl:text-black">
        <span className="hidden sm:block md:hidden">sm</span>
        <span className="hidden md:block lg:hidden">md</span>
        <span className="hidden lg:block xl:hidden">lg</span>
        <span className="hidden xl:block 2xl:hidden">xl</span>
        <span className="hidden 2xl:block">2xl</span>
      </div>
    </>
  )
}
export default ResponsiveBadgeHelper
