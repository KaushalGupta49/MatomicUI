"use client";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  thickness?: string;
  length?: string;
}

const Separator = ({
  orientation = "horizontal",
  className = "",
  thickness = "1px",
  length,
}: SeparatorProps) => {
  const isHorizontal = orientation === "horizontal";

  const style = isHorizontal
    ? {
        height: thickness,
        width: length || "100%",
      }
    : {
        width: thickness,
        height: length || "100%",
      };

  return (
    <div
      className={`${className}`}
      style={style}
      role="separator"
    />
  );
};

export default Separator;
