import { AssetConfig, loadAsset } from 'utils/common/assets';

import { AppAssets } from './constants';

export const getAppAssetSrc = (name: string) => {
  return AppAssets.find((asset) => asset.name === name)?.src ?? '';
};

export const loadAppAssets = (assets: AssetConfig[]) =>
  Promise.all(assets.map(loadAsset));
