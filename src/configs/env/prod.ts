import baseConfig from './base';

const config = {
  ...baseConfig,
  text: 'prod',
};

export default Object.freeze({ ...baseConfig, ...config });
