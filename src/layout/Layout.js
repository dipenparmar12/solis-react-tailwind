/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import Divider from '@/components/atoms/Divider'
import FadeScaleAnim from '@/hoc/animation/FadeScaleAnim'
import useOnOutsideClick from '@/hooks/useOnOutsideClick'
import useOnEscapeKeyDown from '@/hooks/useOnEscapeKeyDown'
import { useAuth } from '@/context/AuthContext'
import { useLayoutContext } from '@/context/LayoutContext'
import { useWhichDevice } from '@/hooks/useMediaQuery'
import { DarkModeToggle } from '@/hooks/useDarkMode'
import { NavLinkItem } from './_partials/NavLinkItem'
import { routes } from '../App'
import ProfilePic from '../assets/img/dipen.jpg'
import LogoIMG from '../assets/img/logo.png'
import Svg from '../components/Svg/Svg'
import cn from '../utils/classNames'

/**
 *  @src https://codepen.io/chris__sev/pen/RwKWXpJ?editors=1000
 *  @src https://github.com/fireship-io/tailwind-dashboard
 *  @src https://tailwindcomponents.com/component/neumorphism-sidebar
 *  @param {*}
 *  @returns
 */
const Layout = function ({ children }) {
  return (
    <>
      <TopNav />
      <div className="fixed flex w-full h-screen ">
        <Sidebar />

        {/* content */}
        <div className="w-full px-3 py-4 space-y-2 overflow-y-auto sm:px-4 md:px-5 lg:px-6 ">
          {children}{' '}
        </div>
      </div>
    </>
  )
}

export default Layout

const TopNav = () => {
  const {
    isMiniSidebar,
    setIsMiniSidebar,
    sidebarRef,
    sidebarIsVisible,
    setSidebarIsVisible,
  } = useLayoutContext()
  const { ...Size } = useWhichDevice()

  const testRef = React.useRef()
  return (
    <div
      ref={testRef}
      className="relative flex items-center justify-between w-full px-4 text-xl bg-white border-b shadow dark:bg-slate-700 dark:border-gray-800 h-14"
      // style={{ zIndex: '2' }}
    >
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
          <DarkModeToggle className={'h-7 w-7 text-gray-400'} />
          <DropDownMenuRef ref={testRef} />
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
  )
}

const Sidebar = () => {
  const { isMiniSidebar, sidebarRef, sidebarIsVisible } = useLayoutContext()
  const { ...Size } = useWhichDevice()

  return (
    <nav
      className={cn([
        'z-10 text-gray-700 absolute inset-y-0 left-0 px-2 space-y-2 transition duration-200 ease-in-out transform shadow-md py-7 md:relative md:translate-x-0 bg-white dark:bg-slate-900',
        !sidebarIsVisible && '-translate-x-full',
        !Size.isSm && isMiniSidebar ? 'w-16' : 'w-64',
      ])}
      ref={sidebarRef}
    >
      <NavLinkItem route={routes?.userCreate} />
      <NavLinkItem route={routes?.incomes} />
      <NavLinkItem route={routes?.expenses} />
      <NavLinkItem route={routes?.projects} />
      <NavLinkItem route={routes?.users} />
      <NavLinkItem route={routes?.profile} />
      <NavLinkItem route={routes?.examples} />
      {/* <NavDropDownItem route={routes?.dropdown} /> */}
    </nav>
  )
}

const DropDownMenu = ({ ...props }, forwardRef) => {
  const [isVisible, setIsVisible] = useState(false)
  const closeDropDown = () => setIsVisible(false)

  const dropDownRef = React.useRef()
  useOnOutsideClick([dropDownRef], isVisible, closeDropDown)
  useOnEscapeKeyDown(isVisible, closeDropDown)

  const auth = useAuth()
  return (
    <div ref={dropDownRef} className="relative text-base" style={{ zIndex: 5 }}>
      <button
        className="block mt-1 overflow-hidden rounded-full w-7 h-7"
        onClick={() => setIsVisible(!isVisible)}
        // onMouseEnter={() => setIsVisible(true)}
      >
        <img src={ProfilePic} alt="Pic" className="w-full h-full" />
      </button>

      <FadeScaleAnim isVisible={isVisible}>
        <ul
          className={cn(
            'absolute z-30 right-0 mt-1 transform bg-white dark:bg-gray-900 dark:text-gray-100 py-3 pb-2 w-48 rounded-lg shadow-xl',
            isVisible ? 'block' : 'hidden',
          )}
        >
          <li className="px-4 py-2 text-gray-600 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
            <a href="#" className="block">
              View Profile{' '}
            </a>
          </li>
          <li className="px-4 py-2 text-gray-600 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
            <a href="#" className="block">
              Exports
            </a>
          </li>
          <li className="px-4 py-2 text-gray-600 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
            <a href="#" className="block">
              Settings{' '}
            </a>
          </li>

          <Divider />
          <li className="px-4 py-2 text-gray-600 divide-y divide-yellow-500 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
            <a
              href="#"
              className="block"
              onClick={() => auth.signOutRedirect()}
            >
              Logout{' '}
            </a>
          </li>
        </ul>
      </FadeScaleAnim>
    </div>
  )
}

const DropDownMenuRef = React.forwardRef(DropDownMenu)
