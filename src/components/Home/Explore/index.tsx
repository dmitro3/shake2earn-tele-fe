import { Button, Card, Flex } from '@radix-ui/themes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKey } from 'api/queryKey';
import { claimDailyQuest, claimJoinChannel, getQuests } from 'api/quest';

import AppPageContainer from 'components/Common/Page/AppPageContainer';
import { useAppContext } from 'context/app';

import Quest from './Quest';

export default function Explore() {
  const { telegramUserData, onUIChange } = useAppContext();

  // post request to claim daily quest
  const dailyQuestMutation = useMutation(claimDailyQuest, {});

  // post request to claim join channel
  const joinChannelMutation = useMutation(claimJoinChannel, {});

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
    <AppPageContainer py="4">
      <Card
        className="flex flex-col flex-1 bg-whiteA-8"
        variant="classic"
      >
        <Flex
          direction="column"
          flexGrow="1"
        >
          <Quest />
        </Flex>

        <Button
          variant="solid"
          onClick={() => onUIChange('home')}
        >
          Back
        </Button>
      </Card>
    </AppPageContainer>
  );
}
