import { Button, Dialog, Flex, Text } from '@radix-ui/themes';
import styled, { keyframes } from 'styled-components';

import { AppAssetSrc } from 'context/app/constants';

function PhoneShakeAnimation(props: React.ComponentPropsWithoutRef<'img'>) {
  return (
    <StyledPhoneImg
      src={AppAssetSrc.PHONE}
      className="shake-animation"
      {...props}
    />
  );
}

interface TutorialsDialogProps {
  open?: boolean;
  onClose: () => void;
}

export default function TutorialsDialog({
  open,
  onClose,
}: TutorialsDialogProps) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Content
        size="2"
        className="bg-amber-1"
      >
        <Dialog.Title className="text-center">How to play</Dialog.Title>
        <Dialog.Description mb="2">
          <Flex
            direction="column"
            align="center"
            py="4"
            gap="4"
          >
            <PhoneShakeAnimation width="64px" />

            <Text
              align="center"
              size="2"
              className="px-4"
            >
              Shake your phone within the duration to get the treasure.
            </Text>
          </Flex>
        </Dialog.Description>

        <Dialog.Close
          className="w-full"
          onClick={onClose}
        >
          <Button color="amber">Ok</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}

const shakeAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    transform-origin: bottom right;
  }
  12.5% {
    transform: rotate(4deg);
    transform-origin: bottom right;
  }
  25% {
    transform: rotate(0deg);
    transform-origin: bottom right;
  }
  37.5% {
    transform: rotate(-4deg);
    transform-origin: bottom right;
  }
  50% {
    transform: rotate(0deg);
    transform-origin: bottom right;
  }
  62.5% {
    transform: rotate(4deg);
    transform-origin: bottom right;
  }
  75% {
    transform: rotate(0deg);
    transform-origin: bottom right;
  }
  87.5% {
    transform: rotate(-4deg);
    transform-origin: bottom right;
  }
  1-0% {
    transform: rotate(0deg);
    transform-origin: bottom right;
  }
`;

const StyledPhoneImg = styled.img`
  animation: ${shakeAnimation} 2s infinite;
`;
