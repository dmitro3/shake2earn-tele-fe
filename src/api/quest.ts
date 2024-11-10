import { getWithToken, postWithToken } from 'utils/request';

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
  const data = await getWithToken('quests/overview').then((res) => {
    return res.data as Quest;
  });

  return data;
};

export const claimDailyQuest = async () => {
  const data = await postWithToken('quests/claim-daily').then((res) => {
    return res.data;
  });
  return data;
};

export const claimJoinChannel = async (userName: string) => {
  const data = await postWithToken('quests/claim-join-channel', {
    params: {
      channelUsername: userName,
    },
  }).then((res) => {
    return res.data;
  });

  return data;
};
