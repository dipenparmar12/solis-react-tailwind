import {
  RiBuilding2Line,
  RiUserFollowLine,
  RiInformationLine,
  RiAddLine,
  RiBankCardLine,
  RiRefund2Line,
} from 'react-icons/ri'
import { FiUsers } from 'react-icons/fi'
import { MdAttachMoney, MdOutlineRealEstateAgent } from 'react-icons/md'
import Svg from '@/components/Svg/Svg'
import LoginPage from '@/pages/LoginPage'
import ProjectContainer from '@/pages/Projects/ProjectContainer'
import { UserAddFormContainer } from '@/pages/Users/AddForm'
import UserContainer from '@/pages/Users'
import ExamplesTemp from '@/temp/ExamplesTemp'
import PrivateTemp from '@/temp/PrivateTemp'
import Env from '@/utils/environment'
import { ProjectFormContainer } from '@/pages/Projects/Form'
import TransactionsContainer from '@/pages/Transactions/Transactions'
import FundContainer from '@/pages/Funds/Funds'
import AppContextState from '@/temp/Examples/AppContextState'
import SalaryPage from '@/pages/Salaries'
import IncomeList from '@/pages/Incomes/List'
import Icons from '@/components/icons/Icons'
import Incomes from '@/pages/Incomes/Context'
import { IncomeFormContainer } from '@/pages/Incomes/Form'

export const testRoutes = {
  profile: {
    label: 'Profile',
    path: '/profile',
    element: <PrivateTemp />,
    icon: <RiUserFollowLine />,
  },
  appContext: {
    label: 'AppContext',
    path: '/app-context',
    element: <AppContextState />,
    icon: <MdOutlineRealEstateAgent />,
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
  login: {
    label: 'Login',
    path: '/login',
    element: <LoginPage />,
    public: true,
  },
}

export const routesPrivate = {
  userCreate: {
    label: 'User',
    path: '/users/create',
    element: <UserAddFormContainer />,
    icon: <Icons.Add />,
  },
  incomeCreate: {
    label: 'New Income',
    path: '/incomes/create',
    element: <IncomeFormContainer />,
    icon: <Icons.Add className="" />,
  },
  projectCreate: {
    label: 'New Project',
    path: '/projects/create',
    element: <ProjectFormContainer />,
    icon: <Icons.Add />,
  },
  home: {
    label: 'Home',
    path: '/',
    element: <div className="text-2xl"> Home </div>,
    icon: <RiBuilding2Line />,
  },
  salaries: {
    label: 'Salaries',
    path: '/salaries',
    element: <SalaryPage />,
    icon: <MdAttachMoney />,
  },
  incomes: {
    label: 'Incomes',
    path: '/incomes',
    element: <Incomes />,
    icon: <Icons.Dollar className="" />,
  },
  funds: {
    label: 'PettyCase',
    path: '/funds',
    element: <FundContainer />,
    icon: <RiRefund2Line />,
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
  transaction: {
    label: 'Transactions',
    path: '/transactions',
    element: <TransactionsContainer />,
    icon: <RiBankCardLine />,
  },
  ...(Env.IsDev ? testRoutes : {}),
}

const routes = {}
export default routes
