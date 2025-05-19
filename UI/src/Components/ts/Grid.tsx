import React, { forwardRef, CSSProperties } from 'react';
import clsx from 'clsx';

type GridProps = {
  columns?: number;
  rows?: number;
  gap?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
};

const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns = 1,
      rows,
      gap = 0,
      align = 'stretch',
      justify = 'start',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const gridStyles: CSSProperties = {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gridTemplateRows: rows ? `repeat(${rows}, minmax(0, 1fr))` : undefined,
      gap: gap ? `${gap}px` : undefined,
      alignItems: align,
      justifyContent: {
        start: 'flex-start',
        end: 'flex-end',
        between: 'space-between',
        around: 'space-around',
        evenly: 'space-evenly',
        center: 'center',
      }[justify],
      ...style,
    };

    return (
      <div ref={ref} className={clsx(className)} style={gridStyles} {...props}>
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export default Grid;
