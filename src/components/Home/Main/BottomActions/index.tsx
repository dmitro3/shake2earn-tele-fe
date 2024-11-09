import { SpeakerLoudIcon, SpeakerOffIcon } from '@radix-ui/react-icons';
import { Button, Flex, FlexProps, IconButton } from '@radix-ui/themes';

import { useAppContext } from 'context/app';

type BottomActionsProps = FlexProps;

export default function BottomActions({ ...props }: BottomActionsProps) {
  const { onUIChange, isPlayingAudio, changePlayAudio } = useAppContext();

  const renderLeftActions = () => {
    return (
      <Flex
        direction="column"
        justify="between"
        align="center"
      >
        <IconButton onClick={() => changePlayAudio(!isPlayingAudio)}>
          {isPlayingAudio ? <SpeakerLoudIcon /> : <SpeakerOffIcon />}
        </IconButton>
      </Flex>
    );
  };

  const renderRightActions = () => {
    return (
      <Flex
        direction="column"
        justify="between"
        align="center"
      >
        {/* TODO: explorer + invite */}
        <Button
          onClick={() => onUIChange('explore')}
          size="2"
        >
          Explore
        </Button>
        {/* <Invite /> */}
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
