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
  SHAKE_DURATION_MS: 2500,
  TURN_DURATION_S: 180000,
  SHOW_REWARD_DELAY_MS: 1250,
  TURN_COOLDOWN_S: 0,
};
