import { createContext, useContext, useEffect, useState } from "react";
import type{ Job } from "@/types/job";
import { jobsApi } from "@/services/jobsApi";

interface JobsContextType {
  jobs: Job[];
  loading: boolean;
  fetchJobs: () => Promise<void>;
}

const JobsContext = createContext<JobsContextType | null>(null);

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    const data = await jobsApi.getAll();
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <JobsContext.Provider value={{ jobs, loading, fetchJobs }}>
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
