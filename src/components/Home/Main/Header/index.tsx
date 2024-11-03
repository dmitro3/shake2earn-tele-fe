import { Flex, FlexProps, Heading, Text } from '@radix-ui/themes';

// import TonWallet from 'components/Common/Wallet/TonWallet';
// import { Invite } from 'components/Invite/Invite';

type HeaderProps = FlexProps & {
  user: {
    id: string;
    username: string;
  } | null;
};

export default function Header({ user, ...props }: HeaderProps) {
  const renderUserDropdown = () => {
    if (!user) {
      return null;
    }

    return (
      <Flex
        direction="column"
        className="bg-blue-4 rounded-4 max-w-28 w-full"
        style={{ padding: '2px 6px' }}
      >
        <Heading
          as="h2"
          size="2"
          truncate
          className="text-blue-11"
        >
          {user.username}
        </Heading>
        <Text
          truncate
          size="1"
        >
          {user.id}
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
      <Heading
        as="h1"
        size="4"
        className="h-[38px] text-amber-4"
      >
        Pirate Treasure
      </Heading>
      {renderUserDropdown()}
    </Flex>
  );
}
