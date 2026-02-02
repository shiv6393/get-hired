import { api } from "@/lib/api";
import type { Job } from "@/types/job";

export interface JobsResponse {
  content: Job[];
  totalPages: number;
  number: number;
}

export const jobsApi = {
  // ✅ Get all jobs (paginated)
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

  // ✅ Get job by ID
  getById: async (id: string): Promise<Job> => {
    const res = await api.get(`/jobs/${id}`);
    return res.data;
  },

  // ✅ CREATE / POST JOB (Recruiter / Admin)
  create: async (job: Partial<Job>): Promise<Job> => {
    const res = await api.post("/jobs", job);
    return res.data;
  },

  // ✅ Delete job
  delete: async (id: string): Promise<void> => {
    await api.delete(`/jobs/${id}`);
  },
};
