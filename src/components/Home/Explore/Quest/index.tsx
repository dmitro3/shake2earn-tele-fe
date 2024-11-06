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
import { queryKey } from 'api/queryKey';
import { claimDailyQuest, getQuests } from 'api/quest';
import { toast } from 'react-toastify';

type QuestProps = BoxProps;

export default function Quest({ ...props }: QuestProps) {
  const { data: quests, isLoading } = useQuery({
    queryKey: [queryKey.getQuests],
    queryFn: () => {
      return getQuests();
    },
  });

  const mutation = useMutation(claimDailyQuest, {
    onSuccess: () => {
      toast.success('Daily quest claimed successfully!');
    },
    onError: () => {
      toast.error('Failed to claim daily quest.');
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
            disabled={quests?.dailyClaim.claimed || mutation.isLoading}
            onClick={() => mutation.mutate()}
          >
            {isLoading || mutation.isLoading ? <Spinner size="1" /> : 'Claim'}
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
          <Button disabled={quests?.joinChannelQuest.claimed}>
            {isLoading ? <Spinner size="1" /> : 'Claim'}
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}
