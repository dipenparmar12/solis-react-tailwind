import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import LogoIMG from '../assets/img/logo.png'
import Svg from '../lib/Svg/Svg'
import cn from '../utils/classNames'
import { routes } from '../App'
import { DarkModeToggle } from '../hooks/useDarkMode'
import useOutsideClicked from '../hooks/useOutsideClicked'

const NavLinkItem = ({ route }) => {
  if (!route) return null
  return (
    <NavLink
      to={route?.path || '/'}
      className={({ isActive }) =>
        cn('sidebar_nav__item', isActive && 'active')
      }
    >
      <div className="flex items-center ">
        <span className="w-5 pt-1">{route?.icon}</span>
        <span className="ml-3">{route?.label}</span>
      </div>
    </NavLink>
  )
}

const NavDropDown = ({ route }) => {
  const { ref, isVisible, setIsVisible } = useOutsideClicked()
  if (!route) return null
  return (
    <>
      <ul
        ref={ref}
        className="max-h-full space-y-1 overflow-y-auto text-gray-700 divide-y dark:text-gray-400 sidebar_nav__list group"
      >
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="flex items-center w-full px-4 py-2 transition-transform transform rounded-md"
        >
          <span>{route?.icon}</span>
          <span className="ml-2 font-medium">Dashboard</span>
          <span className="ml-auto">
            <Svg.ArrowDown
              className={cn([
                'transition-transform group-hover:',
                isVisible ? 'rotate-0' : '-rotate-90',
              ])}
            />
          </span>
        </button>

        <ul
          className={cn([
            'pl-4 space-y-2 border-none',
            isVisible ? 'block' : 'hidden',
          ])}
        >
          {Object.values(route.children).map((child) => (
            <li key={child.path}>
              <NavLinkItem route={child} />
            </li>
          ))}
        </ul>
      </ul>
    </>
  )
}

const Layout = function ({ content, children }) {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <>
      {/* TOP NAVIGATION */}
      <div className="relative z-10 flex items-center justify-between w-full p-3 px-4 text-xl bg-white border-b shadow dark:bg-slate-700 dark:border-gray-800 h-14">
        {/* logo */}
        <a href="#/" className="flex items-center space-x-1">
          <img src={LogoIMG} className="h-8 mr-2 shadow-xl" alt="Logo" />
          <span className="self-center text-lg font-extrabold md:text-xl whitespace-nowrap">
            Solis App
          </span>
        </a>

        <div>
          <DarkModeToggle />
        </div>

        <div className="flex md:hidden" id="mobile_only">
          <div>
            <button
              onClick={(e) => setIsVisible(!isVisible)}
              aria-controls="sidebar"
              className="btn__hamburger"
            >
              <Svg.MenuAlt1 />
            </button>
          </div>
        </div>
      </div>

      {/* SIDEBAR & CONTENT */}
      <div className="h-[calc(100vh_-_3.5rem)] relative flex ">
        {/* sidebar */}
        <nav
          className={cn(['sidebar_nav', !isVisible && '-translate-x-full'])}
          // ref={ref}
        >
          <NavLinkItem route={routes?.projects} />
          <NavLinkItem route={routes?.incomes} />
          <NavLinkItem route={routes?.expenses} />
          <NavLinkItem route={routes?.users} />
          <NavLinkItem route={routes?.profile} />

          <NavDropDown route={routes?.dropdown} />
          <NavLinkItem route={routes?.examples} />
        </nav>

        {/* content */}
        <div className="flex-1 px-5 py-8 space-y-2 lg:px-8 "> {children} </div>
      </div>
    </>
  )
}

export default Layout

// @src: https://codepen.io/chris__sev/pen/RwKWXpJ?editors=1000
// @src: https://github.com/fireship-io/tailwind-dashboard
// @src: https://tailwindcomponents.com/component/neumorphism-sidebar
