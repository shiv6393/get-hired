import { useAppliedJobs } from "@/context/AppliedJobsContext";
import JobCard from "@/components/ui/jobs/jobCards";
export default function AppliedJobs() {
  const { appliedJobs } = useAppliedJobs();

  if (appliedJobs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <p className="text-muted-foreground">
          You have not applied to any jobs yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <h1 className="text-xl font-semibold">Applied Jobs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {appliedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

