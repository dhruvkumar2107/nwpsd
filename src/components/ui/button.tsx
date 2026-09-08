import * as React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-light active:bg-primary-dark",
  secondary:
    "border border-primary text-primary hover:bg-primary/10 active:bg-primary/20",
  ghost: "text-ink hover:bg-surface-alt active:bg-surface",
  accent: "bg-accent text-white hover:bg-accent-light active:bg-accent-light",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm rounded-md gap-1.5",
  md: "h-10 px-4 text-sm rounded-lg gap-2",
  lg: "h-12 px-6 text-base rounded-lg gap-2.5",
};

function Slot({
  children,
  className,
  ...props
}: React.PropsWithChildren<{ className?: string; [key: string]: unknown }>) {
  const child = React.Children.only(children) as React.ReactElement<{
    className?: string;
  }>;
  return React.cloneElement(child, {
    ...props,
    className: clsx(className, child.props.className),
  } as Record<string, unknown>);
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", asChild = false, className, children, ...props }, ref) => {
    const classes = clsx(
      "inline-flex items-center justify-center font-medium transition-colors",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
      "disabled:opacity-50 disabled:pointer-events-none",
      "cursor-pointer",
      variantStyles[variant],
      sizeStyles[size],
      className,
    );

    if (asChild) {
      return (
        <Slot className={classes} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
