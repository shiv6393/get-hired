import { createContext, useContext, useState } from "react";
import type{ Job } from "@/types/job";

interface JobsContextType {
  jobs: Job[];
  addJob: (job: Job) => void;
}

const JobsContext = createContext<JobsContextType | null>(null);

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore",
      type: "Full-time",
    },
  ]);

  const addJob = (job: Job) => {
    setJobs((prev) => [job, ...prev]);
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob }}>
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
