import { AppAssets } from './constants';

export const getAppAssetSrc = (name: string) => {
  return AppAssets.find((asset) => asset.name === name)?.src ?? '';
};
