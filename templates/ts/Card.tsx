import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative w-full rounded-lg border shadow-md p-4 bg-white",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        outlined: "border border-gray-300",
        shadow: "shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  imageSrc?: string;
  title: string;
  subTitle?: string;
  description?: string;
  icon?: React.ReactNode;
  subIcon?: React.ReactNode;
}

const CardTitle: React.FC<{ icon?: React.ReactNode; title: string }> = ({
  icon,
  title,
}) => (
  <div className="flex items-center gap-2">
    {icon && <span className="text-lg">{icon}</span>}
    <h3 className="text-lg font-bold">{title}</h3>
  </div>
);

const CardSubTitle: React.FC<{
  subIcon?: React.ReactNode;
  subTitle: string;
}> = ({ subIcon, subTitle }) => (
  <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
    {subIcon && <span className="text-base">{subIcon}</span>}
    <h4>{subTitle}</h4>
  </div>
);

const CardDescription: React.FC<{ description: string }> = ({
  description,
}) => <p className="text-gray-700 mt-2 text-sm">{description}</p>;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      imageSrc,
      title,
      subTitle,
      description,
      icon,
      subIcon,
      variant,
      className,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    >
      {imageSrc && <CardImage src={imageSrc} alt={title} />}
      <div className="p-4">
        <CardTitle icon={icon} title={title} />
        {subTitle && <CardSubTitle subIcon={subIcon} subTitle={subTitle} />}
        {description && <CardDescription description={description} />}
      </div>
    </div>
  )
);

Card.displayName = "Card";

export { Card, CardImage, CardTitle, CardSubTitle, CardDescription };
