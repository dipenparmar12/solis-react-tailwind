/* eslint-disable prettier/prettier */
import { toast } from 'react-toastify'

/**
 * @src https://fkhadra.github.io/react-toastify/introduction/
 * @param options
 */
const NotifyManager = (options) => {
  // console.warn('notificationService.js::9 Notify:::', options)
  const notifyOptions = {
    type: 'info', // info, success, warning, error, default, dark
    position: 'bottom-center',
    delay: 7,
    message: 'Solis',
    autoClose: 7000,
    theme: document.querySelector("[class='dark']") ? 'dark' : 'light',
    toastId: undefined,
    ...options,
  }
  toast(notifyOptions.message, notifyOptions)
}

const Notify = {
  ...toast,
  success: (message, args) =>
    NotifyManager({ type: 'success', message, ...args }),
  error: (message, args) => NotifyManager({ type: 'error', message, ...args }),
  info: (message, args) => NotifyManager({ type: 'info', message, ...args }),
  warn: (message, args) => NotifyManager({ type: 'warning', message, ...args }),
}

export default Notify
export const appToast = toast
