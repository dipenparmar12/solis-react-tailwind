import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import useLocalStorage from '@/hooks/useLocalStorage'
import routes, { routesPublic } from '@/routes/routes'

/**
 *
 * @src https://reactrouter.com/docs/en/v6/examples/auth
 */

// TODO::AUTH API integration
export const authService = {
  isAuthenticated: false,
  signIn(callback) {
    authService.isAuthenticated = true
    setTimeout(callback, 100) // fake async
  },
  signOut(callback) {
    authService.isAuthenticated = false
    setTimeout(callback, 100)
  },
}

const AuthContext = React.createContext(null)
export default function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('authUser', false)
  const navigate = useNavigate()

  const signIn = (userObj, callback) => {
    return authService.signIn(() => {
      setUser(userObj)
      callback({ user: userObj })
    })
  }

  const signOut = (callback) => {
    return authService.signOut(() => {
      setUser(null)
      callback()
    })
  }

  const signOutRedirect = (newUser, callback) => {
    return authService.signOut(() => {
      setUser(newUser)
      navigate(routes?.login?.path)
    })
  }

  React.useEffect(() => {
    if (!Cookies.get('token')) signOutRedirect()
  }, [])

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { user, signIn, signOut, signOutRedirect }
  // const value = React.memo(() => ({ user, signIn, signOut })) // Not working
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return React.useContext(AuthContext)
}

export const RequireAuth = function ({ children }) {
  const auth = React.useContext(AuthContext)
  const location = useLocation()
  // React.useEffect(() => {
  //   console.log('AuthContext.js::[55]', auth.user)
  // }, [auth.user])

  if (!auth.user) {
    return <Navigate to={routesPublic?.login.path} state={{ from: location }} />
  }

  return children
}

/* ------------------------------------
  Example
  const auth = useAuth()
  console.log(auth?.user?.id)
  console.log(auth?.user?.name)
 ------------------------------------ */
