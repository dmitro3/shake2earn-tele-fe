import { Box, Button, Card, Flex, Heading } from '@radix-ui/themes';

import PageContainer from 'components/Common/PageContainer';

export default function Explore() {
  return (
    <PageContainer>
      <Heading
        as="h2"
        size="6"
        color="amber"
      >
        Pirate Treasure
      </Heading>
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

      <Box className="mt-10 space-y-8">
        <Card>
          <Flex
            justify="between"
            align="center"
          >
            <p>Daily checkin</p>
            <Button>Claim</Button>
          </Flex>
        </Card>
        <Card>
          <Flex
            justify="between"
            align="center"
          >
            <p>Invite friends</p>
            <Button disabled>Claim</Button>
          </Flex>
        </Card>
        <Card>
          <Flex
            justify="between"
            align="center"
          >
            <p>Join Telegram Chanel</p>
            <Button disabled>Claim</Button>
          </Flex>
        </Card>
      </Box>
    </PageContainer>
  );
}
