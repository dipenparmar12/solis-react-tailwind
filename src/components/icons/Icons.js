import { BsChevronExpand } from 'react-icons/bs'
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiEyeLine,
  RiFilter3Line,
  RiRefreshLine,
} from 'react-icons/ri'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import { FcPaid } from 'react-icons/fc'
import { IoMdDoneAll } from 'react-icons/io'
import { MdOutlineCloudDone } from 'react-icons/md'

const Icons = {
  Test: MdOutlineCloudDone,
  Sorting: <BsChevronExpand className="inline-block px-0.5 " />,
  SortingAsc: <RiArrowUpSLine className="inline-block text-sky-500" />,
  SortingDesc: <RiArrowDownSLine className="inline-block text-sky-500" />,
  ArrowRight: <VscChevronRight className="inline-block" />,
  ArrowDown: <VscChevronDown className="inline-block" />,

  Eye: RiEyeLine,
  Filter: RiFilter3Line,
  Refresh: RiRefreshLine,

  Complete: MdOutlineCloudDone,
}

export default Icons
