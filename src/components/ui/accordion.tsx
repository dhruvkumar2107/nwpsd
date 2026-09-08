"use client";

import * as React from "react";
import clsx from "clsx";

interface AccordionContextValue {
  type: "single" | "multiple";
  value: string[];
  toggle: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

interface ItemContextValue {
  value: string;
  open: boolean;
}

const ItemContext = React.createContext<ItemContextValue | null>(null);

function useAccordion() {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion compound components must be used within <Accordion>");
  return ctx;
}

function useAccordionItem() {
  const ctx = React.useContext(ItemContext);
  if (!ctx) throw new Error("AccordionItem, AccordionTrigger, AccordionContent must be used within <AccordionItem>");
  return ctx;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

export function Accordion({
  type = "single",
  defaultValue = [],
  value,
  onValueChange,
  children,
  className,
  ...props
}: AccordionProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const toggle = React.useCallback(
    (itemValue: string) => {
      const update = (prev: string[]) => {
        if (type === "single") {
          return prev.includes(itemValue) ? [] : [itemValue];
        }
        return prev.includes(itemValue)
          ? prev.filter((v) => v !== itemValue)
          : [...prev, itemValue];
      };

      if (isControlled) {
        onValueChange?.(update(currentValue));
      } else {
        setInternalValue((prev) => {
          const next = update(prev);
          onValueChange?.(next);
          return next;
        });
      }
    },
    [type, isControlled, currentValue, onValueChange],
  );

  return (
    <AccordionContext.Provider value={{ type, value: currentValue, toggle }}>
      <div className={clsx("divide-y divide-surface-alt rounded-xl border border-surface-alt", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const { value: openValues } = useAccordion();
  const open = openValues.includes(value);

  return (
    <ItemContext.Provider value={{ value, open }}>
      <div className={clsx("first:rounded-t-xl last:rounded-b-xl", className)} {...props}>
        {children}
      </div>
    </ItemContext.Provider>
  );
}

export function AccordionTrigger({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { toggle } = useAccordion();
  const { value, open } = useAccordionItem();

  return (
    <button
      type="button"
      onClick={() => toggle(value)}
      aria-expanded={open}
      className={clsx(
        "flex w-full items-center justify-between p-4 text-left text-sm font-medium text-ink",
        "hover:bg-surface-alt/50 transition-colors cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={clsx(
          "shrink-0 text-ink-light transition-transform duration-200",
          open && "rotate-180",
        )}
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}

export function AccordionContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useAccordionItem();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children, open]);

  return (
    <div
      role="region"
      className={clsx("overflow-hidden transition-[height] duration-200", className)}
      style={{ height: open ? height : 0 }}
      {...props}
    >
      <div ref={contentRef} className="px-4 pb-4 text-sm text-ink-light">
        {children}
      </div>
    </div>
  );
}
