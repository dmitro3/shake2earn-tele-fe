import {
  Box,
  BoxProps,
  Button,
  Card,
  Flex,
  Spinner,
  Strong,
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

  const { data: quests, isLoading } = useQuery({
    queryKey: [queryKey.getQuests],
    queryFn: () => {
      return getQuests();
    },
  });

  const dailyQuestMutation = useMutation(claimDailyQuest, {
    onSuccess: () => {
      toast.success('Daily quest claimed successfully!');
    },
    onError: () => {
      toast.error('Failed to claim daily quest.');
    },
  });

  const joinChannelMutation = useMutation(claimJoinChannel, {
    onSuccess: () => {
      toast.success('Join channel quest claimed successfully!');
    },
    onError: () => {
      toast.error('Failed to claim join channel quest.');
    },
  });

  return (
    <Box className="mt-10 space-y-8">
      <Card>
        <Flex
          justify="between"
          align="center"
        >
          <p>Daily checkin</p>
          <Button
            disabled={
              quests?.dailyClaim.claimed || dailyQuestMutation.isLoading
            }
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
          <p>Invited friends</p>
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
          <p>Join Telegram Chanel</p>
          <Button
            disabled={
              quests?.joinChannelQuest.claimed || joinChannelMutation.isLoading
            }
            onClick={() => joinChannelMutation.mutate()}
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
