export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`animate-pulse bg-white/20 ${className}`} {...props} />
  );
}
