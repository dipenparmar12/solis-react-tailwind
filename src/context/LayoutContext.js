import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import useOutsideClicked from '../hooks/useOutsideClicked'

const LayoutContext = React.createContext(null)
export default function LayoutProvider({ children }) {
  //  Mini Sidebar or Full Sidebar
  const [isMiniSidebar, setIsMiniSidebar] = useLocalStorage(
    'isMiniSidebar',
    false,
  ) // TODO:: useMediaQuery to detect screen size

  // Toggle Mini Sidebar
  const {
    ref: sidebarRef,
    isVisible: sidebarIsVisible,
    setIsVisible: setSidebarIsVisible,
  } = useOutsideClicked()

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    isMiniSidebar,
    setIsMiniSidebar,
    sidebarRef,
    sidebarIsVisible,
    setSidebarIsVisible,
  }
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

export function useLayoutContext() {
  return React.useContext(LayoutContext)
}
