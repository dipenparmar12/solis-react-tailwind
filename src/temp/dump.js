/* eslint-disable */
const axios = {}
const store = {}

export const authClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true, // required to handle the CSRF token
})

/*
 * Add a response interceptor
 */
authClient.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    if (
      error.response &&
      [401, 419].includes(error.response.status) &&
      store.getters['auth/authUser'] &&
      !store.getters['auth/guest']
    ) {
      store.dispatch('auth/logout')
    }
    return Promise.reject(error)
  },
)

export default {
  async login(payload) {
    await authClient.get('/sanctum/csrf-cookie')
    return authClient.post('/login', payload)
  },
  logout() {
    return authClient.post('/logout')
  },
  async forgotPassword(payload) {
    await authClient.get('/sanctum/csrf-cookie')
    return authClient.post('/forgot-password', payload)
  },
  getAuthUser() {
    return authClient.get('/api/users/auth')
  },
  async resetPassword(payload) {
    await authClient.get('/sanctum/csrf-cookie')
    return authClient.post('/reset-password', payload)
  },
  updatePassword(payload) {
    return authClient.put('/user/password', payload)
  },
  async registerUser(payload) {
    await authClient.get('/sanctum/csrf-cookie')
    return authClient.post('/register', payload)
  },
  sendVerification(payload) {
    return authClient.post('/email/verification-notification', payload)
  },
  updateUser(payload) {
    return authClient.put('/user/profile-information', payload)
  },
}

// // const isCalling = new Map()
// // export default function useFetcher(url) {
// //   const [data, setData] = useState('')

// //   useEffect(() => {
// //     let isThisAPICalling = isCalling.get(url)
// //     if (!isThisAPICalling) {
// //       console.log('new')
// //       isThisAPICalling = fetch(url).then((response) => response.json())
// //       isCalling.set(url, isThisAPICalling)
// //       // The body can only be parsed once.
// //     }
// //     isThisAPICalling.then((json) => {
// //       console.log('done')
// //       console.log(json.title)
// //       isCalling.set(url, null)
// //       setData(json.title)
// //     })

// //     return () => {
// //       isCalling.set(url, null)
// //     }
// //   }, [url])
// //   return {}
// // }

// //   const [data, setData] = React.useState({})
// //   const [loading, setLoading] = React.useState(false)
// //   const [error, setError] = React.useState(false)

// //   React.useEffect((_) => {
// //     console.log('useFetcher.js::[12]')
// //     const cancelSource = axios.CancelToken.source()
// //     const config = { cancelToken: cancelSource.token }
// //     setData({})
// //     setLoading(true)
// //     apiCall({ qry, config })
// //       .then((res) => res?.data?.data || res?.data || res)
// //       .then((res) => setData(res))
// //       .catch((err) => setError(err))
// //       .finally(() => setLoading(false))

// //     return () => {
// //       cancelSource?.cancel()
// //     }
// //   }, [])

// //   return { data, loading, error, setData }
// // }

// // export default function useFetcher({ api, invoke }) {
// //   const [data, setData] = useState(null)
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState(false)
// //   const [errorMessage, setErrorMessage] = useState(null)

// //   const cancelSource = axios.CancelToken.source()
// //   const refMounted = React.useRef(false)

// //   const fetch = ({ qry, config }) => {
// //     setLoading(true)
// //     setError(null)
// //     setErrorMessage(null)
// //     const _config = { cancelToken: cancelSource.token, ...config }
// //     if (refMounted.current) {
// //       api({ qry, config: _config })
// //         .then((res) => res?.data?.data || res?.data || res)
// //         .then((res) => setData(res))
// //         .catch((err) => {
// //           setError(true)
// //           setErrorMessage(err?.message)
// //         })
// //         .finally(() => setLoading(false))
// //     }
// //   }

// //   React.useEffect(() => {
// //     refMounted.current = true
// //     return () => {
// //       refMounted.current = false
// //       cancelSource?.cancel()
// //     }
// //   }, [api])

// //   return {
// //     data,
// //     loading,
// //     error,
// //     errorMessage,
// //     fetch,
// //   }
// // }

// // const resCbDefault = (res) => res?.data || res

// // export default function useFetcher(api, resCb) {
// //   const [data, setData] = React.useState()
// //   const [loading, setLoading] = React.useState()
// //   const [error, setError] = React.useState()
// //   const [cancelToken, setCancelToken] = React.useState()

// //   const fetch = React.useCallback(
// //     ({ ...args }) => {
// //       setLoading(true)
// //       return api({ ...args })
// //         .then(resCb || resCbDefault)
// //         .then((res) => setData(res))
// //         .catch((err) => setError(err))
// //         .finally(() => setLoading(false))
// //     },
// //     [api, resCb],
// //   )

// //   React.useEffect(() => {
// //     const cancelSource = axios.CancelToken.source()
// //     setCancelToken(cancelSource)
// //     return () => {
// //       cancelToken?.cancel()
// //     }
// //   }, [])

// //   return { data, fetch, error, loading }
// // }

// /**

//   const trigger = (_config) => {
//     api({ qry, id, data: postData, c: _config })
//       .then(resCb)
//       .then((res) => setData(res))
//       .catch((err) => setError(err))
//       .finally(() => setLoading(false))
//   }

//   React.useEffect(() => {
//     console.log('useFetcher.js::[20] fetcher...')
//     const cancelSource = axios.CancelToken.source()
//     const _config = { ...config, cancelToken: cancelSource.token }

//     return () => {
//       cancelSource?.cancel()
//     }
//   }, [api, id, qry, postData, config])

//   return { data, loading, error, trigger }
//  */

// <span className="px-2 py-1 rounded cursor-pointer bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-gray-200">
//   {currentPage || spinnerOrNull}
//   <input
//     type="text"
//     className="w-10 px-1 font-semibold border border-gray-300 rounded dark:bg-transparent dark:border-gray-500"
//     value={currentPage || '-'}
//   />
// </span>

/*!
 * Check if an item is a plain object or not
 * @param  {obj}  obj  The item to check
 * @return {Boolean}  Returns true if the item is a plain object
 * @example isPlainObject({}) // true
 * @example isPlainObject(null) // false
 * @example isPlainObject(new Date()) // false
 * @example isPlainObject(new String('foo')) // false
 * @example isPlainObject(new Number(1)) // false
 * @example isPlainObject(new Boolean(true)) // false
 * @example isPlainObject(new Array()) // false
 * @example isPlainObject(new Array(1, 2, 3)) // false
 * @example isPlainObject(new Function('return true;')) // false
 * @example isPlainObject(new RegExp('/')) // false
 * @example isPlainObject(new Error('foo')) // false
 * @example isPlainObject(new Error()) // false
 * @example isPlainObject(new Map()) // false
 * @example isPlainObject(new Set()) // false
 * @example isPlainObject(new WeakMap()) // false
 * @example isPlainObject(new WeakSet()) // false
 * @example isPlainObject(new Promise(() => {})) // false
 * @example isPlainObject(new Proxy({}, {})) // false
 * @example isPlainObject(new ArrayBuffer(8)) // false
 * @example isPlainObject(new DataView(new ArrayBuffer(8))) // false
 * @example isPlainObject(new Int8Array(8)) // false
 * @example isPlainObject(new Uint8Array(8)) // false
 * @example isPlainObject(new Uint8ClampedArray(8)) // false
 * @example isPlainObject(new Int16Array(8)) // false
 * @example isPlainObject(new Uint16Array(8)) // false
 * @example isPlainObject(new Int32Array(8)) // false
 * @example isPlainObject(new Uint32Array(8)) // false
 * @example isPlainObject(new Float32Array(8)) // false
 * @example isPlainObject(new Float64Array(8)) // false
 * @example isPlainObject(new BigInt64Array(8)) // false
 */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// import React from 'react'
// import classNames from 'classnames'
// import Button from '@/components/atoms/Button'
// import ModalV1 from '@/components/molecules/Modal/ModalV1'
// import InputV1 from '@/components/molecules/Form/InputV1'
// import FormikForm from '@/components/molecules/FormicApp/FormFormik'
// import get from '@/utils/obj/get'

function AddUser() {
  return (
    <>
      <div className="px-3 py-4 rounded shadow-md">
        <div>
          <FormikForm
            initialValues={{
              name: '',
              email: '',
              password: '',
              passwordConfirm: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true)
              console.log(values)
              setSubmitting(false)
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 ">
                  <InputV1
                    name="name"
                    label="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={get(touched, 'name') && get(errors, 'name')}
                    type="text"
                  />
                  <InputV1
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={get(touched, 'email') && get(errors, 'email')}
                    type="text"
                  />
                  <InputV1
                    name="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={get(touched, 'password') && get(errors, 'password')}
                    type="password"
                  />
                  <InputV1
                    name="passwordConfirm"
                    label="Confirm Password"
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      get(touched, 'passwordConfirm') &&
                      get(errors, 'passwordConfirm')
                    }
                    type="password"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    className={classNames(
                      'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
                      {
                        'opacity-50 cursor-not-allowed': isSubmitting,
                      },
                    )}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Create User
                  </Button>
                </div>
              </>
            )}
          </FormikForm>
        </div>
      </div>
    </>
  )
}

/*
 <ModalV1
    renderButton={(modal) => (
      <Button onClick={modal.open} label={'Create User'} size="md" />
    )}
    renderContent={(modal) => (
      <>
        <div className="w-48 px-5 py-10 bg-white rounded">Hello word</div>
      </>
    )}
  />
*/
