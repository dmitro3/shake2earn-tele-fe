import { Box, Button, Card, Flex, Heading } from '@radix-ui/themes';

import PageContainer from 'components/Common/PageContainer';

export default function Explore() {
  return (
    <PageContainer>
      <Heading
        as="h2"
        size="6"
      >
        Pirate Chest
      </Heading>
      <Box>
        <Box className="flex justify-center mt-10">
          <Card>
            user_info
            <Button>Copy</Button>
          </Card>
        </Box>
      </Box>

      <Box className="mt-10">
        <Card className=" space-y-4">
          <Flex
            justify="between"
            align="center"
          >
            <p>Daily checkin</p>
            <Button>Claim</Button>
          </Flex>
          <Flex
            justify="between"
            align="center"
          >
            <p>Invite friends</p>
            <Button>Claim</Button>
          </Flex>
        </Card>
      </Box>
    </PageContainer>
  );
}
