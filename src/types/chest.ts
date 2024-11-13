export enum ChestRewardType {
  POINT = 'POINT',
  TURN = 'TURN',
}

export interface ChestConfig {
  shakeTime: number; // s
  shakeThreshold: number; // s
  shakeMax: number;
}

export interface ChestRewardData {
  type: ChestRewardType;
  value: number;
}
