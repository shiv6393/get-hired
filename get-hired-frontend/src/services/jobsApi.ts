import { api } from "@/lib/api";

export const jobsApi = {
  getAll: async () => {
    const res = await api.get("/jobs");
    return res.data;
  },

  getById: async (id: string) => {
    const res = await api.get(`/jobs/${id}`);
    return res.data;
  },

  applyJob: async (id: string): Promise<void> => {
    await api.post(`/jobs/${id}/apply`);
  },
};
