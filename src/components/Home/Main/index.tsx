import { Flex } from '@radix-ui/themes';

import AppPageContainer from 'components/Common/Page/AppPageContainer';
import { useAppContext } from 'context/app';

import BottomActions from './BottomActions';
import Header from './Header';
import ShakeChest from './ShakeChest';

export default function Main() {
  const { userData, updatePoint, updateTurn, telegramUserData } =
    useAppContext();

  const shakeData = {
    point: userData.point,
    turn: userData.shakeCount,
  };

  return (
    <AppPageContainer>
      <Header
        flexShrink="0"
        telegramUser={telegramUserData}
        point={userData.point}
      />

      <Flex
        direction="column"
        flexGrow="1"
        justify="center"
        height="100%"
      >
        <ShakeChest
          data={shakeData}
          onUpdatePoint={updatePoint}
          onUpdateTurn={updateTurn}
        />
      </Flex>

      <BottomActions />
    </AppPageContainer>
  );
}
