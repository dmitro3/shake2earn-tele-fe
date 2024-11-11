import { Flex, FlexProps, Text, TextProps } from '@radix-ui/themes';
import clsx from 'clsx';

import { AppAssetSrc } from 'context/app/constants';
import { UserRewardType } from 'types/user';
import { formatNumber } from 'utils/format/number';

type UserRewardBadgeSize = 'sm' | 'md' | 'lg';

type RewardBadgeProps = FlexProps & {
  type: UserRewardType;
  value: number;
  size?: UserRewardBadgeSize;
  iconImgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  valueProps?: TextProps;
};

const UserRewardImgSrc: Record<UserRewardType, string> = {
  [UserRewardType.POINT]: AppAssetSrc.COIN,
  [UserRewardType.TURN]: AppAssetSrc.MAP_PAPER,
};

const UserRewardContainerClassNameBySize: Record<UserRewardBadgeSize, string> =
  {
    sm: 'gap-1',
    md: 'gap-1',
    lg: 'gap-2',
  };

const UserRewardImgClassNameBySize: Record<UserRewardBadgeSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};
const UserRewardValuePropsBySize: Record<
  UserRewardBadgeSize,
  Omit<TextProps, 'children' | 'as'>
> = {
  sm: {},
  md: {},
  lg: { size: '3' },
};

export function RewardBadge({
  type,
  value,
  size = 'md',
  iconImgProps,
  valueProps,
  className,
  ...props
}: RewardBadgeProps) {
  return (
    <Flex
      align="center"
      className={clsx(UserRewardContainerClassNameBySize[size], className)}
      {...props}
    >
      <img
        src={UserRewardImgSrc[type]}
        {...iconImgProps}
        className={clsx(
          UserRewardImgClassNameBySize[size],
          iconImgProps?.className,
        )}
      />
      <Text
        size="2"
        {...valueProps}
        {...UserRewardValuePropsBySize[size]}
        className={clsx(valueProps?.className)}
      >
        {formatNumber(value)}
      </Text>
    </Flex>
  );
}
