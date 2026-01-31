import { createContext, useContext, useEffect, useState } from "react";
import type { Job } from "@/types/job";
import { jobsApi } from "@/services/jobsApi";

interface JobsContextType {
  jobs: Job[];
  loading: boolean;
  page: number;
  totalPages: number;
  fetchJobs: (
    page?: number,
    sortBy?: string,
    dir?: "asc" | "desc",
  ) => Promise<void>;
}

const JobsContext = createContext<JobsContextType | null>(null);

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchJobs = async (
    page = 0,
    sortBy = "createdAt",
    dir: "asc" | "desc" = "desc",
  ) => {
    setLoading(true);
    try {
      const res = await jobsApi.getAll(page, sortBy, dir);
      setJobs(res.content);
      setPage(res.number);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <JobsContext.Provider
      value={{
        jobs,
        loading,
        page,
        totalPages,
        fetchJobs,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export const useJobs = () => {
  const ctx = useContext(JobsContext);
  if (!ctx) {
    throw new Error("useJobs must be used inside JobsProvider");
  }
  return ctx;
};
