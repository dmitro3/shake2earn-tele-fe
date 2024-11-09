import { Button, Flex, FlexProps } from '@radix-ui/themes';

import { useAppContext } from 'context/app';

import BackgroundSound from './BackgroundSound';

type BottomActionsProps = FlexProps;

export default function BottomActions({ ...props }: BottomActionsProps) {
  const { onUIChange } = useAppContext();

  const renderLeftActions = () => {
    return (
      <Flex
        direction="column"
        justify="between"
        align="center"
      >
        <BackgroundSound />
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
