import { Flex, FlexProps, Text } from '@radix-ui/themes';
import React from 'react';

import { AppAssetSrc } from 'context/app/constants';
import { formatNumber } from 'utils/format/number';

type CoinBadgeProps = FlexProps & {
  point: number;
  coinProps?: React.ComponentProps<'img'>;
};

export default function CoinBadge({
  point,
  coinProps,
  ...props
}: CoinBadgeProps) {
  return (
    <Flex
      align="center"
      gap="1"
      {...props}
    >
      <img
        src={AppAssetSrc.COIN}
        alt="chest-turn"
        width="16"
        height="16"
        {...coinProps}
      />
      <Text
        size="2"
        className="truncate"
        weight="medium"
      >
        {formatNumber(point)}
      </Text>
    </Flex>
  );
}
