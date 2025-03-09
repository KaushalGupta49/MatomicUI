import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const tooltipVariants = cva(
  "absolute z-50 px-3 py-2 text-xs text-white bg-black rounded shadow-lg opacity-0 transition-opacity duration-200",
  {
    variants: {
      position: {
        top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
        left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
        right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      position: "top",
    },
  }
);

const Tooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof tooltipVariants>
>(({ className, position, children, ...props }, ref) => (
  <div
    ref={ref}
    role="tooltip"
    className={clsx(tooltipVariants({ position }), className)}
    {...props}
  >
    {children}
  </div>
));
Tooltip.displayName = "Tooltip";

const TooltipWrapper = ({
  children,
  content,
  position,
  className,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div
      className={clsx("relative inline-block", className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && <Tooltip position={position}>{content}</Tooltip>}
    </div>
  );
};

export { Tooltip, TooltipWrapper };
