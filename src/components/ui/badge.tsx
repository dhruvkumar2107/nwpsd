import * as React from "react";
import clsx from "clsx";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "outline";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-alt text-ink-light",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-danger/15 text-danger",
  outline: "border border-surface-alt text-ink-light",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
