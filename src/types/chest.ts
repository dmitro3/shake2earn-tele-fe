export enum ChestRewardType {
  POINT = 'POINT',
  TURN = 'TURN',
}

export interface ChestRewardData {
  type: ChestRewardType;
  value: number;
}
