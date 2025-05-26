import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeWrapperProps {
  children: React.ReactNode;
  content: string | number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  color?: 'default' | 'primary' | 'danger' | 'warning' | 'success';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  hideWhenZero?: boolean;
}

const positionClasses = {
  'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
  'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
  'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
  'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
};

const colorClasses = {
  default: 'bg-gray-500 text-white',
  primary: 'bg-blue-600 text-white',
  danger: 'bg-red-600 text-white',
  warning: 'bg-yellow-500 text-black',
  success: 'bg-green-600 text-white',
};

const sizeClasses = {
  sm: 'text-xs min-w-[16px] h-[16px]',
  md: 'text-sm min-w-[20px] h-[20px]',
  lg: 'text-base min-w-[24px] h-[24px]',
};

export const BadgeWrapper: React.FC<BadgeWrapperProps> = ({
  children,
  content,
  position = 'top-right',
  color = 'primary',
  size = 'sm',
  className = '',
  hideWhenZero = true,
}) => {
  if (hideWhenZero && (content === 0 || content === '0'))
    return <>{children}</>;

  return (
    <div className="relative inline-block">
      {children}
      <span
        className={twMerge(
          clsx(
            'absolute flex items-center justify-center rounded-full px-1 font-bold leading-none',
            positionClasses[position],
            colorClasses[color],
            sizeClasses[size],
            className
          )
        )}
      >
        {content}
      </span>
    </div>
  );
};
