import { CheckCircledIcon, Link2Icon } from '@radix-ui/react-icons';
import {
  Box,
  BoxProps,
  Button,
  Flex,
  Heading,
  Link,
  Separator,
  Text,
} from '@radix-ui/themes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKey } from 'api/queryKey';
import { claimDailyQuest, claimJoinChannel, getQuests } from 'api/quest';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { RewardBadge } from 'components/Common/User/RewardBadge';
import RewardDialog from 'components/Home/Main/ShakeChest/RewardDialog';
import { useAppContext } from 'context/app';
import { ChestRewardData, ChestRewardType } from 'types/chest';
import { UserRewardType } from 'types/user';

type QuestProps = BoxProps;

function FriendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5"></path>
    </svg>
  );
}

export default function Quest({ ...props }: QuestProps) {
  const { telegramUserData, fetchUserData } = useAppContext();
  const [copyText, setCopyText] = useState('Copy');
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [chestReward, setChestReward] = useState<ChestRewardData | null>(null);

  const inviteLink = `t.me/PirateTreasureBot/join?startapp=${telegramUserData?.id}`;

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopyText('Copied!');

    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }
    setTimeout(() => {
      setCopyText('Copy');
      copyTimeoutRef.current = null;
    }, 2000);
  };

  // post request to claim daily quest
  const dailyQuestMutation = useMutation(claimDailyQuest, {
    onSuccess: () => {
      fetchUserData(); // TODO: bring quest to appContext
      setChestReward({
        type: ChestRewardType.TURN,
        value: quests?.dailyClaim.turnsPerClaim ?? 0,
      });
    },
    onError: () => {
      toast.error('Failed to claim daily quest.');
    },
  });

  // post request to claim join channel
  const joinChannelMutation = useMutation(claimJoinChannel, {
    onSuccess: () => {
      fetchUserData();
      toast.success('Join channel quest claimed successfully!');
      setChestReward({
        type: ChestRewardType.TURN,
        value: quests?.joinChannelQuest.turnsPerClaim ?? 0,
      });
    },
    onError: () => {
      toast.error('Failed to claim join channel quest.');
    },
  });

  // get request to get quests information
  const { data: quests, isLoading } = useQuery({
    queryKey: [
      queryKey.getQuests,
      dailyQuestMutation.isSuccess,
      joinChannelMutation.isSuccess,
    ],
    queryFn: () => {
      return getQuests();
    },
  });

  const invitedFriendsCount = quests?.inviteFriend?.invitedFriendsCount ?? 0;

  const onCloseRewardDialog = () => {
    setChestReward(null);
  };

  const renderInvitation = () => {
    return (
      <Flex
        direction="column"
        position="relative"
      >
        <Heading size="4">Referral</Heading>

        <Flex
          gap="3"
          mt="1"
        >
          <Flex
            className="w-full flex-1 overflow-hidden"
            direction="column"
            justify="center"
          >
            <Text
              size="3"
              className="truncate text-indigoA-10"
              weight="medium"
            >
              {inviteLink}
            </Text>
          </Flex>

          <Flex
            className="w-24"
            justify="end"
          >
            <Button
              color="amber"
              variant="surface"
              onClick={copyInviteLink}
              size="3"
            >
              <Link2Icon />
              <Box>{copyText}</Box>
            </Button>
          </Flex>
        </Flex>

        {/* <Flex
          justify="center"
          gap="8"
          py="2"
        >
          <Flex
            direction="column"
            align="center"
            gap="1"
          >
            <Text size="3">Friends</Text>
            <Flex
              align="center"
              gap="1"
            >
              <FriendIcon
                className="text-indigo-9"
                width="24"
                height="24"
              />
              <Text
                className="font-medium"
                size="3"
              >
                {formatNumber(invitedFriendsCount)}
              </Text>
            </Flex>
          </Flex>
        </Flex> */}
      </Flex>
    );
  };

  const renderDailyReward = () => {
    return (
      <Flex direction="column">
        <Heading size="4">Daily tasks</Heading>

        <Flex
          justify="between"
          mt="1"
        >
          <Text
            size="3"
            mt="2"
          >
            Daily rewards
          </Text>
          <Box className="relative">
            {!quests?.dailyClaim.claimed && (
              <span className="absolute flex h-3 w-3 right-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-10 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-10"></span>
              </span>
            )}
            <Button
              color="amber"
              variant="surface"
              onClick={() => dailyQuestMutation.mutate()}
              loading={isLoading || dailyQuestMutation.isLoading}
              disabled={quests?.dailyClaim.claimed}
              size="3"
            >
              {!quests?.dailyClaim.claimed ? (
                <RewardBadge
                  type={UserRewardType.TURN}
                  size="sm"
                  value={quests?.dailyClaim.turnsPerClaim ?? 0}
                />
              ) : (
                <CheckCircledIcon color="green" />
              )}
            </Button>
          </Box>
        </Flex>
      </Flex>
    );
  };

  const renderJoinChannel = () => {
    return (
      <Flex direction="column">
        <Heading size="4">Basic Tasks</Heading>

        <Flex
          justify="between"
          mt="1"
        >
          <Text
            size="3"
            mt="2"
          >
            Join{' '}
            <Link href="https://t.me/pirate_treasure_channel">
              Telegram channel
            </Link>
          </Text>
          <Box className="relative">
            {!quests?.joinChannelQuest.claimed && (
              <span className="absolute flex h-3 w-3 right-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-10 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-10"></span>
              </span>
            )}
            <Button
              color="amber"
              variant="surface"
              disabled={quests?.joinChannelQuest.claimed}
              onClick={() =>
                joinChannelMutation.mutate(telegramUserData?.username ?? '')
              }
              loading={isLoading || joinChannelMutation.isLoading}
              size="3"
            >
              {!quests?.joinChannelQuest.claimed ? (
                <RewardBadge
                  type={UserRewardType.TURN}
                  size="sm"
                  value={quests?.joinChannelQuest.turnsPerClaim ?? 0}
                />
              ) : (
                <CheckCircledIcon color="green" />
              )}
            </Button>
          </Box>
        </Flex>
      </Flex>
    );
  };

  const renderPartnerTasks = () => {
    return (
      <Flex direction="column">
        <Heading size="4">Partner Tasks</Heading>
        <Text size="3" mt="2">
          Coming soon!
        </Text>
      </Flex>
    );
  };  

  return (
    <Box
      className="space-y-4 mt-2"
      {...props}
    >
      <Heading
        size="6"
        align="center"
      >
        Quest
      </Heading>
      {renderInvitation()}
      <Separator
        my="3"
        size="4"
      />
      {renderDailyReward()}
      <Separator
        my="3"
        size="4"
      />
      {renderJoinChannel()}

      <Separator
        my="3"
        size="4"
      />
      {renderPartnerTasks()}

      <RewardDialog
        open={!!chestReward}
        reward={chestReward}
        onClose={onCloseRewardDialog}
      />
    </Box>
  );
}
