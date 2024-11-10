import { CheckCircledIcon, Link2Icon } from '@radix-ui/react-icons';
import {
  Box,
  BoxProps,
  Button,
  Flex,
  Heading,
  Link,
  Text,
} from '@radix-ui/themes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKey } from 'api/queryKey';
import { claimDailyQuest, claimJoinChannel, getQuests } from 'api/quest';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { RewardBadge } from 'components/Common/User/RewardBadge';
import { useAppContext } from 'context/app';
import { UserRewardType } from 'types/user';
import { formatNumber } from 'utils/format/number';

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
  const { telegramUserData } = useAppContext();
  const [copyText, setCopyText] = useState('Copy');
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      toast.success('Daily quest claimed successfully!');
    },
    onError: () => {
      toast.error('Failed to claim daily quest.');
    },
  });

  // post request to claim join channel
  const joinChannelMutation = useMutation(claimJoinChannel, {
    onSuccess: () => {
      toast.success('Join channel quest claimed successfully!');
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
  const pointsPerInvite = quests?.inviteFriend?.pointsPerInvite ?? 0;

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

        <Flex
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
          <Flex
            direction="column"
            align="center"
            gap="1"
          >
            <Text size="3">Earned</Text>
            <RewardBadge
              type={UserRewardType.POINT}
              valueProps={{ size: '3' }}
              value={invitedFriendsCount * pointsPerInvite}
            />
          </Flex>
        </Flex>
      </Flex>
    );
  };

  const renderDailyReward = () => {
    return (
      <Flex direction="column">
        <Heading size="4">Daily</Heading>

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
                type={UserRewardType.POINT}
                size="sm"
                value={quests?.dailyClaim.pointsPerClaim ?? 0}
              />
            ) : (
              <CheckCircledIcon color="green" />
            )}
          </Button>
        </Flex>
      </Flex>
    );
  };

  const renderJoinChannel = () => {
    return (
      <Flex direction="column">
        <Heading size="4">Tasks</Heading>

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
                type={UserRewardType.POINT}
                size="sm"
                value={quests?.joinChannelQuest.pointsPerClaim ?? 0}
              />
            ) : (
              <CheckCircledIcon color="green" />
            )}
          </Button>
        </Flex>
      </Flex>
    );
  };

  return (
    <Box
      className="space-y-4"
      {...props}
    >
      {renderInvitation()}
      {renderDailyReward()}
      {renderJoinChannel()}
    </Box>
  );
}
