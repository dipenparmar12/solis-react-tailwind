import { Routes, Route } from 'react-router-dom'
import React from 'react'
import ResponsiveBadgeHelper from '@/components/atoms/ResponsiveBadgeHelper'
import { RequireAuth } from '@/context/AuthContext'
import Layout from '@/layout/Layout'
import { routesPrivate, routesPublic } from './routes/routes'
import NotFound from './pages/NotFound'
import AccessControl from '@/components/atoms/AccessControl'

export const routes = { ...routesPrivate, ...routesPublic }
export const routesPrivateArr = Object.entries(routesPrivate)
export const routesPublicArr = Object.entries(routesPublic)

const App = function () {
  return (
    <>
      <Routes>
        {routesPrivateArr?.map(([k, route]) => {
          return (
            <Route
              // {...route}
              key={route.label + k}
              path={route.path}
              exact
              element={
                <RequireAuth>
                  <Layout>
                    <AccessControl permissions={route?.permissions}>
                      {route.element}
                    </AccessControl>
                  </Layout>
                </RequireAuth>
              }
            />
          )
        })}
      </Routes>

      <Routes>
        {routesPublicArr?.map(([k, route]) => (
          <Route
            key={route.label + k}
            path={route.path}
            {...route}
            location={route.location}
          />
        ))}
        <Route path="/test" element={<div> Test Route login. </div>} />
        {/* <Route path="/" element={<LoginPage />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      <ResponsiveBadgeHelper />
    </>
  )
}

export default App
