import { Box, Button, Card, Flex, Heading, Progress } from '@radix-ui/themes';
import { useCallback, useEffect, useRef, useState } from 'react';

import PageContainer from 'components/Common/PageContainer';
import TonWallet from 'components/Common/Wallet/TonWallet';
import { Invite } from 'components/Invite/Invite';
import useShake from 'hooks/animation/useShake';

import soundtrackFile from 'assets/music/soundtrack.mp3';

import RewardDialog from './Chest/RewardDialog';
import TreasureChest from './TreasureChest';

const SHAKING_DURATION_THRESHOLD = 1500;
const SHOW_REWARD_DURATION = 1000;
const REWARD_POINT = 1;
const INITIAL_TIME = 180; // 3 minutes

export default function Main() {
  const soundtrackRef = useRef(new Audio(soundtrackFile));
  const [playMusic, setPlayMusic] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const [point, setPoint] = useState(0);
  const shakingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [ticket, setTicket] = useState(3);
  const [timerActive, setTimerActive] = useState(false);

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
    timeout: 500,
  });

  useEffect(() => {
    onStartListenShake();
    return () => {
      onStopListenShake();
    };
  }, [onStartListenShake, onStopListenShake]);

  useEffect(() => {
    const soundtrack = soundtrackRef.current;
    soundtrack.loop = true;
    if (playMusic) {
      soundtrack.play();
    } else {
      soundtrack.pause();
    }
    return () => {
      soundtrack.pause(); // Pause audio on component unmount
    };
  }, [playMusic]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timerActive]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const calculateProgress = () => {
    return (timeLeft / INITIAL_TIME) * 100;
  };

  const resetShake = () => {
    setTicket((prev) => prev - 1);
    setTimeLeft(INITIAL_TIME);
    setTimerActive(true);
  };

  return (
    <PageContainer>
      {/* <TonWallet /> */}
      <Box className="flex justify-between">
        <Heading
          as="h2"
          size="5"
          color="amber"
        >
          Pirate Treasure
        </Heading>
        <Box className="flex flex-col">
          <Heading
            as="h2"
            size="3"
            color="amber"
          >
            Bob
          </Heading>
          <span className=" text-1 text-amber-9">ID: 123456789</span>
        </Box>
      </Box>
      <Box>
        <Box className="flex justify-center mt-10">
          <Heading
            as="h1"
            size="8"
            className="text-center text-whiteA-12"
          >
            {point}
          </Heading>
        </Box>

        <Box className="flex justify-center w-full mt-2">
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

        <Box className="flex justify-center">
          <Flex
            direction="column"
            align="center"
            className="space-y-4"
          >
            <Button
              size="4"
              disabled={ticket === 0}
              onClick={resetShake}
              className=" font-bold"
            >
              SHAKE NOW
            </Button>
            <Progress
              value={calculateProgress()}
              className="w-full"
            />
          </Flex>
        </Box>
      </Box>

      <Box className="flex justify-between items-center mt-8">
        <Box className="flex flex-col justify-between items-center">
          <Card className=" mb-4">{ticket}🎫</Card>
          <Button onClick={() => setPlayMusic((prev) => !prev)}>🎵</Button>
        </Box>
        <Box className="flex">
          <Button>Explore</Button>
        </Box>
      </Box>

      {/* <Box>Testing id: 1</Box> */}
      {/* <Invite /> */}
    </PageContainer>
  );
}
