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
import { UserAddFormContainer } from '@/pages/Users/AddForm'
import UsersContext from '@/pages/Users'
import ExamplesTemp from '@/temp/ExamplesTemp'
import PrivateTemp from '@/temp/PrivateTemp'
import Env from '@/utils/environment'
import { ProjectFormContainer } from '@/pages/Projects/Form'
import TransactionsContainer from '@/pages/Transactions/Transactions'
import FundContainer from '@/pages/Funds/Funds'
import AppContextState from '@/temp/Examples/AppContextState'
import SalaryPage from '@/pages/Salaries'
import Icons from '@/components/icons/Icons'
import IncomesContext from '@/pages/Incomes/Context'
import ExpenseContext from '@/pages/Expenses/Context'
import DealersContext from '@/pages/Dealers/Context'
import { IncomeFormContainer } from '@/pages/Incomes/Form'
import EstimatesContext from '@/pages/Estimates/Context'
import EstimateCreate, { EstimateFormContainer } from '@/pages/Estimates/Create'
import { ExpenseFormContainer } from '@/pages/Expenses/Create'
import ProjectsContext from '@/pages/Projects'
import { DealerPaymentFormContainer } from '@/pages/Dealers/CreatePayment'
import { FundFormContainer } from '@/pages/Funds/Create'
import UserPermissions from '@/pages/Users/Permissions'

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
    label: 'New User',
    path: '/users/create',
    element: <UserAddFormContainer />,
    icon: <Icons.Add />,
  },
  fundCreate: {
    label: 'New PettyCash',
    path: '/fund/create',
    element: <FundFormContainer />,
    icon: <Icons.Add />,
  },
  expenseCreate: {
    label: 'New Expense',
    path: '/expense/create',
    element: <ExpenseFormContainer />,
    icon: <Icons.Add className="" />,
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
  dealerPaymentCreate: {
    label: 'New Payment',
    path: '/dealers/payment/create',
    element: <DealerPaymentFormContainer />,
    icon: <Icons.Add />,
  },
  expenses: {
    label: 'Expenses',
    path: '/expenses',
    element: <ExpenseContext />,
    icon: <Icons.Dollar className="" />,
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
    icon: <Icons.Dollar2 />,
  },
  incomes: {
    label: 'Incomes',
    path: '/incomes',
    element: <IncomesContext />,
    icon: <Icons.HandCoin className="" />,
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
    element: <ProjectsContext />,
    // element: <ProjectContainer />,
    icon: <Icons.Building />,
    permissionsRequired: ['project-list-all'],
  },
  dealers: {
    label: 'Vendors',
    path: '/dealers',
    element: <DealersContext />,
    icon: <Icons.Bag className="" />,
  },
  estimates: {
    label: 'Estimates',
    path: '/estimates',
    element: <EstimatesContext />,
    icon: <Icons.Bag className="" />,
  },
  estimateCreate: {
    label: 'New Estimate',
    path: '/estimates/create',
    element: <EstimateFormContainer />,
    icon: <Icons.Add />,
  },
  users: {
    label: 'Users',
    path: '/users',
    element: <UsersContext />,
    icon: <FiUsers />,
  },
  transaction: {
    label: 'Transactions',
    path: '/transactions',
    element: <TransactionsContainer />,
    icon: <RiBankCardLine />,
  },
  // permissions: {
  //   label: 'Permissions',
  //   path: '/users?tab=permissions',
  //   element: <UsersContext />,
  //   icon: <RiBankCardLine />,
  // },
  ...(Env.IsDev ? testRoutes : {}),
}

const routes = {}
export default routes

/* ------------------------------------
  route = [
  {
    label: 'Projects',
    path: '/projects',
    element: <ProjectsContext />,
    icon: <Icons.Building />,
    permissionsRequired: ['project-list-all'],
    children: {
      b: {
        label: 'Route incomes',
        path: '/incomes',
        element: <div> path: /Route incomes </div>,
        icon: <Svg.InfoCircle />,
      },
   }
  ]

 ------------------------------------ */
