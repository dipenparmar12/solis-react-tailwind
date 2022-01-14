import classNames from 'classnames'
import React from 'react'
import { RiAddLine } from 'react-icons/ri'
import { useSalariesContext } from '..'

function Tabs() {
  const { setTab, activeTab } = useSalariesContext()

  return (
    <div className=" whitespace-nowrap">
      <nav className="flex pb-3 overflow-auto">
        <button
          className={classNames([
            'btn_tab',
            activeTab === 'salaries' && 'active',
          ])}
          onClick={() => setTab('salaries')}
        >
          Salaries
        </button>
        <button
          className={classNames([
            'btn_tab',
            activeTab === 'advances' && ' active',
          ])}
          onClick={() => setTab('advances')}
        >
          Advances
        </button>
        <button
          className={classNames([
            'btn_tab',
            activeTab === 'advance_summary' && ' active',
          ])}
          onClick={() => setTab('advance_summary')}
        >
          Advance Summary
        </button>
        <button
          className={classNames([
            'btn_tab',
            activeTab === 'create_salary' && ' active',
          ])}
          onClick={() => setTab('create_salary')}
        >
          <RiAddLine className="inline-block" /> Salary
        </button>

        <button
          className={classNames([
            'btn_tab',
            activeTab === 'create_advance' && ' active',
          ])}
          onClick={() => setTab('create_advance')}
        >
          <RiAddLine className="inline-block" /> Advance
        </button>
      </nav>
    </div>
  )
}

export default Tabs
