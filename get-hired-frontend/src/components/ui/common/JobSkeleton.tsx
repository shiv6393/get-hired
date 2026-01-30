export default function JobSkeleton() {
  return (
    <div className="border rounded-xl p-5 space-y-3 animate-pulse">
      {/* Title */}
      <div className="h-4 w-3/4 bg-muted rounded" />

      {/* Company + location */}
      <div className="h-3 w-1/2 bg-muted rounded" />

      {/* Job type badge */}
      <div className="h-5 w-24 bg-muted rounded-full" />

      {/* Button */}
      <div className="h-8 w-28 bg-muted rounded" />
    </div>
  );
}
