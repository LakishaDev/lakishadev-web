export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 space-y-4">
        <div className="h-12 w-64 animate-pulse rounded bg-surface"></div>
        <div className="h-6 w-96 animate-pulse rounded bg-surface"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-lg bg-surface"
          ></div>
        ))}
      </div>
    </div>
  );
}
