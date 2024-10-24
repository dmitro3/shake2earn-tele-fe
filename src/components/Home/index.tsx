import { CHAIN } from '@tonconnect/protocol';
import { TonConnectButton } from '@tonconnect/ui-react';
import '@twa-dev/sdk';
import clsx from 'clsx';

import { Invite } from 'components/Invite/Invite';
import { Button, FlexBoxCol } from 'components/styled/styled';
import { useGameContext } from 'context/game';
import { useTonConnect } from 'hooks/ton/useTonConnect';

import TreasureChest from './TreasureChest';

export default function Home() {
  const { network } = useTonConnect();
  const { error, started, onStart, starting, isShaking } = useGameContext();

  if (!started) {
    return (
      <>
        <Button
          onClick={onStart}
          disabled={starting}
        >
          {!starting ? 'Start' : 'Loading...'}
        </Button>
        {error && <p className="text-red-5">{error}</p>}
      </>
    );
  }

  return (
    <>
      <FlexBoxCol>
        <TonConnectButton />
        <Button>
          {!network && 'N/A'}
          {network && (network === CHAIN.MAINNET ? 'mainnet' : 'testnet')}
        </Button>
      </FlexBoxCol>
      <div className={clsx('p2', isShaking ? 'bg-blue-4' : 'bg-gray-4')}>
        {isShaking ? 'shaking' : 'not shaking'}
      </div>
      <FlexBoxCol>
        <TreasureChest isShaking={isShaking} />
      </FlexBoxCol>
      <FlexBoxCol>
        <Invite />
      </FlexBoxCol>
    </>
  );
}
