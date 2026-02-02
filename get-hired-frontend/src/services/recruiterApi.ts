import { api } from "@/lib/api";

export const recruiterApi = {
  // ✅ Recruiter posted jobs
  getMyJobs: async (page: number, sortBy: string, direction: string) => {
    const res = await api.get("/recruiter/jobs", {
      params: { page, size: 6, sortBy, direction },
    });
    return res.data;
  },

  // ✅ Applicants for a job
  getApplicants: async (jobId: string) => {
    const res = await api.get(`/recruiter/jobs/${jobId}/applicants`);
    return res.data;
  },
};
