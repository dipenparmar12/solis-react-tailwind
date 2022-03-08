import { BsChevronExpand } from 'react-icons/bs'
import {
  RiAddLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiAttachmentLine,
  RiDeleteBin7Line,
  RiDeleteBinLine,
  RiEditLine,
  RiEyeLine,
  RiFilter3Line,
  RiRefreshLine,
  RiShoppingBag3Line,
} from 'react-icons/ri'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import { FcPaid } from 'react-icons/fc'
import { IoMdDoneAll } from 'react-icons/io'
import { MdOutlineCloudDone, MdOutlineDoNotDisturbOff } from 'react-icons/md'
import { GrMoney } from 'react-icons/gr'
import { BiDollar } from 'react-icons/bi'
import { FiCheckCircle } from 'react-icons/fi'

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

  Complete: MdOutlineCloudDone,

  GrMoney,
  Dollar: BiDollar,
  Attachment: RiAttachmentLine,
  Bag: RiShoppingBag3Line,

  DND: MdOutlineDoNotDisturbOff,

  // Delete1: RiDeleteBinLine,
  // CheckCircle: FiCheckCircle,
}

export default Icons
