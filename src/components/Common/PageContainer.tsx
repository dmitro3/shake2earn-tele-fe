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
    <div
      className={clsx('px-4', 'flex flex-col flex-grow', className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
