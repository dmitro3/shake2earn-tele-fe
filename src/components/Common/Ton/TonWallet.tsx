import { Box, Button, Flex, FlexProps } from '@radix-ui/themes';
import { CHAIN, TonConnectButton } from '@tonconnect/ui-react';

import { useTonConnect } from 'hooks/ton/useTonConnect';

type TonWalletProps = FlexProps;

export default function TonWallet(props: FlexProps) {
  const { network } = useTonConnect();

  return (
    <Flex {...props}>
      <TonConnectButton />
      {/* <Button>
        {!network && 'N/A'}
        {network && (network === CHAIN.MAINNET ? 'mainnet' : 'testnet')}
      </Button> */}
    </Flex>
  );
}
