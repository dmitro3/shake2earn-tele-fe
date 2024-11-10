import { Button, Dialog, Flex, Text } from '@radix-ui/themes';
import {
  ChestRewardImgSrc,
  ChestRewardName,
  ChestRewardTextProps,
} from 'const/chest';

import { ChestRewardData } from 'types/chest';
import { formatNumber } from 'utils/format/number';

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
        size="2"
        className="bg-amber-1"
      >
        <Dialog.Title className="text-center">Treasure</Dialog.Title>
        <Dialog.Description mb="2">
          <Flex
            direction="column"
            align="center"
            py="4"
          >
            <img
              src={ChestRewardImgSrc[reward.type]}
              alt={ChestRewardName[reward.type]}
              className="w-24 h-24"
            />
            <Text
              size="6"
              className="font-bold"
              {...ChestRewardTextProps[reward.type]}
            >
              +{formatNumber(reward.value)}
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
