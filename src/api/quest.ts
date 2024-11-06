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
  const data = await getWithToken('quests/overview', { params: {} }).then(
    (res) => {
      return res.data as Quest;
    },
  );

  return data;
};

export const claimDailyQuest = async () => {
  const data = await postWithToken('quests/claim-daily', { params: {} }).then(
    (res) => {
      return res.data;
    },
  );
  console.log(data);
  return data;

  // setTimeout(() => {
  //   return true;
  // }, 2000);
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
