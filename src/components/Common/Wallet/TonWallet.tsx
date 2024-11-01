import { Box, Button } from '@radix-ui/themes';
import { CHAIN, TonConnectButton } from '@tonconnect/ui-react';

import { useTonConnect } from 'hooks/ton/useTonConnect';

export default function TonWallet() {
  const { network } = useTonConnect();

  return (
    <Box className=" w-full flex justify-center">
      <TonConnectButton />
      {/* <Button>
        {!network && 'N/A'}
        {network && (network === CHAIN.MAINNET ? 'mainnet' : 'testnet')}
      </Button> */}
    </Box>
  );
}
