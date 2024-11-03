import { Box, BoxProps, Button, Card, Flex } from '@radix-ui/themes';

type QuestProps = BoxProps;

export default function Quest({ ...props }: QuestProps) {
  return (
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
  );
}
