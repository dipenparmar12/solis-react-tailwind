import React from 'react'
import Svg from '@/components/Svg/Svg'

export default function SvgExamples() {
  return (
    <>
      <div className="flex flex-wrap space-x-3 ">
        {Object.entries(Svg).map(([name, SvgComponent]) => {
          return (
            <div
              key={name}
              className="flex flex-col items-center p-3 m-3 cursor-pointer hover:text-blue-700 dark:hover:text-green-600"
            >
              <SvgComponent
                className={
                  'hover:text-green-600 hover:scale-110  transition-all '
                }
              />
              {name}
            </div>
          )
        })}
      </div>
    </>
  )
}
