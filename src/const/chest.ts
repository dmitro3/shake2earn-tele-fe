import { TextProps } from '@radix-ui/themes';

import { AppAssetSrc } from 'context/app/constants';
import { ChestRewardType } from 'types/chest';

export const ChestRewardName = {
  [ChestRewardType.POINT]: 'Point',
  [ChestRewardType.TURN]: 'Turn',
};

export const ChestRewardImgSrc = {
  [ChestRewardType.POINT]: AppAssetSrc.COIN,
  [ChestRewardType.TURN]: AppAssetSrc.MAP_PAPER,
};

export const ChestRewardTextProps: Record<ChestRewardType, TextProps> = {
  [ChestRewardType.POINT]: { color: 'amber' },
  [ChestRewardType.TURN]: { color: 'indigo' },
};
