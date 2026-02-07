import { api } from "@/lib/axios";

// Backend-aligned recruiter APIs
export const recruiterApi = {
  // 🔹 Recruiter: fetch own jobs (paginated)
  getMyJobs: async (
    page = 0,
    sortBy = "createdAt",
    direction: "asc" | "desc" = "desc",
    size = 6,
  ) => {
    const res = await api.get("/recruiters/jobs", {
      params: {
        page,
        size,
        sortBy,
        dir: direction, // 🔥 backend expects `dir`
      },
    });
    return res;
  },

  // 🔹 Recruiter: fetch applicants for a job
  getApplicants: async (jobId: string) => {
    const res = await api.get(`/recruiters/jobs/${jobId}/applicants`);
    return res;
  },

  // 🔹 Recruiter: create job
  createJob: async (payload: {
    title: string;
    description: string;
    location: string;
    salary?: number;
  }) => {
    const res = await api.post("/jobs", payload);
    return res;
  },
  // 🔹 Recruiter: update job
  updateJob: async (
    jobId: string,
    payload: {
      title: string;
      description: string;
      location: string;
      salary?: number;
    },
  ) => {
    const res = await api.put(`/jobs/${jobId}`, payload);
    return res;
  },
};
