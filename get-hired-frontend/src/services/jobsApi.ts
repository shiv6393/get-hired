import { api } from "@/lib/api";
import type{ Job } from "@/types/job";
export interface JobsResponse {
  content: Job[];
  totalPages: number;
  number: number;
}


export const jobsApi = {
  getAll: async (
    page: number,
    sortBy: string,
    direction: string,
  ): Promise<JobsResponse> => {
    const res = await api.get("/jobs", {
      params: { page, size: 6, sortBy, direction },
    });
    return res.data;
  },
  getById: async (id: string) => {
    const res = await api.get(`/jobs/${id}`);
    return res.data;
  },

//   applyJob: async (id: string): Promise<void> => {
//     await api.post(`/jobs/${id}/apply`);
//   },
 };
