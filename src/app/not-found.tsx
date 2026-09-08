import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-surface px-6 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10">
        <p className="font-display text-[8rem] font-bold leading-none tracking-tighter text-accent opacity-90 sm:text-[10rem]">
          404
        </p>

        <div className="mx-auto mb-6 mt-2 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />

        <h1 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-lg text-ink-secondary">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3.5 text-sm font-semibold tracking-wide text-primary shadow-lg shadow-accent/20 transition-all duration-200 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Back to Home
        </Link>

        <p className="mt-8 text-sm text-ink-muted">
          Need help?{" "}
          <Link
            href="/contact"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}
