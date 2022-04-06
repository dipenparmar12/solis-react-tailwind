import React from 'react'
import { isFunction } from '@craco/craco/lib/utils'
import get from '@/utils/obj/get'
import AccessDenied from '@/components/atoms/AccessDenied'
import { usePermissionContext } from '@/context/PermissionContext'

/**
 *
 * @param authPermissionsProp
 * @param permissionsRequired
 * @param renderNoAccess
 * @param accessCheck
 * @param children
 * @param fallback
 * @returns {*|JSX.Element}
 * @constructor
 * @see https://levelup.gitconnected.com/access-control-in-a-react-ui-71f1df60f354
 */
const AccessControl = ({
  authPermissionsProp,
  permissionsRequired,
  renderNoAccess,
  accessCheck,
  children,
  fallback,
}) => {
  const { authPermissions } = usePermissionContext() || {}
  const appPermissions = authPermissionsProp || authPermissions

  let permitted = true
  // when an accessCheck function is provided, ensure that passes as well as the permissions
  if (isFunction(accessCheck)) {
    permitted = accessCheck()
  }

  const hasPermission = permissionsRequired
    ? get(appPermissions, `${permissionsRequired}.hsa_access`)
    : true

  if (permitted && hasPermission) return children

  if (fallback !== undefined) return fallback

  return renderNoAccess ? renderNoAccess() : <AccessDenied />
}

export default React.memo(AccessControl)

/* ------------------------------------
  AccessControl Exapmle
 ------------------------------------

 <AccessControl
    // authPermissions={authPermissions}
    permissionsRequired={'payment-create'}
    accessCheck={() => auth && auth.id === created_by_id }
  >
      I have Access
  </AccessControl>

  <AccessControl
    // authPermissions={authPermissions}
    permissionsRequired={'payment-create'}
    accessCheck={() => auth && auth.id === created_by_id }
    renderNoAccess={() => (
      <div>
          Only Nuclear engineers from the USA 🇺🇸 can access this system.
      </div>
    )}
  >
 */
