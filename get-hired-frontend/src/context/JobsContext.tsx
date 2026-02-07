import { createContext, useContext, useEffect, useState } from "react";
import type { Job } from "@/types/job";
import { jobsApi } from "@/services/jobsApi";

interface JobsContextType {
  jobs: Job[];
  loading: boolean;
  page: number;
  totalPages: number;
  fetchJobs: (page?: number) => Promise<void>;
  fetchJobById: (id: string) => Promise<Job>;
}

const JobsContext = createContext<JobsContextType | null>(null);

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // 🔹 Fetch public jobs (paginated)
  const fetchJobs = async (page = 0) => {
    try {
      setLoading(true);
      const res = await jobsApi.getPublicJobs(page, 10);

      setJobs(res.data.content);
      setPage(res.data.number);
      setTotalPages(res.data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch single job (Job Details page)
  const fetchJobById = async (id: string): Promise<Job> => {
    const res = await jobsApi.getById(id);
    return res.data;
  };

  // Load jobs on first render
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
        fetchJobById,
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
