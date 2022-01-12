import React from 'react'
import { RiCloseLine } from 'react-icons/ri'
import classNames from 'classnames'
import capitalize from '@/utils/str/capitalize'
import BadgeButton from './BadgeButton'

function BadgeList({ qry, setQry, className }) {
  return (
    <div className={classNames(['flex gap-2 my-2'], className)}>
      {/* Filter Badges */}
      {Object.entries(qry || {}).map(([filterKey, value]) => (
        <div key={filterKey} className="">
          <BadgeButton
            variant="green"
            icon={RiCloseLine}
            onClick={() => setQry?.omit(filterKey)}
          >
            {capitalize(filterKey)}: {String(value)}
          </BadgeButton>
        </div>
      ))}
    </div>
  )
}

export default React.memo(BadgeList)
