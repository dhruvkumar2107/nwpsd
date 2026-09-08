"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-surface px-6 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-danger/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-danger/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-danger-muted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-danger"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
        </div>

        <h1 className="font-display text-3xl font-bold tracking-tight text-primary">
          Something went wrong
        </h1>

        <p className="mt-3 text-ink-secondary">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>

        {error.digest && (
          <p className="mt-2 font-mono text-xs text-ink-muted">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold tracking-wide text-primary shadow-lg shadow-accent/20 transition-all duration-200 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
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
            >
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold tracking-wide text-ink-secondary transition-all duration-200 hover:border-border-strong hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
