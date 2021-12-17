import configDev from './config.dev.json'
import configProd from './config.prod.json'

let appEnv = {}

if (process.env.NODE_ENV === 'development') {
  appEnv = configDev
} else if (process.env.NODE_ENV === 'production') {
  appEnv = configProd
}

const config = {
  apiUrl:
    appEnv?.REACT_APP_BASE_API ||
    process.env.REACT_APP_BASE_API ||
    process.env.MIX_REACT_APP_API,
}

export default config
