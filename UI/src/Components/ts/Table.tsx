import React from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Table Wrapper
export const Table: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({
  children,
  ...props
}) => (
  <div className="w-full overflow-auto border rounded-lg">
    <table className="min-w-full border-collapse text-sm text-left" {...props}>
      {children}
    </table>
  </div>
);

// Table Head
export const TableHead: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ children, ...props }) => (
  <thead className="bg-gray-100 text-gray-700" {...props}>
    {children}
  </thead>
);

// Table Body
export const TableBody: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ children, ...props }) => (
  <tbody className="divide-y divide-gray-200" {...props}>
    {children}
  </tbody>
);

// Table Row
export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  ...props
}) => (
  <tr className="hover:bg-gray-50" {...props}>
    {children}
  </tr>
);

// Table Cell
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  as?: 'td' | 'th';
}

export const TableCell: React.FC<TableCellProps> = ({
  as = 'td',
  className,
  children,
  ...props
}) => {
  const Component = as;
  return (
    <Component
      className={twMerge(
        clsx(
          'px-4 py-2',
          as === 'th' ? 'font-semibold' : 'text-gray-700',
          className
        )
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
