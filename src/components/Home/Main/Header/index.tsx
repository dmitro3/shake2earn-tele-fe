import { Flex, FlexProps, Heading, Text } from '@radix-ui/themes';

import { AppAssetSrc } from 'context/app/constants';
import { User } from 'types/telegram';

// import TonWallet from 'components/Common/Wallet/TonWallet';
// import { Invite } from 'components/Invite/Invite';

type HeaderProps = FlexProps & {
  telegramUser?: User;
  point: number;
};

export default function Header({ telegramUser, point, ...props }: HeaderProps) {
  const renderPoint = () => {
    return (
      <Flex
        align="center"
        className="gap-1"
      >
        <img
          src={AppAssetSrc.COIN}
          alt="chest-turn"
          className="w-6 h-6"
        />
        <Text
          size="4"
          className="text-whiteA-12 font-bold"
        >
          {point}
        </Text>
      </Flex>
    );
  };

  const renderUserDropdown = () => {
    return (
      <Flex
        direction="column"
        className="bg-indigo-11 rounded-4 max-w-28 w-full"
        style={{ padding: '2px 6px' }}
      >
        <Heading
          as="h2"
          size="2"
          truncate
          className="text-whiteA-12"
        >
          {telegramUser?.username ?? '-'}
        </Heading>
        <Text
          truncate
          size="1"
          className="text-whiteA-8"
        >
          {telegramUser?.id ?? '-'}
        </Text>
        {/* <TonWallet /> */}
      </Flex>
    );
  };

  return (
    <Flex
      justify="between"
      py="4"
      {...props}
    >
      {renderPoint()}
      {renderUserDropdown()}
    </Flex>
  );
}
