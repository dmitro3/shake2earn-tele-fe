import { FlexProps } from '@radix-ui/themes';

import { getAppAssets } from 'context/app/utils';

import PageContainer from './PageContainer';

type AppPageContainerProps = FlexProps & {
  children: React.ReactNode;
};

const imgSrc = getAppAssets('background');

export default function AppPageContainer({
  children,
  ...props
}: AppPageContainerProps) {
  return (
    <PageContainer
      style={{ background: imgSrc ? `url(${imgSrc})` : undefined }}
      {...props}
    >
      {children}
    </PageContainer>
  );
}
