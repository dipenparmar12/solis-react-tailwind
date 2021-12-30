import React from 'react'
import ReactDom from 'react-dom'

/**
 *
 * @param {*} param0
 * @returns
 * @src https://stackoverflow.com/a/59154364/8592918
 */
const Portal = ({ children, className = 'root-portal', el = 'div' }) => {
  const container = React.useRef(document.createElement(el)).current

  React.useEffect(() => {
    container.classList.add(className)
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return ReactDom.createPortal(children, container)
}

export default Portal
