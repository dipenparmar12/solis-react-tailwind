import React from 'react'
import get from '@/utils/obj/get'
import AccessDenied from '@/components/atoms/AccessDenied'
import { usePermissionContext } from '@/context/PermissionContext'
import Assertion from '@/utils/Assertion'

const { isFunction, isString, isArray } = Assertion

/**
 *
 * @param authPermissionsProp
 * @param permissions
 * @param renderNoAccess
 * @param accessCheck
 * @param children
 * @param fallback
 * @returns {*|JSX.Element}
 * @constructor
 * @see https://levelup.gitconnected.com/access-control-in-a-react-ui-71f1df60f354
 */
const AccessControlCore = ({
  authPermissionsProp,
  permissions,
  renderNoAccess,
  accessCheck,
  children,
  fallback,
}) => {
  const { authPermissions } = usePermissionContext() || {}
  const appPermissions = authPermissionsProp || authPermissions

  let permitted = true
  let hasPermission = null

  // when an accessCheck function is provided, ensure that passes as well as the permissions
  if (isFunction(accessCheck)) {
    permitted = accessCheck()
  }

  if (isString(permissions)) {
    hasPermission = get(appPermissions, `${permissions}.hsa_access`)
  } else if (isArray(permissions)) {
    hasPermission = permissions.some((permi) => {
      return get(appPermissions, `${permi}.hsa_access`)
    })
  } else {
    hasPermission = true
  }

  if (permitted && hasPermission) return children

  if (fallback !== undefined) return fallback

  return renderNoAccess ? renderNoAccess() : <AccessDenied />
}

const AccessControl = React.memo(AccessControlCore)
export default AccessControl

/* ------------------------------------
  AccessControl Example
 ------------------------------------

 <AccessControl
    // authPermissions={authPermissions}
    permission={'payment-create'}
    accessCheck={() => auth && auth.id === created_by_id }
  >
      I have Access
  </AccessControl>

  <AccessControl
    // authPermissions={authPermissions}
    permission={'payment-create'}
    accessCheck={() => auth && auth.id === created_by_id }
    renderNoAccess={() => (
      <div>
          Only Nuclear engineers from the USA 🇺🇸 can access this system.
      </div>
    )}
  >
 */
