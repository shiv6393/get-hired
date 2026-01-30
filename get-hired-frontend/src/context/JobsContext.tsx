import { createContext, useContext, useEffect, useState } from "react";
import type{ Job } from "@/types/job";

interface JobsContextType {
  jobs: Job[];
  addJob: (job: Job) => void;
  deleteJob: (id: string) => void;
}

const JobsContext = createContext<JobsContextType | null>(null);

const STORAGE_KEY = "jobs_data";

const defaultJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore",
    type: "Full-time",
  },
];

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);

  // 🔹 Load jobs from localStorage
  useEffect(() => {
    const storedJobs = localStorage.getItem(STORAGE_KEY);
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    } else {
      setJobs(defaultJobs);
    }
  }, []);

  // 🔹 Persist jobs to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job: Job) => {
    setJobs((prev) => [job, ...prev]);
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, deleteJob }}>
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
