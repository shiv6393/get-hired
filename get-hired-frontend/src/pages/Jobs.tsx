import { useJobs } from "@/context/JobsContext";
import JobCard from "@/components/ui/jobs/jobCards";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import JobSkeleton from "@/components/ui/common/JobSkeleton";
import { Button } from "@/components/ui/button";

export default function Jobs() {
  const [searchParams] = useSearchParams();
  const companyParam = searchParams.get("company") || "";

  const [search, setSearch] = useState(companyParam);
  const [sort, setSort] = useState("createdAt");

  const { jobs, page, totalPages, fetchJobs, loading } = useJobs();

  // Fetch jobs when sorting changes
  useEffect(() => {
    fetchJobs(0, sort, "desc");
  }, [sort, fetchJobs]);

  // Sync search when URL changes
  useEffect(() => {
    setSearch(companyParam);
  }, [companyParam]);

 const filteredJobs = (jobs ?? []).filter((job) => {
   const term = search.toLowerCase();
   return (
     job.company.toLowerCase().includes(term) ||
     job.title.toLowerCase().includes(term)
   );
 });

  const isSearching = search.trim().length > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-4">
      <h1 className="text-xl font-semibold">Jobs</h1>

      {/* Search */}
      <Input
        placeholder="Search by company or role"
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

      {/* Pagination (disabled during search) */}
      {!isSearching && (
        <div className="flex gap-2 justify-center mt-6">
          <Button
            variant="outline"
            disabled={page === 0}
            onClick={() => fetchJobs(page - 1, sort, "desc")}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            disabled={page + 1 === totalPages}
            onClick={() => fetchJobs(page + 1, sort, "desc")}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
