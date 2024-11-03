import { ChestRewardType } from 'types/chest';

import { RewardConfig } from './utils';

export const chestRewardConfigs: RewardConfig<ChestRewardType, number>[] = [
  {
    type: ChestRewardType.POINT,
    probability: 4,
    getValue: () => 1 + Math.floor(Math.random() * 5),
  },
  {
    type: ChestRewardType.TURN,
    probability: 1,
    value: 1,
  },
];

export const ShakeConfig = {
  SHAKE_DURATION: 1500,
  TURN_DURATION: 10,
  SHOW_REWARD_DELAY: 1500,
};
