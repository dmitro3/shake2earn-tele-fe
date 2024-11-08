import devConfig from './dev';
import localConfig from './local';
import prodConfig from './prod';

const env = import.meta.env.MODE;

type Config = typeof localConfig | typeof devConfig | typeof prodConfig;

let config: Config = localConfig;

if (env === 'development') {
  config = devConfig;
} else if (env === 'production') {
  config = prodConfig;
}

const spreadConfig = Object.freeze({ env, ...config });
export default spreadConfig;
