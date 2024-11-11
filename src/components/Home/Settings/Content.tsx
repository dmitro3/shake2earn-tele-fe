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
        gap="2"
      >
        <Flex
          align="center"
          gap="2"
          mb="4"
        >
          <Text
            size="4"
            truncate
            className="truncate mr-1 font-medium"
            align="center"
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
        <Heading size="4">Wallet</Heading>
        <Box mt="2">
          <TonWallet />
        </Box>
      </Flex>
    );
  };

  const renderMore = () => {
    return (
      <Flex direction="column">
        <Heading size="4">About</Heading>
        <Footer mt="2" />
      </Flex>
    );
  };
  return (
    <Flex
      direction="column"
      gap="4"
    >
      <Heading
        size="6"
        align="center"
      >
        Settings
      </Heading>
      {/* {renderUserInfo()} */}
      {renderTonWallet()}
      {renderMore()}
    </Flex>
  );
}
