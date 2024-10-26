import { motion, useAnimation } from 'framer-motion';
import { useEffect, useMemo } from 'react';

import TreasureChestClosed from 'assets/app/chest-closed.png';
import TreasureChestOpened from 'assets/app/chest-opened.png';

import {
  generateRandomDelay,
  generateRandomDuration,
  generateRandomShakeVariants,
} from './utils';

interface TreasureChestProps
  extends Partial<Omit<typeof motion.div, 'children'>> {
  isOpening?: boolean;
  isShaking?: boolean;
}

export default function TreasureChest({
  isOpening,
  isShaking,
  ...props
}: TreasureChestProps) {
  const controls = useAnimation();

  const variants = useMemo(() => {
    return {
      start: () => ({
        rotate: [...generateRandomShakeVariants(1, 0.1), 0],
        x: [...generateRandomShakeVariants(5, 20), 0],
        y: [...generateRandomShakeVariants(5, 10), 0],
        transition: {
          delay: generateRandomDelay(),
          repeat: Infinity,
          duration: generateRandomDuration(),
        },
      }),
      reset: {
        rotate: 0,
        x: 0,
        y: 0,
      },
    };
  }, []);

  useEffect(() => {
    if (isShaking) {
      controls.start('start');
    } else {
      controls.start('reset');
    }
  }, [isShaking, controls]);

  const renderChest = () => {
    if (isOpening) {
      return (
        <img
          src={TreasureChestOpened}
          alt="opened treasure chest"
        />
      );
    }

    return (
      <img
        src={TreasureChestClosed}
        alt="closed treasure chest"
      />
    );
  };

  return (
    <motion.div
      variants={variants}
      animate={controls}
      {...props}
    >
      {renderChest()}
    </motion.div>
  );
}
