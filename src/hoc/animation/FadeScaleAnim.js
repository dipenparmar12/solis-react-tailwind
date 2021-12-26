import React from 'react'
import { animated, useSpring } from 'react-spring'

export default function FadeScaleAnim({ isVisible, children }) {
  const fade = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1) ' : 'scale(0.95) ',
    config: { duration: 100 },
  })
  return (
    <animated.div className="" style={fade}>
      {children}
    </animated.div>
  )
}
