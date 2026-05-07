import { useJobs } from "@/context/JobsContext";
import JobCard from "@/components/ui/jobs/jobCards";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import JobSkeleton from "@/components/ui/common/JobSkeleton";
import { Button } from "@/components/ui/button";
import {
  BriefcaseBusiness,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

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

  const filteredJobs = useMemo(() => {
    const term = search.toLowerCase();
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term),
    );
  }, [jobs, search]);

  const title =
    mode === "RECRUITER" ? "My Posted Jobs" : "Explore Opportunities";
  const subtitle =
    mode === "RECRUITER"
      ? "A cleaner view of your live listings, ready for quick updates."
      : "Search, scan, and compare openings in a richer browsing experience.";

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-[linear-gradient(135deg,rgba(14,165,233,0.1),rgba(245,158,11,0.12),rgba(255,255,255,0.9))] p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(14,165,233,0.14),rgba(245,158,11,0.08),rgba(15,23,42,0.92))] sm:p-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/75 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
            <Sparkles size={15} className="text-amber-500" />
            Smarter job browsing
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.7fr]">
          <div className="flex h-12 items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-4 shadow-sm dark:border-white/10 dark:bg-white/5">
            <Search className="pointer-events-none size-4 shrink-0 text-muted-foreground" />
            <Input
              placeholder="Search by title, company, or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
            />
          </div>

          <div className="flex h-12 items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-4 shadow-sm dark:border-white/10 dark:bg-white/5">
            <SlidersHorizontal className="pointer-events-none size-4 shrink-0 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-full w-full appearance-none bg-transparent pr-4 text-sm outline-none"
            >
              <option value="createdAt">Latest</option>
              <option value="title">Job Title</option>
              <option value="company">Company</option>
            </select>
          </div>

          <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-4 text-sm shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-muted-foreground">Visible jobs</p>
            <p className="mt-1 flex items-center gap-2 text-2xl font-semibold">
              <BriefcaseBusiness size={18} />
              {loading ? "..." : filteredJobs.length}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-400/10" />
      </section>

      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <JobSkeleton key={i} />
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="rounded-[2rem] border border-white/60 bg-white/80 p-8 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-2xl font-semibold">No jobs found</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Try a different search term or switch the sorting to surface more
            relevant results.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
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

      <div className="flex justify-center gap-3 pt-2">
        <Button
          variant="outline"
          className="rounded-full"
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
          className="rounded-full"
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
