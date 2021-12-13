import Layout from './layout/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Svg from './lib/Svg/Svg'

export const routes = {
  projects: {
    label: 'Projects',
    path: `/projects`,
    element: <div className='text-2xl'> Projects </div>,
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
  return (
    <>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </>
  )
}

export default App
