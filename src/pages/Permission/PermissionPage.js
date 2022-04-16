import React from 'react'
import InputApp from '@/components/molecules/Form/InputApp'
import useObject from '@/hooks/useObject'
import Button from '@/components/atoms/Button'
import { usePermissionContext } from '@/context/PermissionContext'
import Print from '@/components/atoms/Print'
import Api from '@/services/ApiService'

const PermissionPage = () => {
  return (
    <div className="px-5 py-5 bg-white border shadow-md dark:bg-gray-900 dark:border-gray-700 ">
      <PermissionCreate />

      <PermissionList />
    </div>
  )
}

export default PermissionPage

const PermissionList = () => {
  const { authPermissions } = usePermissionContext() || {}
  return (
    <div className={'my-2'}>
      <div className="grid grid-cols-2">
        {Object.values(authPermissions || {}).map((perm, i) => {
          return (
            <div
              key={perm?.name}
              className={
                'flex border my-2 gap-2 bg-sky-100 dark:bg-sky-900 mx-1 p-2'
              }
            >
              <div className="p-1">{i}</div>
              <div className="p-1 ">{perm?.group}</div>
              <div className="p-1 flex-1">{perm?.name}</div>
              <div className="p-1 px-2 flex-1 bg-sky-200 dark:bg-sky-800">
                {perm?.display_name || '-'}
              </div>
            </div>
          )
        })}
      </div>

      {/* <Print>{authPermissions}</Print> */}
    </div>
  )
}

const PermissionCreate = () => {
  const [inputs, setInputs] = useObject({
    name: 'project-estimate-show',
    display_name: 'Project Estimate Show',
  })

  const createPermission = () => {
    setInputs.reset()
    Api.auth.permissions.create(inputs)
  }

  return (
    <div className={'my-2'}>
      <h2>Permission Create </h2>

      <div className="flex flex-col items-center gap-3 my-2 md:flex-row">
        <InputApp
          delay={500}
          placeholder={'Permission'}
          value={inputs?.name}
          onChange={(e) => setInputs.merge({ name: e?.target?.value })}
        />
        <InputApp
          delay={500}
          placeholder={'Display Name'}
          value={inputs?.display_name}
          onChange={(e) => setInputs.merge({ display_name: e?.target?.value })}
        />

        <div>
          <Button
            onClick={createPermission}
            variant="reset"
            className="px-6 py-1.5  btn_subtle__blue"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
