import {
  RiBuilding2Line,
  RiUserFollowLine,
  RiInformationLine,
  RiAddLine,
} from 'react-icons/ri'
import { FiUsers } from 'react-icons/fi'
import Svg from '@/components/Svg/Svg'
import LoginPage from '@/pages/LoginPage'
import ProjectContainer from '@/pages/Projects/ProjectContainer'
import { UserAddFormContainer } from '@/pages/Users/AddForm'
import UserContainer from '@/pages/Users/UserContainer'
import ExamplesTemp from '@/temp/ExamplesTemp'
import PrivateTemp from '@/temp/PrivateTemp'
import Env from '@/utils/environment'

export const testRoutes = {
  userCreate: {
    label: 'User',
    path: '/users/create',
    element: <UserAddFormContainer />,
    icon: <RiAddLine />,
  },
  expenses: {
    label: 'Expenses',
    path: '/expenses',
    element: <div className="text-2xl"> Expenses </div>,
    icon: <RiAddLine />,
  },
  incomes: {
    label: 'Incomes',
    path: '/incomes',
    element: <div className="text-2xl"> Incomes </div>,
    icon: <RiAddLine />,
  },
  profile: {
    label: 'Profile',
    path: '/profile',
    element: <PrivateTemp />,
    icon: <RiUserFollowLine />,
  },
  examples: {
    label: 'Examples',
    path: '/examples',
    element: <ExamplesTemp />,
    icon: <RiInformationLine />,
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
  root: {
    label: 'Login',
    path: '/',
    element: <LoginPage />,
    public: true,
  },
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
    icon: <RiBuilding2Line />,
  },
  projects: {
    label: 'Projects',
    path: '/projects',
    element: <ProjectContainer />,
    icon: <RiBuilding2Line />,
  },
  users: {
    label: 'Users',
    path: '/users',
    element: <UserContainer />,
    icon: <FiUsers />,
  },
  ...(Env.IsDev ? testRoutes : {}),
}

const routes = {}
export default routes
