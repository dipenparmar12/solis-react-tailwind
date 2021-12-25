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
