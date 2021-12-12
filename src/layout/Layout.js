import React from 'react'
import LogoIMG from './../assets/img/logo.png'
import Svg, { SvgLabel } from '../lib/Svg/Svg'
import cn from '../utils/classNames'

const Layout = () => {
  const [isVisible, setIsVisible] = React.useState(false)
  return (
    <>
      {/* TOP NAVIGATION */}
      <div className='flex items-center justify-between w-full p-3 px-4 text-xl border-b shadow h-14'>
        {/* logo */}
        <a href='#/' className='flex items-center space-x-1'>
          <img src={LogoIMG} className='h-8 mr-2 shadow-xl' alt='Logo' />
          <span className='self-center text-lg font-extrabold md:text-xl whitespace-nowrap'>
            Solis App
          </span>
        </a>

        <div>
          <div className='flex md:hidden' id='mobile_only'>
            <button
              onClick={(e) => {
                setIsVisible(!isVisible)
              }}
              id='toggleSidebarMobile'
              aria-controls='sidebar'
              className='p-2 ml-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100'
            >
              <Svg.MenuAlt1 />
            </button>
          </div>
        </div>
      </div>

      {/* SIDEBAR & CONTENT */}
      <div className='h-[calc(100vh_-_3.5rem)] relative flex res_bg'>
        {/* sidebar */}
        <div
          className={cn([
            'absolute inset-y-0 left-0 w-48 px-2 space-y-6 bg-gray-100 transition duration-200 ease-in-out transform shadow-md sidebar py-7 md:relative md:translate-x-0',
            !isVisible && '-translate-x-full',
          ])}
          // ref={ref}
        >
          {/* nav */}
          <nav className='space-y-2'>
            <a
              href='/#'
              className={cn([
                'block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-black',
              ])}
            >
              <SvgLabel title={'Plus'} label={'Projects'} />
            </a>

            {/* <a href='/#' className={cn('sidebar_nav__item', 'bg-white')}>
              <SvgLabel as={Svg.Plus} label={'Incomes'} />
            </a> */}
          </nav>
        </div>

        {/* content */}
        <div className='flex-1 px-5 py-8 lg:px-8 '>content goes here</div>
      </div>
    </>
  )
}

export default Layout

// @src: https://codepen.io/chris__sev/pen/RwKWXpJ?editors=1000
// @src: https://github.com/fireship-io/tailwind-dashboard
