import React from 'react'
import LogoIMG from './../assets/img/logo.png'
import Svg from '../lib/Svg/Svg'
import cn from '../utils/classNames'
import { NavLink } from 'react-router-dom'
import { routes, routesArr } from '../App'
import { Routes, Route } from 'react-router-dom'

function NavLinkItem({ route, label }) {
  return (
    <NavLink
      to={route?.path || '/'}
      className={({ isActive }) =>
        cn('sidebar_nav__item', isActive && 'bg-gray-200 text-black')
      }
    >
      <div className='flex items-center'>
        <span className='w-5'>{route?.icon}</span>
        <span className='ml-2'>{route?.label}</span>
      </div>
    </NavLink>
  )
}

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
          <NavLinkItem route={routes.projects} />
          <NavLinkItem route={routes.incomes} />
          <NavLinkItem route={routes.expenses} />
          <NavLinkItem route={routes?.users} />
        </nav>

        {/* content */}
        <div className='flex-1 px-5 py-8 space-y-2 lg:px-8 '>
          <Routes>
            {routesArr?.map(([k, route]) => (
              <Route {...route} key={route.label + k} path={route?.path} />
            ))}
          </Routes>
          <div className='border-b border-gray-200 lg:px-8' />

          <h1 className='pb-1 '>
            One content goes
            <span> HERE </span>
            <div>Two content goes here</div>
          </h1>
        </div>
      </div>
    </>
  )
}

export default Layout

// @src: https://codepen.io/chris__sev/pen/RwKWXpJ?editors=1000
// @src: https://github.com/fireship-io/tailwind-dashboard
