// src/services/applicationsApi.ts
import { api } from "@/lib/axios";
import type { AppliedJob } from "@/types/appliedJob";

export const applicationsApi = {
  // 🔹 Apply for a job (multipart)
  apply: (formData: FormData) =>
    api.post("/applications", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  // 🔹 Candidate: get applied jobs (backend source of truth)
  getMyAppliedJobs: (page = 0, size = 10) =>
    api.get<{
      content: AppliedJob[];
      totalPages: number;
      totalElements: number;
      number: number;
    }>(`/candidates/applications?page=${page}&size=${size}`),
};
