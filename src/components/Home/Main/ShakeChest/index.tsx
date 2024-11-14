import {
  Badge,
  Button,
  Flex,
  FlexProps,
  Progress,
  Text,
} from '@radix-ui/themes';
import { useCallback, useEffect, useRef, useState } from 'react';

import { RewardBadge } from 'components/Common/User/RewardBadge';
import { useAppContext } from 'context/app';
import useShake from 'hooks/animation/useShake';
import { ChestRewardData, ChestRewardType } from 'types/chest';
import { UserRewardType } from 'types/user';
import { vibrate } from 'utils/device/vibrate';

import RewardDialog from './RewardDialog';
import TreasureChest from './TreasureChest';
import { SHOW_REWARD_DELAY_MS, chestRewardConfigs } from './constants';
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
  const { chestConfig } = useAppContext();

  const [shakeTurnTimeLeft, setShakeTurnTimeLeft] = useState(0);
  const [loadingTurn, setLoadingTurn] = useState(false);
  const [debugShakeEvent, setDebugShakeEvent] = useState<any>(null);

  const [isChestOpened, setIsChestOpened] = useState(false);
  const [chestReward, setChestReward] = useState<ChestRewardData | null>(null);

  const shakingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const showRewardTimeout = useRef<NodeJS.Timeout | null>(null);
  const turnTimeLeftInterval = useRef<NodeJS.Timeout | null>(null);

  const noTurnLeft = data.turn === 0;
  const isInShakeTurn = shakeTurnTimeLeft > 0;
  const shakeNotAvailable = noTurnLeft && !isInShakeTurn;

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

    setShakeTurnTimeLeft(chestConfig.shakeTime);

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
  }, [chestConfig.shakeTime, onUpdateTurn]);

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
      if (showRewardTimeout.current) {
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
        vibrate(SHOW_REWARD_DELAY_MS);
        // Show reward
        shakingTimeoutRef.current = null;
        showRewardTimeout.current = setTimeout(() => {
          const reward = getRandomReward(chestRewardConfigs);
          onShakedSuccess(reward);
          showRewardTimeout.current = null;
        }, SHOW_REWARD_DELAY_MS);
      }, chestConfig.shakeThreshold * 1000);
    },
    [chestConfig.shakeThreshold, onShakedSuccess],
  );

  const { isShaking, onStartListenShake, onStopListenShake } = useShake({
    onShake: isInShakeTurn ? onShakingTreasureChest : undefined,
    timeout: 600,
    onDebugShakeListener: setDebugShakeEvent,
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
      const disabledShakeButton = shakeNotAvailable || loadingTurn;
      return (
        <Flex
          direction="column"
          align="center"
        >
          <Button
            mt="1"
            size="4"
            color="amber"
            className="font-bold uppercase"
            disabled={disabledShakeButton}
            onClick={onStartShakeTurn}
            loading={loadingTurn}
          >
            Play
          </Button>

          <Badge
            color="orange"
            className="bg-amber-3"
            mt="1"
          >
            <RewardBadge
              type={UserRewardType.TURN}
              value={data.turn}
            />
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
          value={(shakeTurnTimeLeft * 100) / chestConfig.shakeTime}
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
            {shakeTurnTimeLeft}s
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
      {/* <Flex
        className="bg-whiteA-12"
        direction="column"
        gap="1"
      >
        <Text size="1">{`Shaking timeout${shakingTimeoutRef.current}`}</Text>
        <Text size="1">{`Show reward timeout${showRewardTimeout.current}`}</Text>
        <Text size="1">{`Opening: ${isChestOpened}`}</Text>
        <Text size="1">{`Reward: ${JSON.stringify(chestReward)}`}</Text>
        {debugShakeEvent?.acceleration ? (
          <Flex>
            <Text
              size="1"
              color={
                Math.abs(debugShakeEvent.acceleration.x) >= 8
                  ? 'amber'
                  : undefined
              }
            >{`X: ${debugShakeEvent.acceleration.x.toFixed(2)}`}</Text>
            <Text
              size="1"
              color={
                Math.abs(debugShakeEvent.acceleration.y) >= 8
                  ? 'amber'
                  : undefined
              }
            >{`Y: ${debugShakeEvent.acceleration.y.toFixed(2)}`}</Text>
            <Text
              size="1"
              color={
                Math.abs(debugShakeEvent.acceleration.z) >= 8
                  ? 'amber'
                  : undefined
              }
            >{`Z: ${debugShakeEvent.acceleration.z.toFixed(2)}`}</Text>
          </Flex>
        ) : (
          <Text size="1">No event</Text>
        )}
      </Flex> */}
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
            disabled={shakeNotAvailable}
            isShaking={isChestOpened ? false : isShaking}
            isOpening={isChestOpened}
          />
        </Flex>
      </Flex>

      <Flex
        direction="column"
        width="50%"
        height="82px"
        className="relative mt-6"
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
