import classNames from 'classnames'
import React from 'react'
import Types from '@/utils/validation/Types'

function Tabs({
  items = [],
  active: propsActive,
  setActive: tellParentToSetActive,
  callback = () => {},
}) {
  const [stateActive, setStateActive] = React.useState()
  const isControlled = propsActive !== undefined
  const activeTab = isControlled ? propsActive : stateActive

  const onClick = React.useCallback(
    (id) => {
      Types.isFunction(callback) && callback(id)
      isControlled ? tellParentToSetActive(id) : setStateActive(id)
    },
    [isControlled, tellParentToSetActive],
  )

  return (
    <div className=" whitespace-nowrap">
      <nav className="flex pb-3 overflow-auto">
        {items.map((tab) => {
          return (
            <TabButton
              key={tab?.id || tab?.name}
              tab={tab}
              onClick={onClick}
              activeTab={activeTab}
            />
          )
        })}
      </nav>
    </div>
  )
}

export default Tabs

const TabButton = React.memo(({ activeTab, onClick, tab }) => {
  const id = tab?.id || tab?.name

  return (
    <button
      className={classNames(['btn_tab', activeTab === id && 'active'])}
      onClick={() => onClick(id)}
    >
      {tab?.name}
    </button>
  )
})

/* ------------------------------------
  Tabs Example
  <Tabs
    items={[
      {
        id: 'Tab 1',
        name: 'Tab 1',
      },
      {
        id: 'Tab 2',
        name: 'Tab 13',
      },
      {
        id: 'Tab 3',
        name: 'Tab 3',
      },
    ]}
    callback={(activeTab) => {
      console.log('Context.js::57 activeTab', activeTab)
    }}
  />
 ------------------------------------ */
