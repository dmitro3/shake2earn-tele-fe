import WebApp from '@twa-dev/sdk';
import { StorageKey } from 'const/storage';

import { AssetConfig, loadAsset } from 'utils/common/assets';
import storage from 'utils/storage';

import { AppAssets } from './constants';

export const getAppAssetSrc = (name: string) => {
  return AppAssets.find((asset) => asset.name === name)?.src ?? '';
};

export const storeTelegramUserId = () => {
  const userIdFromStorage = storage.getJSON(StorageKey.USER_ID);
  const userIdFromTelegramWebApp = WebApp.initDataUnsafe.user?.id;
  const userId = userIdFromTelegramWebApp || userIdFromStorage;

  if (userId) {
    storage.setJSON(StorageKey.USER_ID, userId);
    return true;
  }
  return false;
};

export const loadAppAssets = (assets: AssetConfig[]) =>
  Promise.all(assets.map(loadAsset));
