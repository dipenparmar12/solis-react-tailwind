/* eslint-disable jsx-a11y/click-events-have-key-events,react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import classNames from 'classnames'
import { Field } from 'formik'
import Api from '@/services/ApiService'
import { useAuth } from '@/context/AuthContext'
import keyBy from '@/utils/collection/groupBy'
import FormikForm from '@/components/molecules/FormicApp/FormFormik'
import deepMerge from '@/utils/obj/deepMerge'
import generateKey from '@/utils/miscellaneous/generateKey'
import Print from '@/components/atoms/Print'
import ButtonFormik from '@/components/molecules/FormicApp/ButtonFormik'
import Button from '@/components/atoms/Button'
import CardV2 from '@/components/atoms/CardV2'
import InputApp from '@/components/molecules/Form/InputApp'
import { useUserContext } from '@/pages/Users/Context'
import InputSelect from '@/components/molecules/Form/InputSelect'
import { useAppContext } from '@/context/AppContext'
import { CardLoading } from '@/components/atoms/LoadingSkeleton'
import SwitchSlide from '@/components/molecules/Form/SwitchSlide'
import useObject from '@/hooks/useObject'

const initialValues = {
  user_id: '',
  permissions: [],
}

function UserPermissions() {
  const auth = useAuth()
  const appContext = useAppContext()
  const { mutationOptions } = useUserContext()
  const [userHasPermissions, setUserHasPermissions] = useState([])
  // const [search, setSearch] = useState('')
  const [filters, SetFilters] = useObject({ search: '', checked: null })

  const [userId, setUserId] = useState(auth?.user?.id)

  React.useEffect(() => {
    if (!appContext?.staticData?.users?.length) {
      appContext.setResources(['users'])
    }
  }, [])

  // API call
  const {
    isLoading,
    data: Permissions,
    refetch,
    isFetching,
    error,
  } = useQuery(
    ['user_permissions', { id: userId }],
    () =>
      Api.users.permissions
        .get({ qry: { user_id: userId } })
        .then((res) => res?.data?.results)
        .then((res) => {
          const userPermissions = []
          res?.forEach((permission) => {
            if (permission?.hsa_access) userPermissions.push(permission.name)
          })
          setUserHasPermissions(userPermissions)
          return res
        })
        .then((results) => keyBy(results, 'group'))
        .then((permissionGroup) => Object.entries(permissionGroup)),
    {
      enabled: true,
    },
  )

  const mutation = useMutation(Api.users.permissions.assign)
  const handleSubmit = async (values, actions, rowValues) => {
    // console.log('AddForm.js::[75] values', values, rowValues)
    mutation.mutate(
      { user_id: userId, data: values },
      mutationOptions(actions, {
        onSuccess: (res) => {
          const userPermissions = res?.results?.permissions?.map(
            (permission) => {
              return permission.name
            },
          )
          setUserHasPermissions(userPermissions)
          SetFilters.merge({ search: '' })
        },
      }),
    )
  }

  function onClick() {
    console.log('Permissions.js::92 onlick')
  }

  return (
    <>
      <FormikForm
        debug={['values']}
        enableReinitialize
        initialValues={deepMerge(initialValues, {
          permissions: userHasPermissions || [],
          user_id: userId,
        })}
        onSubmit={handleSubmit}
      >
        <CardV2>
          <div className="flex flex-col justify-end my-2">
            <InputSelect
              // clearable
              // searchable
              // delay={1500}
              values={''}
              label="User"
              placeholder="Select User"
              options={appContext?.staticData?.users || []}
              selectCallback={(value) => {
                setUserId(value?.id)
                // console.log('Permissions.js::110 value', value)
                // return value?.id || value?.label
              }}
              keepSelectedInList={false}
              delay={1000}
            />

            <InputApp
              delay={500}
              placeholder={'Search PermissionPage'}
              onChange={(e) => SetFilters.merge({ search: e?.target?.value })}
            />

            <div className="pt-3">
              <SwitchSlide
                value={''}
                className={'flex-1'}
                name="wip"
                onChange={(option) => {
                  SetFilters?.merge({ checked: option?.value || option })
                }}
                options={[
                  { value: null, label: 'All' },
                  { value: true, label: 'Checked' },
                  { value: false, label: 'UnChecked' },
                ]}
              />
            </div>

            <div className="flex justify-end my-1 ">
              <Button
                className="px-6 py-1 text-sm my-1 mx-2 "
                variant="subtle"
                type="reset"
              >
                Reset
              </Button>

              <ButtonFormik
                as={Button}
                className="px-6 py-1 text-sm my-1 mx-2 bg-sky-200 "
                variant="subtle"
              >
                Save
              </ButtonFormik>
            </div>
          </div>

          <div className="container mx-auto px-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 gap-x-8">
              {/* loading  */}

              <CardLoading loading={isLoading} count={12} />

              {Permissions?.map(([group, groupItems], index) => {
                // console.log('Permissions.js::43 item', group)
                return (
                  <div
                    key={generateKey(group + index)}
                    // className="cursor-pointer"
                  >
                    <span className="text-xl text-orange-400">
                      {group || '-'}
                    </span>

                    {groupItems?.map((permission) => {
                      return (
                        <Checkbox
                          key={generateKey(group + permission.name)}
                          name="permissions"
                          value={permission.name}
                          displayValue={permission?.display_name}
                          // searchTerm={search}
                          filters={filters}
                          isHiddenChecked={filters.checked}
                          isHidden={
                            filters?.search
                              ? permission?.display_name?.search(
                                  new RegExp(filters?.search, 'i'),
                                ) !== -1
                              : true
                          }
                        />
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>

          {!isLoading && (
            <div className="flex justify-end ">
              <Button
                className="px-6 py-1 text-sm my-2 mx-2 "
                variant="subtle"
                type="reset"
              >
                Reset
              </Button>

              <ButtonFormik
                as={Button}
                className="px-6 py-1 text-sm my-2 mx-2 bg-sky-200"
                variant="subtle"
              >
                Save
              </ButtonFormik>
            </div>
          )}
        </CardV2>
      </FormikForm>
    </>
  )
}

export default UserPermissions

/**
 *
 * @param name {String}
 * @param value
 * @param displayValue
 * @param searchTerm
 * @returns {JSX.Element}
 * @constructor
 * @see https://codesandbox.io/s/formik-checkbox-example-96miz?file=/src/index.js:1067-1440
 */
function Checkbox({ name, value, displayValue, filters }) {
  return (
    <Field name={name}>
      {({ field, form }) => {
        const isChecked = field?.value?.includes(value)

        const isSearchTerm = filters?.search
          ? displayValue?.search(new RegExp(filters?.search, 'i')) !== -1
          : true

        const isRowHidden =
          filters.checked !== null ? filters.checked !== isChecked : false

        return (
          <label
            className={classNames([
              'block text-sm  my-2 shadow px-4 py-3 hover:scale-105 cursor-pointer dark:border dark:border-gray-700 ',
              {
                // 'dark:bg-gray-900': !isChecked,
                'bg-emerald-100 dark:bg-sky-900': isChecked,
                'hidden ': !isSearchTerm || isRowHidden,
              },
            ])}
            // style={{ backgroundColor: 'rgba(175, 247, 211, 0.459)', }}
          >
            <input
              {...field}
              type="checkbox"
              checked={isChecked}
              onChange={() => {
                const set = new Set(field.value)
                if (set.has(value)) {
                  set.delete(value)
                } else {
                  set.add(value)
                }
                form.setFieldValue(name, Array.from(set))
              }}
            />
            <span
              className="px-1 dark:text-gray-400"
              // style={{ color: '#2b335e' }}
            >
              {displayValue || value}
            </span>
          </label>
        )
      }}
    </Field>
  )
}
