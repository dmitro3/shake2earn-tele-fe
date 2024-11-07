import { Box, Card, Flex, Text } from '@radix-ui/themes';

export default function Footer() {
  return (
    <Box className="mt-10">
      <Flex className="justify-center space-x-4 mt-4">
        <Card className="text-center text-sm">Rules</Card>
        <Card className="text-center text-sm">Support</Card>
        <Card className="text-center text-sm">Terms</Card>
        <Card className="text-center text-sm">Privacy</Card>
      </Flex>
    </Box>
  );
}
