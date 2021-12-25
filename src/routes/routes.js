import Svg from '@/components/Svg/Svg'
import LoginPage from '@/pages/LoginPage'
import UserList from '@/pages/Users/List'
import ExamplesTemp from '@/temp/ExamplesTemp'
import PrivateTemp from '@/temp/PrivateTemp'
import Env from '@/utils/environment'

export const testRoutes = {
  projects: {
    label: 'Projects',
    path: '/Projects',
    element: <div className="text-2xl"> Projects </div>,
    icon: <Svg.Plus />,
  },
  expenses: {
    label: 'Expenses',
    path: '/expenses',
    element: <div className="text-2xl"> Expenses </div>,
    icon: <Svg.Plus />,
  },
  incomes: {
    label: 'Incomes',
    path: '/incomes',
    element: <div className="text-2xl"> Incomes </div>,
    icon: <Svg.Plus />,
  },
  users: {
    label: 'Users',
    path: '/users',
    element: <UserList />,
    icon: <Svg.Users />,
  },
  profile: {
    label: 'Profile',
    path: '/profile',
    element: <PrivateTemp />,
    icon: <Svg.User />,
  },
  examples: {
    label: 'Examples',
    path: '/examples',
    element: <ExamplesTemp />,
    icon: <Svg.InfoCircle />,
  },
  a: {
    label: 'Route expenses',
    path: '/expenses',
    element: <div> path: /expenses </div>,
    icon: <Svg.InfoCircle />,
  },
  b: {
    label: 'Route incomes',
    path: '/incomes',
    element: <div> path: /Route incomes </div>,
    icon: <Svg.InfoCircle />,
  },
  dropdown: {
    label: 'Dropdown',
    path: '/dropdown',
    element: <div className="text-2xl"> Dropdown </div>,
    icon: <Svg.Home />,
    children: {
      a: {
        label: 'Route expenses',
        path: '/expenses',
        element: <div> path: /expenses </div>,
        icon: <Svg.InfoCircle />,
      },
      b: {
        label: 'Route incomes',
        path: '/incomes',
        element: <div> path: /Route incomes </div>,
        icon: <Svg.InfoCircle />,
      },
    },
  },
}

export const routesPublic = {
  login: {
    label: 'Login',
    path: '/login',
    element: <LoginPage />,
    public: true,
  },
}

export const routesPrivate = {
  home: {
    label: 'Home',
    path: '/',
    element: <div className="text-2xl"> Home </div>,
    icon: <Svg.Plus />,
  },
  ...(Env.IsDev ? testRoutes : {}),
}

const routes = {}
export default routes