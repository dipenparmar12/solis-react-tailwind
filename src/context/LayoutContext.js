import React from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'
import useOnEscapeKeyDown from '@/hooks/useOnEscapeKeyDown'
// import useOnOutsideClick from '@/hooks/useOnOutsideClick'

const LayoutContext = React.createContext(null)
export default function LayoutProvider({ children }) {
  //  Mini Sidebar or Full Sidebar
  const [isMiniSidebar, setIsMiniSidebar] = useLocalStorage(
    'isMiniSidebar',
    false,
  ) // TODO:: useMediaQuery to detect screen size

  const [isSidebarVisible, setIsSidebarVisible] = React.useState(false)
  const handleUnVisibleSideBar = () => setIsSidebarVisible(false)
  const sidebarRef = React.useRef()
  // useOnOutsideClick(sidebarRef, isSidebarVisible, handleUnVisibleSideBar)
  useOnEscapeKeyDown(isSidebarVisible, handleUnVisibleSideBar)

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    isMiniSidebar,
    setIsMiniSidebar,
    sidebarRef,
    sidebarIsVisible: isSidebarVisible,
    setSidebarIsVisible: setIsSidebarVisible,
  }
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

export function useLayoutContext() {
  return React.useContext(LayoutContext)
}
