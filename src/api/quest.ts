import { getWithToken } from 'utils/request';

type Quest = {
  dailyClaim: {
    claimed: boolean;
    timeToNextClaim: number;
    nextClaimAt: string;
    pointsPerClaim: number;
    note: string;
  };
  inviteFriend: {
    invitedFriendsCount: number;
    pointsPerInvite: number;
    note: string;
  };
  joinChannelQuest: {
    claimed: boolean;
    channel: string;
    channelTelegramLink: string;
    pointsPerClaim: number;
    note: string;
  };
};

export const getQuests = async () => {
  const data = await getWithToken('quests/overview', { params: {} }).then(
    (res) => {
      return res.data as Quest;
    },
  );

  return data;
};
