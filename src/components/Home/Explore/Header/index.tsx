import { Button, Flex, FlexProps, Heading, Text } from '@radix-ui/themes';

import { useAppContext } from 'context/app';

// import TonWallet from 'components/Common/Wallet/TonWallet';
// import { Invite } from 'components/Invite/Invite';

export default function Header() {
  const { onUIChange } = useAppContext();
  return (
    <Flex
      justify="between"
      py="4"
    >
      <Heading
        as="h1"
        size="4"
        className="h-[38px] text-amber-4"
      >
        Pirate Treasure
      </Heading>
      <Button onClick={() => onUIChange('home')}>Back</Button>
    </Flex>
  );
}
