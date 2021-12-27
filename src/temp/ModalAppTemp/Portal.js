import React from 'react'
import ReactDOM from 'react-dom'

// TODO::React Portal not working
function Portal({ children, isVisible, parent = document.body, className }) {
  const divEl = React.useMemo(() => document.createElement('div'), [])
  React.useEffect(() => {
    const target = parent && parent.appendChild ? parent : document.body
    const classList = ['portal-container']
    if (className) className.split(' ').forEach((item) => classList.push(item))
    classList.forEach((item) => divEl.classList.add(item))
    target.appendChild(divEl)
    return () => {
      target.removeChild(divEl)
    }
  }, [divEl, parent, className])

  if (!isVisible) return null
  return ReactDOM.createPortal(children, divEl)
}
export default Portal
