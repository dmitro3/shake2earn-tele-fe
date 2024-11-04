import { AppAssets } from './constants';

export const getAppAssets = (name: string) => {
  return AppAssets.find((asset) => asset.name === name)?.src ?? '';
};
