import axios from 'axios'
import Cookies from 'js-cookie'
import config from '../config/config'
import qryString from '../utils/obj/qryString'

const baseURL = `${config.apiUrl}/api`
const axiosApp = axios.create({
  baseURL,
  withCredentials: true, // required to handle the CSRF token
})

//  // Add a request interceptor
axiosApp.interceptors.request.use(function (axiosConfig) {
  if (Cookies.get('token')) {
    // eslint-disable-next-line no-param-reassign
    axiosConfig.headers.Authorization = `Bearer ${Cookies.get('token')}`
  }
  return axiosConfig
})

const auth = {
  csrf: async () => axiosApp.get('/sanctum/csrf-cookie'),
  login: async (d, c) => axiosApp.post(`/sanctum/login`, d, c),
  logout: async () => axiosApp.get(`/sanctum/logout`),
  me: async () => axiosApp.get(`/me`),
}

const Api = {
  auth,
  axiosApp,
}

export default Api

/*
 * Add a response interceptor
 */
// axiosApp.interceptors.response.use(
//   (response) => response,
//   function (error) {
//     if (error.response && [401, 419].includes(error.response.status)) {
//       console.log('ApiService.js::[31] ', error?.response)
//     }
//     return Promise.reject(error)
//   },
// )

/* 
========================================================
  example
========================================================   
/// API Call
 httpApi.users.get({ limit: 5, order_by: '-createdAt' })
  .then((res) => res?.data?.data || res?.data || res)
  .then((res) => { return res })
  .catch((error) => console.log(error))  
/// Multiple API Call
Promise.all([
  httpApi.users.get({ is_admin: false, limit: 5 }),
  httpApi.projects.get({ status: 'ACTIVE', limit: 10 }),
])
  .then((data) => data?.map((res) => res?.data?.data || res?.data || res))
  .then(([resUsers, resProjects]) => {})
  .catch((error) => console.log(error))  
*/

/* 
========================================================
  Fetch HOOK
======================================================== 
*/
// React.useEffect(
//   (_) => {
//     const qry = { ...filters }
//     const cancelSource = axios.CancelToken.source()
//     const config = { cancelToken: cancelSource.token }
//     setLoading(true)
//     httpApi.users.get(qry, config)
//       .then((res) => res?.data?.data || res?.data || res)
//       .then((res) => setData(res))
//       .catch((error) => setError(error))
//       .finally(() => setLoading(false))
//     return () => {
//       cancelSource?.cancel()
//       setLoading(false)
//     }
//   },
//   [apiCall, qry, filters],
// )

/* 
========================================================
  SET BASE URL DIRECTLY USING QUERY PARAMETER
======================================================== 
 axios.all([
    axios.get(`1`),
    axios.get(`2`),
  ])       
*/
