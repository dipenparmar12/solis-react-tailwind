import encode from '../utils/obj/qryString'
import _axios, { StatusCode } from './AxiosService'
import Notify from './NotifyService'

const resources = {
  auth: {
    csrf: async () => _axios.get('/sanctum/csrf-cookie'),
    login: async (d, c) => _axios.post(`/sanctum/login`, d, c),
    logout: async () => _axios.get(`/sanctum/logout`),
    me: async () => _axios.get(`/me`),
  },

  users: {
    get: async ({ qry, config }) => _axios.get(`/users?${encode(qry)}`, config),
    create: async (data, config) => _axios.post(`/users`, data, config),
    update: async ({ id, data, config }) =>
      _axios.put(`/users/${id}`, data, config),
    // getById: async ({ id, qry, config }) => _axios.get(`/users/${id}?${encode(qry)}`, config),
    // delete: async ({ id, config }) => _axios.delete(`/users/${id}`, config),
  },

  projects: {
    get: async ({ qry, config }) =>
      _axios.get(`/projects?${encode(qry)}`, config),
    create: async (data, config) => _axios.post(`/projects`, data, config),
    update: async ({ id, data, config }) =>
      _axios.put(`/projects/${id}`, data, config),
    // getById: async ({ id, qry, config }) => _axios.get(`/projects/${id}?${encode(qry)}`, config),
  },

  funds: {
    get: async ({ qry, config }) => _axios.get(`/funds?${encode(qry)}`, config),
  },

  transactions: {
    get: async ({ qry, config }) =>
      _axios.get(`/transactions?${encode(qry)}`, config),
    create: async (data, config) => _axios.post(`/transactions`, data, config),
    update: async ({ id, data, config }) =>
      _axios.put(`/transactions/${id}`, data, config),
    // getById: async ({ id, qry, config }) => _axios.get(`/transactions/${id}?${encode(qry)}`, config),
  },

  staticData: {
    fetch: async ({ resource, qry, config }) =>
      _axios.get(`/static/${resource}?${encode(qry)}`, config),
  },

  test: {
    get: async ({ qry, config }) => _axios.get(`/test?${encode(qry)}`, config),
    paginate: async ({ qry, config }) =>
      _axios.get(`/test/paginate?${encode(qry)}`, config),
    notFound: async () => _axios.get(`/notfound`),
  },
}

const utils = {
  getRes: (res) => res?.data,
  notifySuccess: (res) => {
    Notify.success(res?.data?.message || res?.message, {
      toastId: `${res?.path}${res?.message}`,
    })
    return res
  },
  // catchError: (error) => {
  //   Notify.error(<div className="">{error?.response?.data?.message}</div>, {
  //     toastId: 'API_ERROR',
  //   })
  // },
}

const Api = {
  ...(resources || {}),
  utils,
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
