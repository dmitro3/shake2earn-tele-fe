import { motion, useAnimation } from 'framer-motion';
import { useEffect, useMemo } from 'react';

import { AppAssetSrc } from 'context/app/constants';

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
  [TreasureChestStatus.OPENED]: AppAssetSrc.CHEST_OPENED,
  [TreasureChestStatus.CLOSED]: AppAssetSrc.CHEST_CLOSED,
};

const getTreasureDisableStyle = (): React.CSSProperties => ({
  filter: 'grayscale(100%) brightness(90%)',
});

interface TreasureChestProps
  extends Partial<Omit<React.ComponentProps<typeof motion.div>, 'children'>> {
  isOpening?: boolean;
  isShaking?: boolean;
  disabled?: boolean;
}

export default function TreasureChest({
  isOpening,
  isShaking,
  disabled,
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
        style={{
          ...TreasureChestSizeMap[chestStatus],
          ...(disabled ? getTreasureDisableStyle() : {}),
        }}
      />
    </motion.div>
  );
}
