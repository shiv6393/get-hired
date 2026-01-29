import JobCard from "@/components/ui/jobs/jobCards";
import { useJobs } from "@/context/JobsContext";

export default function Jobs() {
  const { jobs } = useJobs();

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-4">
      <h1 className="text-xl font-semibold">Jobs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
