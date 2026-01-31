import { api } from "@/lib/api";
import type{ Job } from "@/types/job";

export const jobsApi = {
  getAll: async (): Promise<Job[]> => {
    const res = await api.get("/jobs");
    return res.data;
  },
};
