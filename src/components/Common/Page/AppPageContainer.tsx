import { FlexProps } from '@radix-ui/themes';

import { AppAssetSrc } from 'context/app/constants';

import PageContainer from './PageContainer';

type AppPageContainerProps = FlexProps & {
  children: React.ReactNode;
};

export default function AppPageContainer({
  style,
  children,
  ...props
}: AppPageContainerProps) {
  return (
    <PageContainer
      style={{
        background: `url(${AppAssetSrc.BG})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        ...style,
      }}
      {...props}
    >
      {children}
    </PageContainer>
  );
}
