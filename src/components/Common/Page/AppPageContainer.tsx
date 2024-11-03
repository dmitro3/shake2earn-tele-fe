import BackgroundImg from 'assets/app/ocean-background.png';

import PageContainer from './PageContainer';

export default function AppPageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  // const imgSrc = backgroundAssets.imgRef.current?.src ?? '';
  const imgSrc = BackgroundImg;

  return (
    <PageContainer
      style={{ background: imgSrc ? `url(${imgSrc})` : undefined }}
    >
      {children}
    </PageContainer>
  );
}
