"use client";
import React, { ReactNode } from "react";

interface ProgressBarProps {
  className?: string;
  children?: ReactNode;
}

interface ProgressProps {
  progress: number;
  className?: string;
}

interface ProgressIndicatorProps {
  progress: number;
  className?: string;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className = "", children }: ProgressBarProps, ref) => {
    return (
      <div className={`relative ${className}`} ref={ref}>
        {children}
      </div>
    );
  }
);

export const Progress = ({ progress, className = "" }: ProgressProps) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-4 ${className}`}>
      <div
        className="bg-blue-600 h-full rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export const ProgressIndicator = ({
  progress,
  className = "",
}: ProgressIndicatorProps) => {
  return (
    <div
      className={`absolute top-0 left-0 text-black text-sm font-medium flex items-center justify-center w-full h-full ${className}`}
    >
      {progress}%
    </div>
  );
};

ProgressBar.displayName = "ProgressBar";
Progress.displayName = "Progress";
ProgressIndicator.displayName = "ProgressIndicator";
