import React, { useRef, useState } from 'react'
import { useTransition, animated, config } from 'react-spring'
import useToggle from '@/hooks/useToggle'
import InputApp from '@/components/molecules/Form/InputApp'

function getElementHeight(ref) {
  return ref.current ? ref.current.getBoundingClientRect().height : 0
}
/**
 * TODO::Animation for toggle
 * @param {*} param0
 * @returns
 * @see https://medium.com/clever-franke/create-a-react-slidetoggle-component-with-hooks-and-react-spring-748919c38667
 */
export default function ToggleAnim({ isVisible, children }) {
  const innerRef = useRef(null)

  const transitions = useTransition(isVisible, {
    from: { height: 0, overflow: 'hidden' },
    enter: { height: getElementHeight(innerRef), overflow: 'visible' },
    leave: { height: 0, overflow: 'hidden' },
  })

  return <div className={isVisible ? 'block' : 'hidden'}> {children}</div>
}

export const TestAnimExample = () => {
  const [isVisible, setVisible] = React.useState(false)
  return (
    <>
      <ToggleAnim isVisible={isVisible} setVisible={setVisible}>
        <div className="flex gap-4 my-4 ">
          <InputApp isClearable className="flex-1" label="Title " />
          <InputApp className="flex-1" label="Client " />
          <InputApp className="flex-1" label="Project Value " />
        </div>
      </ToggleAnim>
    </>
  )
}
