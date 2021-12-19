import encode from '../utils/obj/qryString'
import _axios, { StatusCode } from './AxiosService'

const auth = {
  csrf: async () => _axios.get('/sanctum/csrf-cookie'),
  login: async (d, c) => _axios.post(`/sanctum/login`, d, c),
  logout: async () => _axios.get(`/sanctum/logout`),
  me: async () => _axios.get(`/me`),
}

const users = {
  get: async ({ qry, config }) => _axios.get(`/users?${encode(qry)}`, config),
  // getById: async ({ id, qry, config }) => _axios.get(`/users/${id}?${encode(qry)}`, config),
  // post: async (id, data, config) => _axios.post(`/users/${id}`, data, config),
  // put: async ({ id, data, config }) => _axios.put(`/users/${id}`, data, config),
  // delete: async ({ id, config }) => _axios.delete(`/users/${id}`, config),
}

const test = {
  get: async ({ qry, config }) => _axios.get(`/test?${encode(qry)}`, config),
}

const Api = {
  auth,
  users,
  test,
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