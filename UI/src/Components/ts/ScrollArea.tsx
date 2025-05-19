'use client';
import { ReactNode, forwardRef } from 'react';

interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal' | 'both';
  maxHeight?: string;
  maxWidth?: string;
  scrollBar?: boolean;
}

const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      children,
      className = '',
      orientation = 'vertical',
      maxHeight = '300px',
      maxWidth = '100%',
      scrollBar = true,
    },
    ref
  ) => {
    const overflowClass = {
      vertical: 'overflow-y-auto overflow-x-hidden',
      horizontal: 'overflow-x-auto overflow-y-hidden',
      both: 'overflow-auto',
    }[orientation];

    return (
      <div
        ref={ref}
        style={{ maxHeight, maxWidth }}
        className={`relative rounded border border-gray-200 ${overflowClass} ${
          scrollBar
            ? 'scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100'
            : ''
        } ${className}`}
      >
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';

export default ScrollArea;
