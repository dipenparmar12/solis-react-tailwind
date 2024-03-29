import React from 'react'
import { RiCloseLine } from 'react-icons/ri'
import classNames from 'classnames'
import capitalize from '@/utils/str/capitalize'
import BadgeButton from './BadgeButton'

const isNotEmpty = (value) =>
  value !== undefined && value !== null && value !== ''

function BadgeList({ qry, setQry, omitKeys, className }) {
  return (
    <div className={classNames(['flex flex-wrap gap-2 my-1'], className)}>
      {/* Filter Badges */}
      {Object.entries(qry || {})
        .filter(([_, v]) => isNotEmpty(v))
        .map(([filterKey, value]) => (
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
