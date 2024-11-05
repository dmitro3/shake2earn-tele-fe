import devConfig from './dev';
import localConfig from './local';
import prodConfig from './prod';

const env = import.meta.env.VITE_APP_ENV;

type Config = typeof localConfig | typeof devConfig | typeof prodConfig;

let config: Config = localConfig;

if (env === 'dev') {
  config = devConfig;
} else if (env === 'prod') {
  config = prodConfig;
}

const spreadConfig = Object.freeze({ env, ...config });
export default spreadConfig;
