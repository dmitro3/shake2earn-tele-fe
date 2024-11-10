import { Avatar, Card, Flex, FlexProps, Text } from '@radix-ui/themes';

import { AppAssetSrc } from 'context/app/constants';
import { User } from 'types/telegram';
import { formatNumber } from 'utils/format/number';

// import TonWallet from 'components/Common/Wallet/TonWallet';
// import { Invite } from 'components/Invite/Invite';

type HeaderProps = FlexProps & {
  telegramUser?: User;
  point: number;
};

export default function Header({ telegramUser, point, ...props }: HeaderProps) {
  const renderUserDropdown = () => {
    const userName = telegramUser?.username ?? '-';
    return (
      <Card className="p-1 max-w-36 bg-whiteA-10">
        <Flex
          align="center"
          gap="2"
        >
          <Avatar
            size="1"
            radius="small"
            fallback={userName[0]}
            color="amber"
            src={telegramUser?.photo_url}
          />

          <Text
            size="2"
            truncate
            className="truncate mr-1"
          >
            {userName}
          </Text>
          {/* <TonWallet /> */}
        </Flex>
      </Card>
    );
  };

  const renderPoint = () => {
    return (
      <Flex className="flex-1 max-w-36">
        <Flex
          align="center"
          className="w-full justify-end gap-1"
        >
          <img
            src={AppAssetSrc.COIN}
            alt="chest-turn"
            className="w-6 h-6"
          />
          <Text
            size="2"
            className="text-whiteA-11 truncate"
            weight="bold"
          >
            {formatNumber(point)}
          </Text>
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex
      justify="between"
      py="4"
      {...props}
    >
      {renderUserDropdown()}
      {renderPoint()}
    </Flex>
  );
}
