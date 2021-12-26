import DevConfig from './config.dev.json'
import ProdConfig from './config.prod.json'
// import StagingConfig from './config.staging.json'

let appEnv = {}

if (process.env.NODE_ENV === 'development') {
  appEnv = DevConfig
} else if (process.env.NODE_ENV === 'production') {
  appEnv = ProdConfig || DevConfig
}

// else if (process.env.NODE_ENV === 'staging') {
//   appEnv = StagingConfig || DevConfig
// }

const config = {
  ...appEnv,
  ...(process.env || {}),
}

console.info('AxiosService.js::[6] config', config)
export default config
