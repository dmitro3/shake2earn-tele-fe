import { FlexProps } from '@radix-ui/themes';

import { getAppAssetSrc } from 'context/app/utils';

import PageContainer from './PageContainer';

type AppPageContainerProps = FlexProps & {
  children: React.ReactNode;
};

const imgSrc = getAppAssetSrc('background');

export default function AppPageContainer({
  style,
  children,
  ...props
}: AppPageContainerProps) {
  return (
    <PageContainer
      style={{
        background: imgSrc ? `url(${imgSrc})` : undefined,
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
