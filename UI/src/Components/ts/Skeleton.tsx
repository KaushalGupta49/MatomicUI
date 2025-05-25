import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(clsx('animate-pulse bg-white/20 w-4 h-2', className))}
      {...props}
    />
  );
}
