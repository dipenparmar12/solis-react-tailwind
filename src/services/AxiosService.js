import axios from 'axios'
import Cookies from 'js-cookie'
import config from '../config/config'
import Notify, { appToast } from './NotifyService'
// const config = { apiUrl: 'http://localhost:8000/api' }

export const StatusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  PAGE_EXPIRED: 419,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
}

const baseURL = `${config.REACT_APP_BASE_API || ''}/api`
const axiosApp = axios.create({
  baseURL,
  withCredentials: true, // required to handle the CSRF token
})

//  // Request interceptor
axiosApp.interceptors.request.use((axiosConfig) => {
  if (Cookies.get('token')) {
    // eslint-disable-next-line no-param-reassign
    axiosConfig.headers.Authorization = `Bearer ${Cookies.get('token')}`
  }
  return axiosConfig
})

// // Response interceptor
axiosApp.interceptors.response.use(null, (error) => {
  if (error.response) {
    // console.log('AxiosService.js::[39] error.response', error.response?.data)
    /// TODO::: Logger Service
    console.info(
      'AxiosService.js::[29] error response',
      `[${error.response.status}]`,
      error.response?.data?.message || error.response?.data,
    )

    if (config.REACT_APP_NOTIFY_ERROR) {
      if (error.response?.data?.message) {
        return Notify.error(error.response?.data?.message, {
          position: 'top-center',
          toastId: error.response.status,
        })
      }
      if ([StatusCode.NOT_FOUND].includes(error.response.status)) {
        return Notify.error(
          `${error.response.status} - ${error.response.statusText}`,
          {
            position: 'top-center',
            toastId: error.response.status,
          },
        )
      }
    }
  }

  if (
    error.response &&
    [StatusCode.UNAUTHORIZED, StatusCode.PAGE_EXPIRED].includes(
      error.response.status,
    )
  ) {
    if (Cookies.get('token')) {
      Cookies.remove('token')
      window.localStorage.removeItem('authUser')
    }
  }

  return Promise.reject(error)
})

export default axiosApp
