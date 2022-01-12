import React from 'react'
import ReactDatePicker from 'react-datepicker'
import classNames from 'classnames'
import InputApp from '@/components/molecules/Form/InputApp'
import ToggleAnim from '@/hoc/animation/ToggleAnim'
import { useFundContext } from './Funds'
import { inputDateStyles } from '@/components/molecules/Form/InputDate'

function FundFilters({ isVisible }) {
  const { State: FundState = {}, setQry, qry } = useFundContext()
  const [dateRange, setDateRange] = React.useState([null, null])
  const [startDate, endDate] = dateRange

  return (
    <ToggleAnim isVisible={isVisible}>
      <div className="p-5 py-3 my-4 space-y-2 text-gray-400 border dark:border-gray-600">
        <div className="flex gap-4 ">
          <div className="flex-1 ">
            <label
              className={classNames(
                'flex items-center mb-1 text-gray-500 dark:text-gray-300',
              )}
            >
              Date Range
            </label>
            <ReactDatePicker
              dateFormat={'dd/MM/yyyy'}
              className={classNames([inputDateStyles, 'flex-1'])}
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setQry.merge({ from_date: update[0], to_date: update[1] })
                setDateRange(update)
              }}
            />
          </div>
        </div>
      </div>
    </ToggleAnim>
  )
}

export default FundFilters
