import ProdConfig from './config.production';
import StagingConfig from './config.staging';

let BACKEND_API_URL = new Map<string, string>();
let FRONTEND_API_URL = new Map<string, string>();
let FLOURISH_SDK_APP_VERSION = new Map<string, string>();

BACKEND_API_URL.set('staging', StagingConfig.BACKEND_API_URL);
BACKEND_API_URL.set('production', ProdConfig.BACKEND_API_URL);

FRONTEND_API_URL.set('staging', StagingConfig.FRONTEND_API_URL);
FRONTEND_API_URL.set('production', ProdConfig.FRONTEND_API_URL);

FLOURISH_SDK_APP_VERSION.set('staging', StagingConfig.FLOURISH_SDK_APP_VERSION);
FLOURISH_SDK_APP_VERSION.set('production', ProdConfig.FLOURISH_SDK_APP_VERSION);

const Config = {
  BACKEND_API_URL,
  FRONTEND_API_URL,
  FLOURISH_SDK_APP_VERSION,
};

export default Config;
