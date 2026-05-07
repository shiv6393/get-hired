import { createContext, useCallback, useContext, useState } from "react";
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
  deleteJob: (jobId: string) => Promise<void>;
  fetchJobById: (id: string) => Promise<Job>;
}

const JobsContext = createContext<JobsContextType | null>(null);

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchJobs = useCallback(
    async (
      page = 0,
      sortBy = "createdAt",
      dir: "asc" | "desc" = "desc",
    ) => {
      try {
        setLoading(true);
        const res = await jobsApi.getPublicJobs(page, 10, sortBy, dir);
        setJobs(res.data.content);
        setPage(res.data.number);
        setTotalPages(res.data.totalPages);
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
      try {
        setLoading(true);
        const res = await recruiterApi.getMyJobs(page, sortBy, dir, 10);
        setJobs(res.data.content);
        setPage(res.data.number);
        setTotalPages(res.data.totalPages);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const deleteJob = useCallback(async (jobId: string) => {
    await recruiterApi.deleteJob(jobId);
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  }, []);

  const fetchJobById = useCallback(async (id: string): Promise<Job> => {
    const res = await jobsApi.getById(id);
    return res.data;
  }, []);

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
