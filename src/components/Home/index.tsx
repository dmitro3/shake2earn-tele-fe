import { CHAIN } from '@tonconnect/protocol';
import { TonConnectButton } from '@tonconnect/ui-react';
import '@twa-dev/sdk';
import clsx from 'clsx';
import { useEffect } from 'react';

import { Invite } from 'components/Invite/Invite';
import { Button, FlexBoxCol } from 'components/styled/styled';
import useShake from 'hooks/animation/useShake';
import { useTonConnect } from 'hooks/ton/useTonConnect';

import TreasureChest from './TreasureChest';

export default function Home() {
  const { network } = useTonConnect();
  const { isDeviceSupport, isShaking, onStartListenShake, onStopListenShake } =
    useShake();

  useEffect(() => {
    onStartListenShake();
    return () => {
      onStopListenShake();
    };
  }, [onStartListenShake, onStopListenShake]);

  return (
    <>
      <FlexBoxCol>
        <TonConnectButton />
        <Button>
          {!network && 'N/A'}
          {network && (network === CHAIN.MAINNET ? 'mainnet' : 'testnet')}
        </Button>
      </FlexBoxCol>
      {!isDeviceSupport && (
        <div className="p2 bg-red-4">Your device not support shaking</div>
      )}
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
