'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    className?: string;
    track?: string;
    range?: string;
    thumb?: string;
  }
>(({ className, track, range, thumb, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={twMerge(
      clsx(
        'relative flex w-full touch-none select-none items-center cursor-pointer',
        className
      )
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={twMerge(
        clsx(
          'relative h-1.5 w-full grow overflow-hidden rounded-full bg-blue-500/20',
          track
        )
      )}
    >
      <SliderPrimitive.Range
        className={twMerge(
          clsx(
            'absolute h-full bg-blue-500',
            range,
            props.disabled ? 'opacity-0' : 'opacity-100'
          )
        )}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={twMerge(
        clsx(
          'block h-4 w-4 rounded-full border border-blue-500/50 bg-white shadow',
          thumb,
          props.disabled ? 'w-0 h-0' : ''
        )
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
