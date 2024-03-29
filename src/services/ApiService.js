/* eslint-disable camelcase */
import encode from '../utils/obj/qryString'
import _axios, { StatusCode } from './AxiosService'
import Notify from './NotifyService'

const resources = {
  auth: {
    csrf: async () => _axios.get('/sanctum/csrf-cookie'),
    login: async (d, c) => _axios.post(`/sanctum/login`, d, c),
    logout: async () => _axios.get(`/sanctum/logout`),
    me: async () => _axios.get(`/me`),

    permissions: {
      get: async ({ qry: { user_id, ...qry } }) =>
        _axios.get(`/users/${user_id}/permissions?${encode(qry)}`),
      create: async (data) => _axios.post(`/permissions`, data),
    },
  },

  users: {
    get: async ({ qry, config }) => _axios.get(`/users?${encode(qry)}`, config),
    create: async (data, config) => _axios.post(`/users`, data, config),
    update: async ({ id, data, config }) =>
      _axios.put(`/users/${id}`, data, config),
    // getById: async ({ id, qry, config }) => _axios.get(`/users/${id}?${encode(qry)}`, config),
    // delete: async ({ id, config }) => _axios.delete(`/users/${id}`, config),

    advances: {
      get: async ({ qry: { user_id, ...qry }, config }) =>
        _axios.get(`/users/${user_id}/advances?${encode(qry)}`, config),
    },

    expenses: {
      get: async ({ qry: { user_id, ...qry }, config }) =>
        _axios.get(`/users/${user_id}/expenses?${encode(qry)}`, config),
    },

    funds: {
      get: async ({ qry: { user_id, ...qry }, config }) =>
        _axios.get(`/users/${user_id}/funds?${encode(qry)}`, config),
    },

    permissions: {
      get: async ({ qry: { user_id, ...qry }, config }) =>
        _axios.get(`/users/${user_id}/permissions?${encode(qry)}`, config),
      assign: async ({ user_id, data }, config = undefined) =>
        _axios.post(`/users/${user_id}/assign_permissions`, data, config),
    },
  },

  projects: {
    get: async ({ qry, config }) =>
      _axios.get(`/projects?${encode(qry)}`, config),
    create: async (data, config) => _axios.post(`/projects`, data, config),
    update: async ({ id, data, config }) =>
      _axios.put(`/projects/${id}`, data, config),
    // getById: async ({ id, qry, config }) => _axios.get(`/projects/${id}?${encode(qry)}`, config),

    expenses: async ({ qry: { id, ...qry } }) =>
      _axios.get(`/projects/${id}/expenses?${encode(qry)}`),

    estimates: async ({ qry: { id, ...qry } }) =>
      _axios.get(`/projects/${id}/estimates?${encode(qry)}`),

    incomes: async ({ qry: { id, ...qry } }) =>
      _axios.get(`/projects/${id}/incomes?${encode(qry)}`),
  },

  funds: {
    get: async ({ qry, config }) => _axios.get(`/funds?${encode(qry)}`, config),
    create: async (data) => _axios.post(`/funds`, data),
  },

  incomes: {
    get: async ({ qry }) => _axios.get(`/incomes?${encode(qry)}`),
    create: async (data) => _axios.post(`/incomes`, data),
  },

  estimates: {
    get: async ({ qry }) => _axios.get(`/estimates?${encode(qry)}`),
    create: async (data) => _axios.post(`/estimates`, data),
  },

  expenses: {
    get: async ({ qry }) => _axios.get(`/expenses?${encode(qry)}`),
    create: async (data) => _axios.post(`/expenses`, data),
    approval: async ({ id, data }) =>
      _axios.post(`/expenses/${id}/approval`, data),
  },

  dealers: {
    get: async ({ qry }) => _axios.get(`/dealers?${encode(qry)}`),

    balance_sheet: async ({ qry: { id, ...qry } }) =>
      _axios.get(`/dealers/${id}/balance_sheet?${encode(qry)}`),
  },

  salaries: {
    get: async ({ qry, config }) =>
      _axios.get(`/salaries?${encode(qry)}`, config),
    create: async (data, config) => _axios.post(`/salaries`, data, config),
  },

  advances: {
    get: async ({ qry, config }) =>
      _axios.get(`/advances?${encode(qry)}`, config),
    create: async (data, config) => _axios.post(`/advances`, data, config),
    update: async ({ id, data, config }) =>
      _axios.put(`/advances/${id}`, data, config),
    advance_summary: async ({ qry, config }) =>
      _axios.get(`/advance_summary?${encode(qry)}`, config),
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
    fileUpload: async (id, data, config) =>
      _axios.post(`/test/file_upload/${id}`, data, config), // headers: { "Content-Type": "multipart/form-data" }
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

  fetchFile: async (id, fileName, action = 'download') => {
    const res = await _axios.get(`/download?id=${id}`, {
      responseType: 'blob', // important
    })
    const fileUrl = window.URL.createObjectURL(new Blob([res?.data]))

    if (action === 'download') {
      const anchor = document.createElement('a')
      anchor.href = fileUrl
      anchor.target = '_blank'
      anchor.download = fileName
      anchor.click()
    } else if (action === 'view') {
      window.open(fileUrl)
    }
  },
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
