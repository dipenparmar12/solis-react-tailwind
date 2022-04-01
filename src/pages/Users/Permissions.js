/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React from 'react'
import { useQuery } from 'react-query'
import classNames from 'classnames'
import { FieldArray, useFormikContext } from 'formik'
import Api from '@/services/ApiService'
import { useAuth } from '@/context/AuthContext'
import keyBy from '@/utils/collection/groupBy'
import FormikForm from '@/components/molecules/FormicApp/FormFormik'
import deepMerge from '@/utils/obj/deepMerge'
import omitVal from '@/utils/obj/omitVal'
import { InputFormik } from '@/components/molecules/Form/InputApp'
import generateKey from '@/utils/miscellaneous/generateKey'

const initialValues = {
  user_id: '',
  permissions: [],
}

function UserPermissions() {
  const auth = useAuth()

  // API call
  const {
    isLoading,
    data: Permissions,
    refetch,
    isFetching,
    error,
  } = useQuery(
    ['user_permissions', { id: auth?.user?.id }],
    () =>
      Api.users.permissions
        .get({ qry: { user_id: auth?.user?.id } })
        .then((res) => res?.data?.results)
        .then((results) => keyBy(results, 'group'))
        .then((permissionGroup) => Object.entries(permissionGroup)),
    {
      enabled: true,
    },
  )

  const handleSubmit = async (values, actions, rowValues) => {
    // console.log('AddForm.js::[75] values', values, rowValues)
    console.log('Permissions.js::46 values', values)
  }

  return (
    <>
      <FormikForm
        debug={['values']}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 gap-x-8">
            {Permissions?.map(([group, groupItems], index) => {
              // console.log('Permissions.js::43 item', group)
              return (
                <div key={generateKey(group + index)}>
                  <span className="text-xl text-orange-400">
                    {group || '-'}
                  </span>

                  <InputCheckBox items={groupItems} />

                  {/* <ul> */}
                  {/*  {groupItems?.map((item) => { */}
                  {/*    return ( */}
                  {/*      <li */}
                  {/*        key={generateKey(item)} */}
                  {/*        className={classNames([ */}
                  {/*          'text-sm  my-3 shadow px-4 py-3 hover:scale-105 cursor-pointer text-gray-600 ', */}
                  {/*          { */}
                  {/*            'bg-emerald-100 ': item?.hsa_access, */}
                  {/*          }, */}
                  {/*        ])} */}
                  {/*      > */}
                  {/*        {item?.display_name || ''} */}
                  {/*      </li> */}
                  {/*    ) */}
                  {/*  })} */}
                  {/* </ul> */}
                </div>
              )
            })}
          </div>
        </div>
      </FormikForm>
    </>
  )
}

export default UserPermissions

const InputCheckBox = React.memo(({ items }) => {
  const { setFieldValue, validateForm, ...formikProps } =
    useFormikContext?.() || {}

  return (
    <FieldArray
      name="permissions"
      render={(arrayHelpers) => (
        <div>
          {items?.map((permission) => {
            // console.log('Permissions.js::119 permission', permission)
            const idx = formikProps?.values?.permissions?.indexOf(
              permission.name,
            )

            return (
              <label
                key={permission.value}
                className="block text-sm  my-3 shadow px-4 py-3 hover:scale-105 cursor-pointer text-gray-600"
              >
                <input
                  name="tags"
                  type="checkbox"
                  value={permission?.name}
                  checked={formikProps?.values?.permissions?.includes(
                    permission.name,
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      arrayHelpers.push(permission.name)
                    } else {
                      arrayHelpers.remove(idx)
                    }
                  }}
                />
                <span className="px-1"> {permission?.display_name}</span>
              </label>
            )
          })}
        </div>
      )}
    />
  )
})
