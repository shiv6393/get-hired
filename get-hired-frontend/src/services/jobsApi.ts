// src/services/jobsApi.ts
import { api } from "@/lib/axios";

export const jobsApi = {
  getPublicJobs: (page = 0, size = 10) =>
    api.get(`/jobs/public?page=${page}&size=${size}`),

  createJob: (data: any) => api.post("/jobs", data),

  getMyJobs: (page = 0) => api.get(`/jobs/my?page=${page}`),

  deleteJob: (jobId: string) => api.delete(`/jobs/${jobId}`),
  // jobsApi.ts
getById: (id: string) =>
  api.get(`/jobs/${id}`)

};
