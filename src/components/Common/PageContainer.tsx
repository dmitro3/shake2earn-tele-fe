import { Box } from '@radix-ui/themes';
import clsx from 'clsx';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function PageContainer({
  children,
  className,
  style,
  ...props
}: PageContainerProps) {
  return (
    <Box
      className={clsx('p-4 flex flex-col flex-grow', className)}
      style={style}
      {...props}
    >
      {children}
    </Box>
  );
}
