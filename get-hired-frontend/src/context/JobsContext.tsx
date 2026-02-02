import { createContext, useContext, useState, useCallback } from "react";
import type { Job } from "@/types/job";
import { jobsApi } from "@/services/jobsApi";
import { recruiterApi } from "@/services/recruiterApi";

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
  fetchRecruiterJobs: (
    page?: number,
    sortBy?: string,
    dir?: "asc" | "desc",
  ) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  addJob: (job: Partial<Job>) => Promise<void>;
}


const JobsContext = createContext<JobsContextType | null>(null);

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // ✅ FIXED: memoized with useCallback
  const fetchJobs = useCallback(
    async (
      page = 0,
      sortBy = "createdAt",
      dir: "asc" | "desc" = "desc",
    ): Promise<void> => {
      setLoading(true);
      try {
        const res = await jobsApi.getAll(page, sortBy, dir);
        setJobs(res.content);
        setPage(res.number);
        setTotalPages(res.totalPages);
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  const fetchRecruiterJobs = useCallback(
  async (
    page = 0,
    sortBy = "createdAt",
    dir: "asc" | "desc" = "desc",
  ) => {
    setLoading(true);
    try {
      const res = await recruiterApi.getMyJobs(page, sortBy, dir);
      setJobs(res.content);
      setPage(res.number);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  },
  [],
);


  const deleteJob = async (id: string): Promise<void> => {
    await jobsApi.delete(id);
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const addJob = async (job: Partial<Job>): Promise<void> => {
    const createdJob = await jobsApi.create(job);
    setJobs((prev) => [createdJob, ...prev]);
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        loading,
        page,
        totalPages,
        fetchJobs,
        fetchRecruiterJobs,
        deleteJob,
        addJob,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export const useJobs = (): JobsContextType => {
  const ctx = useContext(JobsContext);
  if (!ctx) {
    throw new Error("useJobs must be used inside JobsProvider");
  }
  return ctx;
};
