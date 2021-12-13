import Layout from './layout/Layout'
import { Routes, Route } from 'react-router-dom'
import Svg from './lib/Svg/Svg'
import { RequireAuth, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import { useNavigate } from 'react-router-dom'
import React from 'react'

function Private() {
  let auth = useAuth()
  const navigate = useNavigate()
  return (
    <RequireAuth>
      <div>
        I am logged in as `{auth?.user}`
        <hr />
        <br />
        <button
          onClick={() => {
            auth.signOut(() => navigate('/'))
          }}
        >
          sing out{' '}
        </button>
      </div>
    </RequireAuth>
  )
}

export const routes = {
  login: {
    label: 'Login',
    path: '/login',
    element: <LoginPage />,
  },
  projects: {
    label: 'Projects',
    path: `/` | '/Projects',
    element: <Private />,
    // element: <Layout1>  <div className='text-2xl'> Projects </div> </Layout1>, // Example
    icon: <Svg.Plus />,
  },
  expenses: {
    label: 'Expenses',
    path: `/expenses`,
    element: <div className='text-2xl'> Expenses </div>,
    icon: <Svg.Plus />,
  },
  incomes: {
    label: 'Incomes',
    path: `/incomes`,
    element: <div className='text-2xl'> Incomes </div>,
    icon: <Svg.Plus />,
  },
  users: {
    label: 'Users',
    path: `/users`,
    element: <div className='text-2xl'> Users </div>,
    icon: <Svg.Plus />,
  },
}

export const routesArr = Object.entries(routes)

function App() {
  let auth = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login')
    }
  }, [auth.isAuthenticated, navigate])

  return (
    <>
      <Layout>
        <Routes>
          {routesArr?.map(([k, route]) => (
            <Route {...route} key={route.label + k} path={route?.path} />
          ))}
        </Routes>

        <br />
        <h1 className='pb-1 '>
          One content goes
          <span> HERE </span>
          <div>Two content goes here</div>
        </h1>
      </Layout>
    </>
  )
}

export default App
