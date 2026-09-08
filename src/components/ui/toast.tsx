"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

const TOAST_STYLES: Record<ToastType, { bg: string; border: string; icon: React.ReactNode }> = {
  success: {
    bg: "bg-success-muted",
    border: "border-success/20",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  error: {
    bg: "bg-danger-muted",
    border: "border-danger/20",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-danger">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" x2="9" y1="9" y2="15" />
        <line x1="9" x2="15" y1="9" y2="15" />
      </svg>
    ),
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="16" y2="12" />
        <line x1="12" x2="12.01" y1="8" y2="8" />
      </svg>
    ),
  },
};

let toastCount = 0;
let listeners: Array<(toasts: Toast[]) => void> = [];
let toastsState: Toast[] = [];

function notifyListeners() {
  listeners.forEach((l) => l([...toastsState]));
}

function addToast(message: string, type: ToastType) {
  const id = `toast-${++toastCount}`;
  const toast: Toast = { id, message, type };
  toastsState = [...toastsState, toast];
  notifyListeners();

  setTimeout(() => {
    toastsState = toastsState.filter((t) => t.id !== id);
    notifyListeners();
  }, 5000);

  return id;
}

export const toast = {
  success: (message: string) => addToast(message, "success"),
  error: (message: string) => addToast(message, "error"),
  info: (message: string) => addToast(message, "info"),
};

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    toastsState = toastsState.filter((t) => t.id !== id);
    notifyListeners();
  }, []);

  useEffect(() => {
    listeners.push(setToasts);
    return () => {
      listeners = listeners.filter((l) => l !== setToasts);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => {
          const style = TOAST_STYLES[t.type];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border ${style.border} ${style.bg} px-4 py-3.5 shadow-lg backdrop-blur-sm`}
            >
              <span className="mt-0.5 shrink-0">{style.icon}</span>
              <p className="text-sm font-medium text-ink">{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                className="ml-2 shrink-0 rounded-md p-0.5 text-ink-muted transition-colors hover:text-ink"
                aria-label="Dismiss"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" x2="6" y1="6" y2="18" />
                  <line x1="6" x2="18" y1="6" y2="18" />
                </svg>
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
