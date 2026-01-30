import { useJobs } from "@/context/JobsContext";
import JobCard from "@/components/ui/jobs/jobCards";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import JobSkeleton from "@/components/ui/common/JobSkeleton";

export default function Jobs() {
  const { jobs, loading } = useJobs();
  const [searchParams] = useSearchParams();

  const companyParam = searchParams.get("company") || "";

  const [search, setSearch] = useState(companyParam);

  // 🔁 Sync search when URL changes
  useEffect(() => {
    setSearch(companyParam);
  }, [companyParam]);

  const filteredJobs = jobs.filter((job) => {
    const term = search.toLowerCase();
    return (
      job.company.toLowerCase().includes(term) ||
      job.title.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-4">
      <h1 className="text-xl font-semibold">Jobs</h1>

      {/* Search */}
      <Input
        placeholder="Search by company or role"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Job list */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <JobSkeleton key={i} />
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <p className="text-sm text-muted-foreground">No jobs found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
