/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import ReactDatePicker from 'react-datepicker'
import classNames from 'classnames'
import Select from 'react-dropdown-select'
import { RiCloseLine } from 'react-icons/ri'
import InputApp from '@/components/molecules/Form/InputApp'
import ToggleAnim from '@/hoc/animation/ToggleAnim'
import { useSalariesContext } from '.'
import { inputDateStyles } from '@/components/molecules/Form/InputDate'
import { useAppContext } from '@/context/AppContext'
import Print from '@/components/atoms/Print'
import InputSelect from '@/components/molecules/Form/InputSelect'
import qryParams from '@/utils/miscellaneous/qryParams'
import BadgeList from '@/components/atoms/BadgeList'
import SwitchSlide from '@/components/molecules/Form/SwitchSlide'

function SalaryFilters({ isVisible }) {
  const appContext = useAppContext()
  const {
    State: FundState = {},
    setQry,
    qry,
    omitParams,
  } = useSalariesContext()
  const [dateRange, setDateRange] = React.useState([null, null])
  const [startDate, endDate] = dateRange

  React.useEffect(() => {
    if (isVisible && !appContext?.staticData?.users?.length) {
      appContext.setResources(['users'])
    }
  }, [isVisible])

  // React.useEffect(() => {
  //   console.log('Filters.js::[28]', qryParams.get('user_ids'), )
  // }, [])

  return (
    <ToggleAnim isVisible={isVisible}>
      <div className="p-5 py-3 my-4 space-y-2 text-gray-400 border dark:border-gray-600">
        <div className="flex gap-4">
          <div className="flex-1">
            <InputSelect
              multi
              searchable
              clearable
              label="Select Users"
              placeholder="Select User"
              delay={1500}
              options={appContext?.staticData?.users || []}
              onChange={(values) =>
                setQry.merge({
                  page: 1,
                  user_ids: values.map(({ value }) => value),
                })
              }
              valueField="id"
              keepSelectedInList={false}
              // color="rgb(59 130 246)"
            />
            <Print>{setQry?.user_ids}</Print>
          </div>

          <div className="flex-1 ">
            <label
              className={classNames(
                'flex items-center mb-1 text-gray-500 dark:text-gray-300',
              )}
            >
              Date Range
            </label>
            <ReactDatePicker
              isClearable
              dateFormat={'dd/MM/yyyy'}
              className={classNames([inputDateStyles, 'flex-1'])}
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setQry.merge({
                  from_date: update[0],
                  to_date: update[1],
                  page: 1,
                })
                setDateRange(update)
              }}
            />
          </div>
        </div>

        <div className="pb-3">
          <SwitchSlide
            className={'flex-1'}
            name="trashed"
            label="Include deleted entires"
            value={qry?.trashed}
            onChange={(option) => {
              setQry?.merge({ trashed: option?.value || option })
            }}
            options={[
              {
                value: '',
                label: 'Clear',
                onSet: () => setQry.omit('trashed'),
              },
              { value: 1, label: 'Yes' },
              { value: 0, label: 'No' },
            ]}
          />
        </div>

        <BadgeList qry={qry} setQry={setQry} omitKeys={omitParams} />
      </div>
    </ToggleAnim>
  )
}

export default SalaryFilters
