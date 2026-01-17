export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-12 space-y-4">
        <div className="h-6 w-32 animate-pulse rounded bg-surface"></div>
        <div className="h-16 w-full animate-pulse rounded bg-surface"></div>
        <div className="h-6 w-3/4 animate-pulse rounded bg-surface"></div>
      </div>

      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="h-4 w-full animate-pulse rounded bg-surface"
          ></div>
        ))}
      </div>
    </div>
  );
}
