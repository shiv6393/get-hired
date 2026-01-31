import { api } from "@/lib/api";
import type{ Job, JobDetails } from "@/types/job";
export const jobsApi = {
  getAll: async (): Promise<Job[]> => {
    const res = await api.get("/jobs");
    return res.data;
  },

  getById: async (id: string): Promise<JobDetails> => {
    const res = await api.get(`/jobs/${id}`);
    return res.data;
  },
};
