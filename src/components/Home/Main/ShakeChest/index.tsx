import {
  Badge,
  Button,
  Flex,
  FlexProps,
  Progress,
  Text,
} from '@radix-ui/themes';
import { useCallback, useEffect, useRef, useState } from 'react';

import { AppAssetSrc } from 'context/app/constants';
import useShake from 'hooks/animation/useShake';
import { ChestRewardData, ChestRewardType } from 'types/chest';
import { formatNumber } from 'utils/format/number';
import { formatTime } from 'utils/format/time';

import RewardDialog from './RewardDialog';
import TreasureChest from './TreasureChest';
import { ShakeConfig, chestRewardConfigs } from './constants';
import { getRandomReward } from './utils';

type ShakechestProps = FlexProps & {
  data: {
    point: number;
    turn: number;
  };
  onUpdatePoint: (shakeCount: number) => Promise<boolean>;
  onUpdateTurn: (pointCount: number) => Promise<boolean>;
};

export default function ShakeChest({
  data,
  onUpdatePoint,
  onUpdateTurn,
  ...props
}: ShakechestProps) {
  const [shakeTurnTimeLeft, setShakeTurnTimeLeft] = useState(0);
  const [loadingTurn, setLoadingTurn] = useState(false);

  const [isChestOpened, setIsChestOpened] = useState(false);
  const [chestReward, setChestReward] = useState<ChestRewardData | null>(null);

  const shakingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const turnTimeLeftInterval = useRef<NodeJS.Timeout | null>(null);

  const noTurnLeft = data.turn === 0;
  const isInShakeTurn = shakeTurnTimeLeft > 0;

  // const onCooldownShakeTurn = useCallback(() => {
  //   if (nextTurnTimeLeftInterval.current) {
  //     return;
  //   }

  //   setNextShakeTurnTimeLeft(ShakeConfig.TURN_COOLDOWN_S);

  //   nextTurnTimeLeftInterval.current = setInterval(() => {
  //     setNextShakeTurnTimeLeft((timeLeft) => {
  //       const newTimeLeft = timeLeft - 1;
  //       if (newTimeLeft > 0) {
  //         return newTimeLeft;
  //       }
  //       if (nextTurnTimeLeftInterval.current) {
  //         clearInterval(nextTurnTimeLeftInterval.current);
  //         nextTurnTimeLeftInterval.current = null;
  //       }
  //       return newTimeLeft;
  //     });
  //   }, 1000);
  // }, []);

  const onStartShakeTurn = useCallback(async () => {
    if (turnTimeLeftInterval.current) {
      return;
    }

    setLoadingTurn(true);
    const result = await onUpdateTurn(-1);
    setLoadingTurn(false);
    if (!result) {
      return;
    }

    setShakeTurnTimeLeft(ShakeConfig.TURN_DURATION_S);

    turnTimeLeftInterval.current = setInterval(() => {
      setShakeTurnTimeLeft((timeLeft) => {
        const newTimeLeft = timeLeft - 1;
        if (newTimeLeft > 0) {
          return newTimeLeft;
        }
        if (turnTimeLeftInterval.current) {
          clearInterval(turnTimeLeftInterval.current);
          turnTimeLeftInterval.current = null;
        }
        return newTimeLeft;
      });
    }, 1000);
  }, [onUpdateTurn]);

  // Shake chest
  const onShakedSuccess = useCallback(
    (reward: ChestRewardData) => {
      setChestReward(reward);
      if (reward.type === ChestRewardType.POINT) {
        onUpdatePoint?.(reward.value);
      } else if (reward.type === ChestRewardType.TURN) {
        onUpdateTurn?.(reward.value);
      }
    },
    [onUpdatePoint, onUpdateTurn],
  );

  const onShakingTreasureChest = useCallback(
    ({ shaking }: { shaking: boolean }) => {
      // Opening: skip
      if (isChestOpened) {
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
        // Open chest and vibrate device
        setIsChestOpened(true);
        navigator.vibrate(ShakeConfig.SHOW_REWARD_DELAY_MS);
        // Show reward
        shakingTimeoutRef.current = null;
        setTimeout(() => {
          const reward = getRandomReward(chestRewardConfigs);
          onShakedSuccess(reward);
        }, ShakeConfig.SHOW_REWARD_DELAY_MS);
      }, ShakeConfig.SHAKE_DURATION_MS);
    },
    [isChestOpened, onShakedSuccess],
  );

  const { isShaking, onStartListenShake, onStopListenShake } = useShake({
    onShake: isInShakeTurn ? onShakingTreasureChest : undefined,
    timeout: 500,
  });

  const onCloseRewardDialog = () => {
    setIsChestOpened(false);
    setChestReward(null);
  };

  useEffect(() => {
    onStartListenShake();
    return () => {
      onStopListenShake();
    };
  }, [onStartListenShake, onStopListenShake]);

  useEffect(() => {
    const interval = setInterval(() => {
      const reward = getRandomReward(chestRewardConfigs);
      onShakedSuccess(reward);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [onShakedSuccess]);

  const renderSharkTurnAction = () => {
    if (!isInShakeTurn) {
      const disabledShakeButton = data.turn === 0 || loadingTurn;
      return (
        <Flex
          direction="column"
          align="center"
          gap="2"
        >
          <Button
            size="3"
            color="amber"
            className="font-bold uppercase"
            disabled={disabledShakeButton}
            onClick={onStartShakeTurn}
            loading={loadingTurn}
          >
            Shake
          </Button>

          <Badge
            color="orange"
            className="bg-amber-3"
          >
            <Flex
              align="center"
              gap="1"
            >
              {formatNumber(data.turn)}
              <img
                src={AppAssetSrc.MAP_PAPER}
                className="w-4 h-4"
                alt="treasure map paper"
              />
            </Flex>
          </Badge>

          {/* {isShakeTurnCooldown && (
            <Flex
              mt="2"
              width="100%"
              justify="center"
              className="text-whiteA-12"
            >
              <Text size="4">Next turn:</Text>&nbsp;
              <Text
                size="4"
                weight="bold"
              >
                {formatTime(nextShakeTurnTimeLeft)}
              </Text>
            </Flex>
          )} */}
        </Flex>
      );
    }

    return (
      <Flex
        direction="column"
        align="center"
        width="100%"
        gap="2"
      >
        <Progress
          value={(shakeTurnTimeLeft * 100) / ShakeConfig.TURN_DURATION_S}
          color="amber"
          className="h-3 bg-whiteA-12 w-full mt-1"
        />

        <Flex
          width="100%"
          justify="center"
          className="text-whiteA-12"
        >
          <Text
            size="2"
            weight="bold"
          >
            {formatTime(shakeTurnTimeLeft)}
          </Text>
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex
      direction="column"
      align="center"
      {...props}
    >
      <Flex
        maxWidth="296px"
        maxHeight="220px"
        width="100%"
      >
        <Flex
          position="relative"
          height="0"
          pb="100%"
        >
          <TreasureChest
            disabled={noTurnLeft}
            isShaking={isChestOpened ? false : isShaking}
            isOpening={isChestOpened}
          />
        </Flex>
      </Flex>

      <Flex
        direction="column"
        width="50%"
        height="82px"
        className="relative mt-4"
      >
        {renderSharkTurnAction()}
      </Flex>

      <RewardDialog
        open={!!chestReward}
        reward={chestReward}
        onClose={onCloseRewardDialog}
      />
    </Flex>
  );
}
