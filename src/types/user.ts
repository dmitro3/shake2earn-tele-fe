export interface User {
  telegramId: string;
  referBy?: string;
  point: number;
  lastAwardedAt: string;
  shakeCount: number;
  hasClaimedJoinChannelQuest: boolean;
}
