import { motion, useAnimation } from 'framer-motion';
import { useEffect, useMemo } from 'react';

import { getAppAssets } from 'context/app/utils';

import {
  generateRandomDelay,
  generateRandomDuration,
  generateRandomShakeVariants,
} from './utils';

enum TreasureChestStatus {
  OPENED = 'opened',
  CLOSED = 'closed',
}

const TreasureChestSizeMap = {
  [TreasureChestStatus.OPENED]: {},
  [TreasureChestStatus.CLOSED]: { padding: '5%' },
};

const TreasureChestImgSrc = {
  [TreasureChestStatus.OPENED]: getAppAssets('chest-opened'),
  [TreasureChestStatus.CLOSED]: getAppAssets('chest-closed'),
};

interface TreasureChestProps
  extends Partial<Omit<React.ComponentProps<typeof motion.div>, 'children'>> {
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

  const chestStatus = isOpening
    ? TreasureChestStatus.OPENED
    : TreasureChestStatus.CLOSED;

  return (
    <motion.div
      {...props}
      variants={variants}
      animate={controls}
    >
      <img
        src={TreasureChestImgSrc[chestStatus]}
        alt={`{chestStatus closed treasure chest`}
        style={{ ...TreasureChestSizeMap[chestStatus] }}
      />
    </motion.div>
  );
}
