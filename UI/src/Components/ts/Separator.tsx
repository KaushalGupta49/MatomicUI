'use client';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  thickness?: string;
  length?: string;
}

const Separator = ({
  orientation = 'horizontal',
  className = '',
  thickness = '1px',
  length,
}: SeparatorProps) => {
  const isHorizontal = orientation === 'horizontal';

  const style = isHorizontal
    ? {
        width: length || '100%',
        height: thickness,
      }
    : {
        width: thickness,
        height: length || '100%',
      };

  return (
    <div className={twMerge(clsx(className))} style={style} role="separator" />
  );
};

export default Separator;
