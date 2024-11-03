import { Flex, FlexProps } from '@radix-ui/themes';

type PageContainerProps = FlexProps & {
  children: React.ReactNode;
};

export default function PageContainer({
  children,
  ...props
}: PageContainerProps) {
  return (
    <Flex
      direction="column"
      height="100%"
      px="4"
      {...props}
    >
      {children}
    </Flex>
  );
}
