import baseConfig from './base';

const config = {
  ...baseConfig,
  text: 'dev',
};

export default Object.freeze({ ...baseConfig, ...config });
