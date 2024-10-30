import baseConfig from './base';

const config = {
  ...baseConfig,
  text: 'local',
};

export default Object.freeze({ ...baseConfig, ...config });
