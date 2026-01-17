export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-text-secondary/20 border-t-accent"></div>
        <p className="text-sm text-text-secondary">Loading...</p>
      </div>
    </div>
  );
}
