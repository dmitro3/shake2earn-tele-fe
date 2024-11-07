import {
  Button,
  Flex,
  FlexProps,
  Heading,
  Progress,
  Text,
} from '@radix-ui/themes';
import { useCallback, useEffect, useRef, useState } from 'react';

import useShake from 'hooks/animation/useShake';
import { ChestRewardData, ChestRewardType, UserShakeData } from 'types/chest';
import { formatTime } from 'utils/format/time';

import RewardDialog from './RewardDialog';
import TreasureChest from './TreasureChest';
import { ShakeConfig, chestRewardConfigs } from './constants';
import { getRandomReward } from './utils';

type ShakechestProps = FlexProps & {
  userData: UserShakeData;
  onUpdatePoint?: (point: number) => void;
  onUpdateTurn?: (turn: number) => void;
};

export default function ShakeChest({
  userData,
  onUpdatePoint,
  onUpdateTurn,
  ...props
}: ShakechestProps) {
  const [shakeTurnTimeLeft, setShakeTurnTimeLeft] = useState(0);
  const [nextShakeTurnTimeLeft, setNextShakeTurnTimeLeft] = useState(0);

  const [isChestOpened, setIsChestOpened] = useState(false);
  const [chestReward, setChestReward] = useState<ChestRewardData | null>(null);

  const shakingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const turnTimeLeftInterval = useRef<NodeJS.Timeout | null>(null);
  const nextTurnTimeLeftInterval = useRef<NodeJS.Timeout | null>(null);

  const isInShakeTurn = shakeTurnTimeLeft > 0;
  const isShakeTurnCooldown = nextShakeTurnTimeLeft > 0;
  const isShakeAvailable = isInShakeTurn && !isShakeTurnCooldown;

  const onCooldownShakeTurn = useCallback(() => {
    if (nextTurnTimeLeftInterval.current) {
      return;
    }

    setNextShakeTurnTimeLeft(ShakeConfig.TURN_COOLDOWN_S);

    nextTurnTimeLeftInterval.current = setInterval(() => {
      setNextShakeTurnTimeLeft((timeLeft) => {
        const newTimeLeft = timeLeft - 1;
        if (newTimeLeft > 0) {
          return newTimeLeft;
        }
        if (nextTurnTimeLeftInterval.current) {
          clearInterval(nextTurnTimeLeftInterval.current);
          nextTurnTimeLeftInterval.current = null;
        }
        return newTimeLeft;
      });
    }, 1000);
  }, []);

  const onStartShakeTurn = useCallback(() => {
    if (turnTimeLeftInterval.current) {
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
        onCooldownShakeTurn();
        return newTimeLeft;
      });
    }, 1000);
  }, [onCooldownShakeTurn]);

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
    onShake: isShakeAvailable ? onShakingTreasureChest : undefined,
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

  const renderSharkTurnAction = () => {
    if (!isInShakeTurn) {
      const disabledShakeButton = userData.turn === 0 || isShakeTurnCooldown;
      return (
        <Flex
          direction="column"
          align="center"
        >
          <Button
            size="3"
            className="font-bold uppercase"
            disabled={disabledShakeButton}
            onClick={onStartShakeTurn}
          >
            Shake now
          </Button>

          {isShakeTurnCooldown && (
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
          )}
        </Flex>
      );
    }

    return (
      <Flex
        direction="column"
        width="100%"
      >
        <Progress
          value={(shakeTurnTimeLeft * 100) / ShakeConfig.TURN_DURATION_S}
          color="amber"
          className="h-4 bg-whiteA-12"
        />

        <Flex
          mt="2"
          width="100%"
          justify="center"
          className="text-whiteA-12"
        >
          <Text size="4">Time left:</Text>&nbsp;
          <Text
            size="4"
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
      <Flex justify="center">
        <Heading
          as="h1"
          size="9"
          className="text-center text-whiteA-12"
        >
          {userData.point}
        </Heading>
      </Flex>

      <Flex
        maxWidth="320px"
        maxHeight="320px"
        width="100%"
      >
        <Flex
          position="relative"
          height="0"
          pb="100%"
        >
          <Flex className="absolute w-full h-full" />
          <TreasureChest
            isShaking={isChestOpened ? false : isShaking}
            isOpening={isChestOpened}
          />
        </Flex>
      </Flex>
      <Flex
        direction="column"
        width="50%"
        height="82px"
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
