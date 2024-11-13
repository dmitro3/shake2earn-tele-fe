import { ChestConfig } from 'types/chest';
import { User } from 'types/user';
import { AssetConfig, loadAsset } from 'utils/common/assets';

export const loadAppAssets = (assets: AssetConfig[]) =>
  Promise.all(assets.map(loadAsset));

export const getDefaultUserData = (): User => ({
  telegramId: '0',
  lastAwardedAt: 'string',
  hasClaimedJoinChannelQuest: false,
  point: 0,
  shakeCount: 0,
});

export const getDefaultChestConfig = (): ChestConfig => ({
  shakeTime: 30,
  shakeThreshold: 1.5,
  shakeMax: 20,
});
