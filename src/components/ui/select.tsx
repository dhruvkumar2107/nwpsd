import * as React from "react";
import clsx from "clsx";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, className, id, children, ...props }, ref) => {
    const generatedId = React.useId();
  const selectId = id || generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-ink"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            "h-10 w-full rounded-lg border border-surface-alt bg-white px-3 text-sm text-ink",
            "transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
            "hover:border-ink-light/40",
            "cursor-pointer",
            className,
          )}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  },
);

Select.displayName = "Select";
