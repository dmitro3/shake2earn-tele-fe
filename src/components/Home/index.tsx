import { CHAIN } from '@tonconnect/protocol';
import { TonConnectButton } from '@tonconnect/ui-react';
import '@twa-dev/sdk';

import { Invite } from 'components/Invite/Invite';
import { Button, FlexBoxCol } from 'components/styled/styled';
import { useTonConnect } from 'hooks/ton/useTonConnect';

export default function Home() {
  const { network } = useTonConnect();

  return (
    <>
      <FlexBoxCol>
        <TonConnectButton />
        <Button>
          {!network && 'N/A'}
          {network && (network === CHAIN.MAINNET ? 'mainnet' : 'testnet')}
        </Button>
      </FlexBoxCol>
      <FlexBoxCol>
        <Invite />
      </FlexBoxCol>
    </>
  );
}
