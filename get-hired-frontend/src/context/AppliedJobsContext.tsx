import { createContext, useContext, useState,useEffect } from "react";
import type{ Job } from "@/types/job";
interface AppliedJobsContextType {
  appliedJobs: Job[];
  applyToJob: (job: Job) => void;
  isApplied: (jobId: string) => boolean;
}

const AppliedJobsContext = createContext<AppliedJobsContextType | null>(null);

const STORAGE_KEY = "applied_jobs";

export function AppliedJobsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);

  // 🔹 Load from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAppliedJobs(JSON.parse(stored));
    }
  }, []);

  // 🔹 Save to localStorage whenever appliedJobs changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  const applyToJob = (job: Job) => {
    if (!appliedJobs.some((j) => j.id === job.id)) {
      setAppliedJobs((prev) => [...prev, job]);
    }
  };

  const isApplied = (jobId: string) => {
    return appliedJobs.some((job) => job.id === jobId);
  };

  return (
    <AppliedJobsContext.Provider value={{ appliedJobs, applyToJob, isApplied }}>
      {children}
    </AppliedJobsContext.Provider>
  );
}

export const useAppliedJobs = () => {
  const context = useContext(AppliedJobsContext);
  if (!context) {
    throw new Error("useAppliedJobs must be used inside AppliedJobsProvider");
  }
  return context;
};
