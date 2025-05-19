import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        success: 'bg-green-500 text-white hover:bg-green-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        warning: 'bg-yellow-500 text-black hover:bg-yellow-600',
        info: 'bg-teal-500 text-white hover:bg-teal-600',
        light:
          'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100',
        dark: 'bg-gray-800 text-white hover:bg-gray-900',
        link: 'text-blue-500 hover:text-blue-600 hover:underline',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
        ghost: 'text-gray-700 hover:bg-gray-100',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

const Button = forwardRef(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={twMerge(clsx(buttonVariants({ variant, size }), className))}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
