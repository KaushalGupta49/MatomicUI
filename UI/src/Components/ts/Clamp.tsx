import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type ClampTextProps = {
  minSize: number;
  maxSize: number;
  scale?: number;
  className?: string;
  children: React.ReactNode;
};

const ClampText = ({
  minSize,
  maxSize,
  scale = 2,
  children,
  className = '',
}: ClampTextProps) => {
  const fontSize = `clamp(${minSize}px, ${scale}vw, ${maxSize}px)`;

  return (
    <p className={twMerge(clsx(className))} style={{ fontSize }}>
      {children}
    </p>
  );
};

export default ClampText;
