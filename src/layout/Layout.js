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
              onClick={(e) => setIsVisible(!isVisible)}
              aria-controls='sidebar'
              className='btn__hamburger'
            >
              <Svg.MenuAlt1 />
            </button>
          </div>
        </div>
      </div>

      {/* SIDEBAR & CONTENT */}
      <div className='h-[calc(100vh_-_3.5rem)] relative flex '>
        {/* sidebar */}
        <nav
          className={cn(['sidebar_nav', !isVisible && '-translate-x-full'])}
          // ref={ref}
        >
          <a href='/#' className={cn('sidebar_nav__item')}>
            <SvgLabel title={'Plus'} label={'Projects'} />
          </a>

          <a
            href='/#'
            className={cn('sidebar_nav__item', 'bg-gray-200 text-black')}
          >
            <SvgLabel as={Svg.Plus} label={'Incomes'} />
          </a>

          <a href='/#' className={cn('sidebar_nav__item')}>
            <SvgLabel as={Svg.Plus} label={'Expenses'} />
          </a>

          <a href='/#' className={cn('sidebar_nav__item')}>
            <SvgLabel as={Svg.Plus} label={'Users'} />
          </a>
        </nav>

        {/* content */}
        <div className='flex-1 px-5 py-8 lg:px-8 '>
          <h1 className='bg h1'>
            One content goes
            <span> HERE </span>
          </h1>
          <h2>Two content goes here</h2>
        </div>
      </div>
    </>
  )
}

export default Layout

// @src: https://codepen.io/chris__sev/pen/RwKWXpJ?editors=1000
// @src: https://github.com/fireship-io/tailwind-dashboard
