"use client";

import * as React from "react";
import clsx from "clsx";

interface ModalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = React.createContext<ModalContextValue | null>(null);

function useModal() {
  const ctx = React.useContext(ModalContext);
  if (!ctx) throw new Error("Modal compound components must be used within <Modal>");
  return ctx;
}

export function Modal({
  children,
  defaultOpen = false,
  onOpenChange,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  const handleOpenChange = React.useCallback(
    (value: boolean) => {
      setOpen(value);
      onOpenChange?.(value);
    },
    [onOpenChange],
  );

  return (
    <ModalContext.Provider value={{ open, setOpen: handleOpenChange }}>
      {children}
    </ModalContext.Provider>
  );
}

export function ModalTrigger({
  children,
  asChild = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { setOpen } = useModal();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      onClick: (e: React.MouseEvent) => {
        setOpen(true);
        const childOnClick = (children.props as { onClick?: React.MouseEventHandler }).onClick;
        childOnClick?.(e);
      },
    });
  }

  return (
    <button onClick={() => setOpen(true)} {...props}>
      {children}
    </button>
  );
}

export function ModalContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = useModal();
  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === overlayRef.current) setOpen(false);
      }}
      role="dialog"
      aria-modal="true"
      {...props}
    >
      <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm" />
      <div
        className={clsx(
          "relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl",
          "mx-4 animate-in fade-in zoom-in-95",
          className,
        )}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-md p-1 text-ink-light hover:text-ink transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("mb-4 pr-8", className)} {...props}>
      {children}
    </div>
  );
}

export function ModalTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={clsx("text-lg font-semibold text-ink", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export function ModalDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={clsx("text-sm text-ink-light mt-1", className)} {...props}>
      {children}
    </p>
  );
}

export function ModalFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx("mt-6 flex items-center justify-end gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}
