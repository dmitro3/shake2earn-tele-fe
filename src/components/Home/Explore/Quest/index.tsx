import {
  Box,
  BoxProps,
  Button,
  Card,
  Flex,
  Link,
  Spinner,
  Strong,
  Text,
} from '@radix-ui/themes';
import { useMutation, useQuery } from '@tanstack/react-query';
import WebApp from '@twa-dev/sdk';
import { queryKey } from 'api/queryKey';
import { claimDailyQuest, claimJoinChannel, getQuests } from 'api/quest';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type QuestProps = BoxProps;

export default function Quest({ ...props }: QuestProps) {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (WebApp.initDataUnsafe) {
      setUser(WebApp.initDataUnsafe.user);
    }
  }, []);

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

  return (
    <Box className="mt-10 space-y-8">
      <Card>
        <Flex
          justify="between"
          align="center"
        >
          <Text weight="medium">Daily checkin</Text>
          <Button
            disabled={quests?.dailyClaim.claimed}
            onClick={() => dailyQuestMutation.mutate()}
          >
            {isLoading || dailyQuestMutation.isLoading ? (
              <Spinner size="1" />
            ) : (
              'Claim'
            )}
          </Button>
        </Flex>
      </Card>
      <Card>
        <Flex
          justify="between"
          align="center"
        >
          <Text weight="medium">Invited friends</Text>
          <Strong className=" mr-3">
            {isLoading ? (
              <Spinner size="1" />
            ) : (
              quests?.inviteFriend?.invitedFriendsCount
            )}
          </Strong>
        </Flex>
      </Card>
      <Card>
        <Flex
          justify="between"
          align="center"
        >
          <Text weight="medium">
            Join our Telegram channel{' '}
            <Link href="https://t.me/pirate_treasure_channel">here</Link>
          </Text>
          <Button
            disabled={quests?.joinChannelQuest.claimed}
            onClick={() => joinChannelMutation.mutate(user?.username)}
          >
            {isLoading || joinChannelMutation.isLoading ? (
              <Spinner size="1" />
            ) : (
              'Claim'
            )}
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}
