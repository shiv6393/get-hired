import { api } from "@/lib/axios";

export const jobsApi = {
  getPublicJobs: (
    page = 0,
    size = 10,
    sortBy = "createdAt",
    dir: "asc" | "desc" = "desc",
  ) =>
    api.get(`/jobs/public?page=${page}&size=${size}&sortBy=${sortBy}&dir=${dir}`),

  createJob: (data: any) => api.post("/jobs", data),

  getMyJobs: (
    page = 0,
    size = 10,
    sortBy = "createdAt",
    dir: "asc" | "desc" = "desc",
  ) => api.get(`/jobs/my?page=${page}&size=${size}&sortBy=${sortBy}&dir=${dir}`),

  deleteJob: (jobId: string) => api.delete(`/jobs/${jobId}`),

  getById: (id: string) => api.get(`/jobs/${id}`),
};
