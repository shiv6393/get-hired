import { api } from "@/lib/api";
import type{ Job } from "@/types/job";

export const jobsApi = {
  getAll: async (): Promise<Job[]> => {
    const res = await api.get("/jobs");
    return res.data;
  },

  getById: async (id: string): Promise<Job> => {
    const res = await api.get(`/jobs/${id}`);
    return res.data;
  },

  create: async (job: Job): Promise<Job> => {
    const res = await api.post("/jobs", job);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/jobs/${id}`);
  },

  apply: async (id: string): Promise<void> => {
    await api.post(`/jobs/${id}/apply`);
  },
};
