// @src/hooks/useMediaQuery.js
import React, { useEffect, useState } from 'react'
import debounce from '../utils/debounce'

const useMediaQuery = (minWidth) => {
  const [state, setState] = useState({
    windowWidth: window.innerWidth,
    isDesiredWidth: false,
  })

  const resizeHandler = React.useCallback(
    debounce(() => {
      const currentWindowWidth = window.innerWidth
      const isDesiredWidth = currentWindowWidth < minWidth
      setState({ windowWidth: currentWindowWidth, isDesiredWidth })
    }, 200),
    [setState],
  )

  useEffect(() => {
    window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [state.windowWidth])

  return state.isDesiredWidth
}

export default useMediaQuery

export function useWhichDevice() {
  const isSm = useMediaQuery(640)
  const isMd = useMediaQuery(768)
  const isLg = useMediaQuery(1024)
  const isXl = useMediaQuery(1280)
  const is2Xl = useMediaQuery(1536)

  const breakpoints = { isSm }

  return { ...breakpoints }
  // 'sm': '640px', //  @media (min-width: 640px) { ... }
  // 'md': '768px', //  @media (min-width: 768px) { ... }
  // 'lg': '1024px', //  @media (min-width: 1024px) { ... }
  // 'xl': '1280px', //  @media (min-width: 1280px) { ... }
  // '2xl': '1536px', //  @media (min-width: 1536px) { ... }
}
