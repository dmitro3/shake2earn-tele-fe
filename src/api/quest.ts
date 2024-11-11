import { getWithToken, postWithToken } from 'utils/request';

type Quest = {
  dailyClaim: {
    claimed: boolean;
    timeToNextClaim: number;
    nextClaimAt: string;
    turnsPerClaim: number;
    note: string;
  };
  inviteFriend: {
    invitedFriendsCount: number;
    turnsPerInvite: number;
    note: string;
  };
  joinChannelQuest: {
    claimed: boolean;
    channel: string;
    channelTelegramLink: string;
    turnsPerClaim: number;
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
