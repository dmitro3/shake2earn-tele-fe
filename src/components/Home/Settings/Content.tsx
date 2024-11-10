import { Avatar, Box, Flex, Heading, Text } from '@radix-ui/themes';

import TonWallet from 'components/Common/Ton/TonWallet';

import Footer from './Footer';

export default function Content({
  avatarUrl,
  username,
}: {
  avatarUrl?: string;
  username: string;
}) {
  const renderUserInfo = () => {
    return (
      <Flex
        direction="column"
        align="center"
        gap="2"
      >
        <Flex
          align="center"
          gap="2"
        >
          <Avatar
            size="4"
            radius="small"
            fallback={username[0]}
            color="amber"
            src={avatarUrl}
          />

          <Text
            size="3"
            truncate
            className="truncate mr-1 font-medium"
          >
            {username}
          </Text>
        </Flex>
      </Flex>
    );
  };

  const renderTonWallet = () => {
    return (
      <Flex direction="column">
        <Heading size="3">Wallet</Heading>
        <Box mt="1">
          <TonWallet />
        </Box>
      </Flex>
    );
  };

  const renderMore = () => {
    return (
      <Flex direction="column">
        <Heading size="3">About</Heading>
        <Footer mt="1" />
      </Flex>
    );
  };
  return (
    <Flex
      direction="column"
      gap="4"
    >
      {renderUserInfo()}
      {renderTonWallet()}
      {renderMore()}
    </Flex>
  );
}
