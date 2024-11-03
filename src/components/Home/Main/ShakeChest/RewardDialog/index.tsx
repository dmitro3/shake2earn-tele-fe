import { Box, Button, Dialog, Heading } from '@radix-ui/themes';

import { ChestRewardData, ChestRewardName } from 'types/chest';

interface RewardDialogProps {
  open?: boolean;
  reward?: ChestRewardData | null;
  onClose?: () => void;
}

export default function RewardDialog({
  open,
  reward,
  onClose,
}: RewardDialogProps) {
  if (!reward) {
    return null;
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Content
        maxWidth="450px"
        className="bg-blue-3"
        size="4"
      >
        <Dialog.Title className="text-center">Your reward</Dialog.Title>
        <Dialog.Description
          size="2"
          mb="4"
        >
          <Box className="flex gap-2 py-4 justify-center">
            <Heading size="9">{reward.value}</Heading>
            <Heading size="9">{ChestRewardName[reward.type]}</Heading>
          </Box>
        </Dialog.Description>

        <Dialog.Close
          className="w-full"
          onClick={onClose}
        >
          <Button>Ok</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
