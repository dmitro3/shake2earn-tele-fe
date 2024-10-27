import { Box, Heading } from '@radix-ui/themes';
import { useCallback, useEffect, useRef, useState } from 'react';

import PageContainer from 'components/Common/PageContainer';
import TonWallet from 'components/Common/Wallet/TonWallet';
import { Invite } from 'components/Invite/Invite';
import useShake from 'hooks/animation/useShake';

import RewardDialog from './Chest/RewardDialog';
import TreasureChest from './TreasureChest';

const SHAKING_DURATION_THRESHOLD = 1500;
const SHOW_REWARD_DURATION = 1000;
const REWARD_POINT = 1;

export default function Main() {
  const [isOpening, setIsOpening] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const [point, setPoint] = useState(0);
  const shakingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onShakingTreasureChest = useCallback(
    ({ shaking }: { shaking: boolean }) => {
      // Opening: skip
      if (isOpening) {
        return;
      }

      // not shakng: reset timeout
      if (!shaking) {
        if (shakingTimeoutRef.current) {
          clearTimeout(shakingTimeoutRef.current);
          shakingTimeoutRef.current = null;
        }
        return;
      }

      // shaking: start timeout
      if (shakingTimeoutRef.current) {
        return;
      }
      shakingTimeoutRef.current = setTimeout(() => {
        setIsOpening(true);
        setTimeout(() => {
          setPoint((prev) => prev + REWARD_POINT);
          setShowReward(true);
        }, SHOW_REWARD_DURATION);
        shakingTimeoutRef.current = null;
      }, SHAKING_DURATION_THRESHOLD);
    },
    [isOpening],
  );

  const { isShaking, onStartListenShake, onStopListenShake } = useShake({
    onShake: onShakingTreasureChest,
    timeout: 250,
  });

  useEffect(() => {
    onStartListenShake();
    return () => {
      onStopListenShake();
    };
  }, [onStartListenShake, onStopListenShake]);

  return (
    <PageContainer>
      <TonWallet />

      <Box>
        <Box className="flex justify-center mt-16">
          <Heading
            as="h1"
            size="8"
            className="text-center text-whiteA-12"
          >
            {point}
          </Heading>
        </Box>

        <Box className="flex justify-center w-full mt-8">
          <TreasureChest
            isShaking={isOpening ? false : isShaking}
            isOpening={isOpening}
            className="p-4 max-w-[512px]"
          />
          <RewardDialog
            open={showReward}
            point={REWARD_POINT}
            onClose={() => {
              setIsOpening(false);
              setShowReward(false);
            }}
          />
        </Box>
      </Box>

      <Invite />
    </PageContainer>
  );
}
