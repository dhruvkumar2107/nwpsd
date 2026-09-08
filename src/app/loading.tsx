export default function Loading() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-surface">
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-accent/20" />
          <div className="h-3 w-32 animate-pulse rounded bg-accent/10" style={{ animationDelay: "0.15s" }} />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-accent/50" />
          </div>
          <span className="text-sm font-medium tracking-wide text-ink-muted animate-pulse" style={{ animationDelay: "0.3s" }}>
            Loading
          </span>
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-accent/50" style={{ animationDelay: "0.2s" }} />
          </div>
        </div>

        <div className="mt-4 w-48 space-y-3">
          <div className="h-3 w-full animate-pulse rounded bg-surface-dim" style={{ animationDelay: "0.4s" }} />
          <div className="h-3 w-3/4 animate-pulse rounded bg-surface-dim" style={{ animationDelay: "0.5s" }} />
          <div className="h-3 w-5/6 animate-pulse rounded bg-surface-dim" style={{ animationDelay: "0.6s" }} />
        </div>
      </div>
    </div>
  );
}
