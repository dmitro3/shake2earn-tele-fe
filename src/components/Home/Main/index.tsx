import clsx from 'clsx';
import { useEffect } from 'react';

import PageContainer from 'components/Common/PageContainer';
import TonWallet from 'components/Common/Wallet/TonWallet';
import { Invite } from 'components/Invite/Invite';
import useShake from 'hooks/animation/useShake';

import TreasureChest from './TreasureChest';

export default function Main() {
  const { isShaking, onStartListenShake, onStopListenShake } = useShake();

  useEffect(() => {
    onStartListenShake();

    return () => {
      onStopListenShake();
    };
  }, [onStartListenShake, onStopListenShake]);

  return (
    <PageContainer>
      <TonWallet />
      <div className={clsx('p2', isShaking ? 'bg-blue-4' : 'bg-gray-4')}>
        {isShaking ? 'shaking' : 'not shaking'}
      </div>
      <div>
        <TreasureChest isShaking={isShaking} />
      </div>
      <div>
        <Invite />
      </div>
    </PageContainer>
  );
}
