import { useJobs } from "@/context/JobsContext";
import JobCard from "@/components/ui/jobs/jobCards";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import JobSkeleton from "@/components/ui/common/JobSkeleton";
import { Button } from "@/components/ui/button";

type JobsMode = "PUBLIC" | "RECRUITER";

export default function Jobs({ mode = "PUBLIC" }: { mode?: JobsMode }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt");

  const {
    jobs,
    page,
    totalPages,
    loading,
    fetchJobs,
    fetchRecruiterJobs,
    deleteJob,
  } = useJobs();

  useEffect(() => {
    if (mode === "RECRUITER") {
      fetchRecruiterJobs(0, sort, "desc");
    } else {
      fetchJobs(0, sort, "desc");
    }
  }, [mode, sort, fetchJobs, fetchRecruiterJobs]);

  const filteredJobs = jobs.filter((job) => {
    const term = search.toLowerCase();
    return (
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-4">
      <h1 className="text-xl font-semibold">
        {mode === "RECRUITER" ? "My Posted Jobs" : "Jobs"}
      </h1>

      {/* Search */}
      <Input
        placeholder="Search jobs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="createdAt">Latest</option>
        <option value="title">Job Title</option>
        <option value="company">Company</option>
      </select>

      {/* Job List */}
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
            <JobCard
              key={job.id}
              job={job}
              mode={mode}
              onDelete={() => deleteJob(job.id)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex gap-2 justify-center mt-6">
        <Button
          variant="outline"
          disabled={page === 0}
          onClick={() =>
            mode === "RECRUITER"
              ? fetchRecruiterJobs(page - 1, sort, "desc")
              : fetchJobs(page - 1, sort, "desc")
          }
        >
          Previous
        </Button>

        <Button
          variant="outline"
          disabled={page + 1 === totalPages}
          onClick={() =>
            mode === "RECRUITER"
              ? fetchRecruiterJobs(page + 1, sort, "desc")
              : fetchJobs(page + 1, sort, "desc")
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
