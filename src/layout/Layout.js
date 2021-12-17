/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import LogoIMG from '../assets/img/logo.png'
import Svg from '../lib/Svg/Svg'
import cn from '../utils/classNames'
import { routes } from '../App'
import { DarkModeToggle } from '../hooks/useDarkMode'
import useOutsideClicked from '../hooks/useOutsideClicked'
import ProfilePic from '../assets/img/dipen.jpg'
import { NavDropDownItem, NavLinkItem } from './_partials/NavLinkItem'
import { useAuth } from '../context/AuthContext'
import { useLayoutContext } from '../context/LayoutContext'
import { useWhichDevice } from '../hooks/useMediaQuery'

/**
 *  @src https://codepen.io/chris__sev/pen/RwKWXpJ?editors=1000
 *  @src https://github.com/fireship-io/tailwind-dashboard
 *  @src https://tailwindcomponents.com/component/neumorphism-sidebar
 *  @param {*}
 *  @returns
 */
const Layout = function ({ content, children }) {
  // const { ref, isVisible, setIsVisible } = useOutsideClicked()
  const {
    isMiniSidebar,
    setIsMiniSidebar,
    sidebarRef,
    sidebarIsVisible,
    setSidebarIsVisible,
  } = useLayoutContext()
  const { ...Size } = useWhichDevice()

  return (
    <>
      {/* TOP NAVIGATION */}
      <div className="relative z-10 flex items-center justify-between w-full px-4 text-xl bg-white border-b shadow dark:bg-slate-700 dark:border-gray-800 h-14">
        <div
          className={cn([
            'flex items-center justify-between space-x-2 ',
            !Size.isSm && isMiniSidebar ? 'w-16' : '',
          ])}
        >
          {/* logo */}
          <a
            href="#/"
            className={cn([
              'flex items-center space-x-1',
              !Size.isSm && isMiniSidebar ? 'w-16' : 'sm:w-16 md:w-60',
            ])}
          >
            <img src={LogoIMG} className="h-8 mr-2 shadow-xl" alt="Logo" />
            {!isMiniSidebar && (
              <span className="self-center text-lg font-extrabold md:text-xl whitespace-nowrap">
                Solis App
              </span>
            )}
          </a>

          {!Size.isSm && (
            <button onClick={() => setIsMiniSidebar(!isMiniSidebar)}>
              {isMiniSidebar ? (
                <Svg.ChevronDoubleRight />
              ) : (
                <Svg.ChevronDoubleLeft />
              )}
            </button>
          )}
        </div>

        <div className="flex">
          <div className="flex items-center space-x-3">
            <DarkModeToggle className={'h-7 w-7'} />
            <DropDownMenu />
          </div>

          <div className="flex md:hidden" id="mobile_only">
            <div>
              <button
                onClick={(e) => setSidebarIsVisible(!sidebarIsVisible)}
                aria-controls="sidebar"
                className="btn__hamburger"
                id="btn__hamburger"
              >
                <Svg.MenuAlt1 />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SIDEBAR & CONTENT */}
      <div className="h-[calc(100vh_-_3.5rem)] relative flex ">
        {/* sidebar */}
        <nav
          className={cn([
            'z-20 text-gray-700 absolute inset-y-0 left-0 px-2 space-y-2 transition duration-200 ease-in-out transform shadow-md py-7 md:relative md:translate-x-0 bg-white dark:bg-slate-900',
            !sidebarIsVisible && '-translate-x-full',
            !Size.isSm && isMiniSidebar ? 'w-16' : 'w-64',
          ])}
          ref={sidebarRef}
        >
          <NavLinkItem route={routes?.projects} />
          <NavLinkItem route={routes?.incomes} />
          <NavLinkItem route={routes?.expenses} />
          <NavLinkItem route={routes?.users} />
          <NavLinkItem route={routes?.profile} />

          <NavDropDownItem route={routes?.dropdown} />
          <NavLinkItem route={routes?.examples} />
        </nav>

        {/* content */}
        <div className="flex-1 px-5 py-8 space-y-2 lg:px-8 "> {children} </div>
      </div>
    </>
  )
}

export default Layout

const Divider = () => (
  <div className="my-2 border border-gray-100 dark:border-gray-800" />
)

const DropDownMenu = () => {
  const { ref, isVisible, setIsVisible } = useOutsideClicked()
  const auth = useAuth()
  return (
    <div ref={ref} className="relative text-base">
      <button
        className="block mt-1 overflow-hidden rounded-full w-7 h-7"
        onClick={() => setIsVisible(!isVisible)}
        // onMouseEnter={() => setIsVisible(true)}
      >
        <img src={ProfilePic} alt="Pic" className="w-full h-full" />
      </button>

      <ul
        className={cn(
          'absolute z-30 right-0 mt-1 transform bg-white dark:bg-gray-900 dark:text-gray-100 py-3 pb-2 w-48 rounded-lg shadow-xl',
          isVisible ? 'block' : 'hidden',
        )}
      >
        <li className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
          <a href="#" className="block">
            View Profile{' '}
          </a>
        </li>
        <li className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
          <a href="#" className="block">
            Exports
          </a>
        </li>
        <li className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
          <a href="#" className="block">
            Settings{' '}
          </a>
        </li>

        <Divider />
        <li className="px-4 py-2 text-gray-600 divide-y divide-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
          <a href="#" className="block" onClick={() => auth.signOutRedirect()}>
            Logout{' '}
          </a>
        </li>
      </ul>
    </div>
  )
}
