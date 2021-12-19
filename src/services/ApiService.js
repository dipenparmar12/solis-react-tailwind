import qryString from '../utils/obj/qryString'
import axiosApp, { StatusCode } from './AxiosService'

const fetcher = {
  get: async (url, params) => {
    const query = qryString(params)
    const response = await axiosApp.get(`${url}/?${query}`)
    return response
  },
  post: async (url, id, data, config) => {
    const response = await axiosApp.post(`${url}/${id}`, data, config)
    return response
  },
  put: async (url, id, data, config) => {
    const response = await axiosApp.put(`${url}/${id}`, data, config)
    return response
  },
  delete: async (url, id, config) => {
    const response = await axiosApp.delete(`${url}/${id}`, config)
    return response
  },
}

const auth = {
  csrf: async () => axiosApp.get('/sanctum/csrf-cookie'),
  login: async (d, c) => axiosApp.post(`/sanctum/login`, d, c),
  logout: async () => axiosApp.get(`/sanctum/logout`),
  me: async () => axiosApp.get(`/me`),
}

const users = {
  // get: async (qry, c) => fetcher(`/users?${qryString(qry)}`, 'GET'),
  get: async (qry, c) => fetcher.get('/users', qry, c),
  getById: async (id, qry, c) => fetcher.get(`/users/${id}`, qry, c),
  post: async (id, data, c) => fetcher.post(`/users`, id, data, c),
  put: async (id, data, c) => fetcher.put(`/users/${id}`, null, data, c),
  delete: async (id, c) => fetcher.delete(`/users/${id}`, c),
}

const Api = {
  auth,
  users,
}

export { StatusCode }
export default Api

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
