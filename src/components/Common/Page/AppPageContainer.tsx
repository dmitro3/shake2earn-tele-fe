import { FlexProps } from '@radix-ui/themes';

import BackgroundImg from 'assets/app/ocean-background.png';

import PageContainer from './PageContainer';

type AppPageContainerProps = FlexProps & {
  children: React.ReactNode;
};

export default function AppPageContainer({
  children,
  ...props
}: AppPageContainerProps) {
  // const imgSrc = backgroundAssets.imgRef.current?.src ?? '';
  const imgSrc = BackgroundImg;

  return (
    <PageContainer
      style={{ background: imgSrc ? `url(${imgSrc})` : undefined }}
      {...props}
    >
      {children}
    </PageContainer>
  );
}
