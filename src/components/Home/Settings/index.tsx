import { Cross2Icon } from '@radix-ui/react-icons';
import { Button, Card, Flex } from '@radix-ui/themes';

import AppPageContainer from 'components/Common/Page/AppPageContainer';
import { useAppContext } from 'context/app';

import Content from './Content';

export default function Settings() {
  const { telegramUserData, onUIChange } = useAppContext();

  return (
    <AppPageContainer py="4">
      <Card
        className="flex flex-col flex-1 bg-whiteA-8"
        variant="classic"
      >
        <Flex
          direction="column"
          flexGrow="1"
          position="relative"
        >
          <Button
            className="absolute top-0 right-1 p-4"
            color="gray"
            variant="ghost"
            onClick={() => onUIChange('home')}
          >
            <Cross2Icon />
          </Button>
          <Content
            username={telegramUserData?.username ?? '-'}
            avatarUrl={telegramUserData?.photo_url}
          />
        </Flex>

        <Button
          variant="solid"
          size="4"
          onClick={() => onUIChange('home')}
        >
          Back
        </Button>
      </Card>
    </AppPageContainer>
  );
}
