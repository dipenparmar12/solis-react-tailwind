/* eslint-disable react/jsx-no-constructed-context-values,camelcase */
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import Api from '@/services/ApiService'
import ContextFactory from '@/context/ContextFactory'
import Print from '@/components/atoms/Print'
import { useAuth } from '@/context/AuthContext'
import keyBy from '@/utils/collection/keyBy'
import get from '@/utils/obj/get'
import NotFound from '@/pages/NotFound'
import AccessDenied from '@/components/atoms/AccessDenied'
import AccessControlComponent from '@/components/atoms/AccessControl'
import Assertion from '@/utils/Assertion'

const { isFunction, isString, isArray } = Assertion

const [PermissionProvider, usePermissionContext, Context] = ContextFactory({
  name: 'PermissionContext',
})

export { usePermissionContext }

const PermissionsContext = ({ children }) => {
  const auth = useAuth()
  const user_id = auth?.user?.id
  const [authPermissions, setAuthPermissions] = useState({})

  // API call
  const apiState = useQuery(
    ['authPermissions', user_id],
    () =>
      Api.auth.permissions
        .get({ qry: { user_id } })
        .then((res) => res?.data?.results)
        .then((res) => {
          setAuthPermissions(keyBy(res, 'name'))
          return res
        }),
    {
      enabled: true,
      // refetchOnWindowFocus: false,
    },
  )

  const apiStateMemo = React.useMemo(() => {
    return apiState?.data
  }, [apiState?.data])

  /**
   * Check Auth user has specified perm
   * @example  userHasPermission('permission_name')
   */
  const userHasPermission = React.useCallback(
    (permission) => {
      if (isString(permission)) {
        return get(authPermissions, `${permission}.hsa_access`)
      }
      if (isArray(permission)) {
        return permission.some((permi) => {
          return get(authPermissions, `${permi}.hsa_access`)
        })
      }
      return true
    },
    [authPermissions],
  )

  const contextValue = {
    State: apiStateMemo,
    authPermissions,
    userHasPermission,
  }

  return (
    <PermissionProvider value={contextValue}>{children}</PermissionProvider>
  )
}

export default PermissionsContext
