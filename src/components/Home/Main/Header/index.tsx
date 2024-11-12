import { Button, Card, Flex, FlexProps, Text } from '@radix-ui/themes';

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
          onClick={onClickUserBadge}
        >
          <Flex
            align="center"
            gap="2"
            py="1"
            px="2"
          >
            <Text
              size="3"
              truncate
              className="truncate mr-1"
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
      <Flex
        className="flex-1 max-w-24"
        justify="start"
      >
        <RewardBadge
          type={UserRewardType.POINT}
          value={point}
          className="text-whiteA-12"
          valueProps={{ weight: 'medium', truncate: false }}
          size="lg"
        />
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
