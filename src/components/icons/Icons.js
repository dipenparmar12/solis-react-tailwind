import { BsChevronExpand } from 'react-icons/bs'
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiEyeLine,
  RiFilter3Line,
  RiRefreshLine,
} from 'react-icons/ri'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'

const Icons = {
  Sorting: <BsChevronExpand className="inline-block px-0.5 " />,
  SortingAsc: <RiArrowUpSLine className="inline-block text-sky-500" />,
  SortingDesc: <RiArrowDownSLine className="inline-block text-sky-500" />,
  ArrowRight: <VscChevronRight className="inline-block" />,
  ArrowDown: <VscChevronDown className="inline-block" />,

  Eye: RiEyeLine,
  Filter: RiFilter3Line,
  Refresh: RiRefreshLine,
}

export default Icons
