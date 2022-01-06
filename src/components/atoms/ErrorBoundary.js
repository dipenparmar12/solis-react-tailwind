import React from 'react'

/**
 * TEMP - Not used yet
 * @see https://stackoverflow.com/a/70179187/8592918
 */
class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: '' }
  }

  componentDidCatch(error) {
    this.setState({ error: `${error.name}: ${error.message}` })
  }

  render() {
    const { children } = this.props
    const { error } = this.state
    if (error) {
      return <>{error}</>
    }
    return <>{children}</>
  }
}

export default function ErrorBoundary({ children, ...props }) {
  return <ErrorBoundaryClass {...props}>{children}</ErrorBoundaryClass>
}
