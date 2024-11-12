import { Flex } from '@radix-ui/themes';
import { StorageKey } from 'const/storage';
import { useEffect, useState } from 'react';

import AppPageContainer from 'components/Common/Page/AppPageContainer';
import { useAppContext } from 'context/app';
import useLocalStorage from 'hooks/common/useLocalStorage';

import BottomActions from './BottomActions';
import TutorialsDialog from './BottomActions/TutorialsDialog';
import Header from './Header';
import ShakeChest from './ShakeChest';

export default function Main() {
  const { userData, updatePoint, updateTurn, telegramUserData, onUIChange } =
    useAppContext();

  const [visitedWalkthrough, setVisitedWalkthrough] = useLocalStorage<boolean>(
    StorageKey.WALKTHROUGH,
    false,
  );
  const [openTutorial, setOpenTutorial] = useState(false);

  const shakeData = {
    point: userData.point,
    turn: userData.shakeCount,
  };

  const onOpenTutorials = () => {
    setOpenTutorial(true);
  };

  useEffect(() => {
    if (!visitedWalkthrough) {
      setOpenTutorial(true);
    }
  }, [visitedWalkthrough]);

  return (
    <AppPageContainer backgroundImgClassName="blur-[1px]">
      <Header
        flexShrink="0"
        telegramUser={telegramUserData}
        point={userData.point}
        onClickUserBadge={() => onUIChange('settings')}
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

      <BottomActions onOpenTutorials={onOpenTutorials} />

      <TutorialsDialog
        open={openTutorial}
        onClose={() => {
          setOpenTutorial(false);
          setVisitedWalkthrough(true);
        }}
      />
    </AppPageContainer>
  );
}
