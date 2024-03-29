import { BsCheck2Circle, BsChevronExpand, BsQuestion } from 'react-icons/bs'
import {
  RiAddLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiAttachmentLine,
  RiBankCardLine,
  RiBuilding2Line,
  RiDeleteBin7Line,
  RiDeleteBinLine,
  RiEditLine,
  RiErrorWarningLine,
  RiEyeLine,
  RiFilter3Line,
  RiFilterLine,
  RiHandCoinLine,
  RiIndeterminateCircleLine,
  RiQuestionMark,
  RiRefreshLine,
  RiSettingsLine,
  RiShoppingBag3Line,
  RiShutDownLine,
  RiUserFollowLine,
} from 'react-icons/ri'
import {
  VscCheckAll,
  VscChevronDown,
  VscChevronRight,
  VscLock,
} from 'react-icons/vsc'
import { FcPaid } from 'react-icons/fc'
import { IoIosCloseCircleOutline, IoMdDoneAll } from 'react-icons/io'
import {
  MdAttachMoney,
  MdOutlineCloudDone,
  MdOutlineDoNotDisturbOff,
} from 'react-icons/md'
import { GrMoney } from 'react-icons/gr'
import { BiDollar } from 'react-icons/bi'
import { FiCheckCircle } from 'react-icons/fi'
import { TiDelete } from 'react-icons/ti'
import { AiOutlineExport } from 'react-icons/ai'
import { IoShieldOutline } from 'react-icons/io5'

/**
 * Icons for the application
 * @example
 * <Icons.Add />
 * <Icons.Filter className="inline-block mb-1" /> Filters
 */
const Icons = {
  Test: MdOutlineCloudDone,
  Sorting: <BsChevronExpand className="inline-block px-0.5 " />,
  SortingAsc: <RiArrowUpSLine className="inline-block text-sky-500" />,
  SortingDesc: <RiArrowDownSLine className="inline-block text-sky-500" />,
  ArrowRight: <VscChevronRight className="inline-block" />,
  ArrowDown: <VscChevronDown className="inline-block" />,

  User: RiUserFollowLine,
  Settings: RiSettingsLine,

  Add: RiAddLine,
  Edit: RiEditLine,
  Delete: RiDeleteBin7Line,

  Eye: RiEyeLine,
  Filter: RiFilter3Line,
  Refresh: RiRefreshLine,

  Complete: MdOutlineCloudDone,
  // Check: BsCheck2Circle,
  CheckDouble: VscCheckAll,
  Question: BsQuestion,
  Terminate: TiDelete,

  GrMoney,
  Dollar: BiDollar,
  Attachment: RiAttachmentLine,
  Bag: RiShoppingBag3Line,

  DND: MdOutlineDoNotDisturbOff,

  HandCoin: RiHandCoinLine,

  Building: RiBuilding2Line,

  Dollar2: MdAttachMoney,
  // Delete1: RiDeleteBinLine,
  // CheckCircle: FiCheckCircle,
  Lock: VscLock,
  Shield: IoShieldOutline,
  Export: AiOutlineExport,
  ShutDown: RiShutDownLine,
  Filter2: RiFilterLine,

  CardLine: RiBankCardLine,
}

export default Icons
