import { Box, Button, Card, Flex, FlexProps, Text } from '@radix-ui/themes';

import { RewardBadge } from 'components/Common/User/RewardBadge';
import { User } from 'types/telegram';
import { UserRewardType } from 'types/user';

type HeaderProps = FlexProps & {
  telegramUser?: User;
  point: number;
  onClickUserBadge?: () => void;
};

export default function Header({
  onClickUserBadge,
  telegramUser,
  point,
  ...props
}: HeaderProps) {
  const renderUserDropdown = () => {
    const userName = telegramUser?.username ?? '-';
    return (
      <Card className="p-1 max-w-36 bg-whiteA-10">
        <Button
          variant="ghost"
          color="gray"
          className="truncate w-full"
          onClick={onClickUserBadge}
        >
          <Flex
            py="1"
            px="2"
            className="w-full"
          >
            <Text
              size="3"
              className="mr-1 truncate"
              weight="medium"
            >
              {userName}
            </Text>
          </Flex>
        </Button>
      </Card>
    );
  };

  const renderPoint = () => {
    return (
      <Card className="p-1 bg-whiteA-10">
        <Flex
          justify="start"
          px="2"
        >
          <RewardBadge
            type={UserRewardType.POINT}
            value={point}
            valueProps={{ weight: 'medium', truncate: false }}
            size="lg"
          />
        </Flex>
      </Card>
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
