import { BsCheck2Circle, BsChevronExpand, BsQuestion } from 'react-icons/bs'
import {
  RiAddLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiAttachmentLine,
  RiDeleteBin7Line,
  RiDeleteBinLine,
  RiEditLine,
  RiErrorWarningLine,
  RiEyeLine,
  RiFilter3Line,
  RiHandCoinLine,
  RiIndeterminateCircleLine,
  RiQuestionMark,
  RiRefreshLine,
  RiShoppingBag3Line,
} from 'react-icons/ri'
import { VscCheckAll, VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import { FcPaid } from 'react-icons/fc'
import { IoIosCloseCircleOutline, IoMdDoneAll } from 'react-icons/io'
import { MdOutlineCloudDone, MdOutlineDoNotDisturbOff } from 'react-icons/md'
import { GrMoney } from 'react-icons/gr'
import { BiDollar } from 'react-icons/bi'
import { FiCheckCircle } from 'react-icons/fi'
import { TiDelete } from 'react-icons/ti'

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

  Add: RiAddLine,
  Edit: RiEditLine,
  Delete: RiDeleteBin7Line,

  Eye: RiEyeLine,
  Filter: RiFilter3Line,
  Refresh: RiRefreshLine,

  // Complete: MdOutlineCloudDone,
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

  // Delete1: RiDeleteBinLine,
  // CheckCircle: FiCheckCircle,
}

export default Icons
