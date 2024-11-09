import { Flex } from '@radix-ui/themes';
import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';

import AppPageContainer from 'components/Common/Page/AppPageContainer';
import { useAppContext } from 'context/app';

import BottomActions from './BottomActions';
import Header from './Header';
import ShakeChest from './ShakeChest';

export default function Main() {
  const [user, setUser] = useState<any>();
  const { userData, updateShake, updateTurn } = useAppContext();

  const userShakeData = {
    point: userData?.point ?? 0,
    turn: userData?.shakeCount ?? 0,
  };

  useEffect(() => {
    if (WebApp.initDataUnsafe) {
      setUser(WebApp.initDataUnsafe.user);
    }
  }, []);

  return (
    <AppPageContainer>
      <Header
        flexShrink="0"
        user={user}
      />
      <Flex
        direction="column"
        flexGrow="1"
        justify="center"
        height="100%"
      >
        <ShakeChest
          userData={userShakeData}
          onUpdatePoint={updateShake}
          onUpdateTurn={updateTurn}
        />
      </Flex>
      <BottomActions />
    </AppPageContainer>
  );
}
