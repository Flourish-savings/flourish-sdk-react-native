import ProdConfig from './config.production';
import StagingConfig from './config.staging';

let BACKEND_API_URL = new Map<string, string>();
let FRONTEND_API_URL = new Map<string, string>();

BACKEND_API_URL.set('staging', StagingConfig.BACKEND_API_URL);
BACKEND_API_URL.set('production', ProdConfig.BACKEND_API_URL);

FRONTEND_API_URL.set('staging', StagingConfig.FRONTEND_API_URL);
FRONTEND_API_URL.set('production', ProdConfig.FRONTEND_API_URL);

const Config = {
  BACKEND_API_URL,
  FRONTEND_API_URL,
};

export default Config;
