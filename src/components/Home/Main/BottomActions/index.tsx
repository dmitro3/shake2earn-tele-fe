import {
  QuestionMarkCircledIcon,
  SpeakerLoudIcon,
  SpeakerOffIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, FlexProps, IconButton } from '@radix-ui/themes';

import { useAppContext } from 'context/app';

type BottomActionsProps = FlexProps & {
  onOpenTutorials: () => void;
};

export default function BottomActions({
  onOpenTutorials,
  ...props
}: BottomActionsProps) {
  const { onUIChange, isPlayingAudio, changePlayAudio } = useAppContext();

  const renderLeftActions = () => {
    return (
      <Flex
        direction="column"
        justify="end"
        align="center"
        gap="2"
      >
        <IconButton
          onClick={onOpenTutorials}
          size="4"
        >
          <QuestionMarkCircledIcon />
        </IconButton>
        <IconButton
          onClick={() => changePlayAudio(!isPlayingAudio)}
          size="4"
        >
          {isPlayingAudio ? <SpeakerLoudIcon /> : <SpeakerOffIcon />}
        </IconButton>
      </Flex>
    );
  };

  const renderRightActions = () => {
    return (
      <Flex
        direction="column"
        justify="end"
        align="center"
      >
        <Button
          onClick={() => onUIChange('explore')}
          size="4"
        >
          Quest
        </Button>
      </Flex>
    );
  };

  return (
    <Flex
      justify="between"
      py="4"
      {...props}
    >
      {renderLeftActions()}
      {renderRightActions()}
    </Flex>
  );
}
