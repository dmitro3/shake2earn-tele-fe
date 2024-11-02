export enum ChestRewardType {
  POINT = 'POINT',
  TURN = 'TURN',
}

export const ChestRewardName = {
  [ChestRewardType.POINT]: 'Point',
  [ChestRewardType.TURN]: 'Turn',
};

export interface ChestRewardData {
  type: ChestRewardType;
  value: number;
}

export interface UserShakeData {
  turn: number;
  point: number;
}
