import { useAppliedJobs } from "@/context/AppliedJobsContext";

export default function AppliedJobs() {
  const { appliedJobs, loading } = useAppliedJobs();

  if (loading) {
    return <p className="text-center">Loading applied jobs...</p>;
  }

  if (appliedJobs.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        You have not applied to any jobs yet.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <h1 className="text-xl font-semibold">Applied Jobs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {appliedJobs.map((job) => (
          <div key={job.applicationId} className="border p-4 rounded">
            <h2 className="font-medium">{job.jobTitle}</h2>
            <p className="text-sm text-muted-foreground">{job.company}</p>
            <p className="text-xs mt-1">
              Applied on {new Date(job.appliedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
