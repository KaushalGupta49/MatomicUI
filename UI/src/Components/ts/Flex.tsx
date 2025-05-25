import React, { forwardRef, CSSProperties } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type FlexProps = {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: number;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
};

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = 'row',
      align = 'stretch',
      justify = 'start',
      wrap = 'nowrap',
      gap = 0,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const flexStyles: CSSProperties = {
      display: 'flex',
      flexDirection: direction,
      alignItems: align,
      justifyContent: {
        start: 'flex-start',
        end: 'flex-end',
        between: 'space-between',
        around: 'space-around',
        evenly: 'space-evenly',
        center: 'center',
      }[justify],
      flexWrap: wrap,
      gap: gap ? `${gap}px` : undefined,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={twMerge(clsx(className))}
        style={flexStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = 'Flex';

export default Flex;
