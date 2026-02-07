import { createContext, useContext, useEffect, useState } from "react";
import type { AppliedJob } from "@/types/appliedJob";
import { applicationsApi } from "@/services/applicationsApi";

interface AppliedJobsContextType {
  appliedJobs: AppliedJob[];
  loading: boolean;
  fetchAppliedJobs: () => Promise<void>;
}

const AppliedJobsContext = createContext<AppliedJobsContextType | null>(null);

export function AppliedJobsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      const res = await applicationsApi.getMyAppliedJobs();
      setAppliedJobs(res.data.content);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <AppliedJobsContext.Provider
      value={{ appliedJobs, loading, fetchAppliedJobs }}
    >
      {children}
    </AppliedJobsContext.Provider>
  );
}

export const useAppliedJobs = () => {
  const ctx = useContext(AppliedJobsContext);
  if (!ctx) {
    throw new Error("useAppliedJobs must be used inside AppliedJobsProvider");
  }
  return ctx;
};
