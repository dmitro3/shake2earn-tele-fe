import { Box, Button, Card, Flex, Heading } from '@radix-ui/themes';

// import PageContainer from 'components/Common/Page/PageContainer';
import AppPageContainer from 'components/Common/Page/AppPageContainer';
import { useAppContext } from 'context/app';

import Quest from './Quest';

export default function Explore() {
  const { onUIChange } = useAppContext();

  return (
    <AppPageContainer>
      <Heading
        as="h2"
        size="6"
        color="amber"
      >
        Pirate Treasure
      </Heading>
      <Button onClick={() => onUIChange('home')}>Back</Button>
      <Box className="text-left">
        <Box className="flex justify-center mt-10">
          <Card className=" flex space-x-4">
            <Box className="flex flex-col">
              <Heading
                as="h2"
                size="3"
              >
                Bob
              </Heading>
              <span className=" text-1">ID: 123456789</span>
            </Box>
            <Button>Copy</Button>
          </Card>
        </Box>
      </Box>

      <Quest />
    </AppPageContainer>
  );
}
