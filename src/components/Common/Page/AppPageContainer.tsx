import { useAppContext } from 'context/app';

import PageContainer from './PageContainer';

export default function AppPageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { backgroundAssets } = useAppContext();
  const imgSrc = backgroundAssets.imgRef.current?.src ?? '';

  return (
    <PageContainer
      style={{ background: imgSrc ? `url(${imgSrc})` : undefined }}
    >
      {children}
    </PageContainer>
  );
}
