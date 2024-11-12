import { Box, Flex, FlexProps } from '@radix-ui/themes';

import { AppAssetSrc } from 'context/app/constants';

import PageContainer from './PageContainer';

type AppPageContainerProps = FlexProps & {
  backgroundImgSrc?: string;
  children: React.ReactNode;
};

export default function AppPageContainer({
  backgroundImgSrc,
  children,
  ...props
}: AppPageContainerProps) {
  return (
    <Box
      position="relative"
      overflow="hidden"
      height="100%"
    >
      <Flex
        position="absolute"
        inset="0"
      >
        <img
          src={backgroundImgSrc ?? AppAssetSrc.BG}
          alt="background"
          className="object-cover text-center h-full w-full brightness-75"
        />
      </Flex>
      <PageContainer
        className="relative h-full"
        {...props}
      >
        {children}
      </PageContainer>
    </Box>
  );
}

// <PageContainer
// style={{
//   background: `url(${AppAssetSrc.BG})`,
//   backgroundRepeat: 'no-repeat',
//   backgroundPosition: 'center',
//   backgroundSize: 'cover',
//   ...style,
// }}
// {...props}
// >
// {children}
// </PageContainer>
