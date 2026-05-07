import { api } from "@/lib/axios";

export interface RecruiterApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateEmail: string;
  resumeUrl: string;
  coverLetter: string | null;
  appliedAt: string;
  status: "APPLIED" | "SHORTLISTED" | "REJECTED";
}

export const getRecruiterAssetUrl = (path: string) => {
  if (!path) return path;

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const baseUrl = api.defaults.baseURL ?? "http://localhost:8080/api";
  const base = new URL(baseUrl);

  if (path.startsWith("/")) {
    return new URL(path, base.origin).toString();
  }

  return new URL(path, `${baseUrl.replace(/\/+$/, "")}/`).toString();
};

export const downloadRecruiterAsset = async (path: string, fileName?: string) => {
  const url = getRecruiterAssetUrl(path);
  const response = await api.get<Blob>(url, {
    responseType: "blob",
  });

  const blobUrl = window.URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = fileName || path.split("/").pop() || "resume";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
};

// Backend-aligned recruiter APIs
export const recruiterApi = {
  getMyJobs: async (
    page = 0,
    sortBy = "createdAt",
    direction: "asc" | "desc" = "desc",
    size = 6,
  ) => {
    const res = await api.get("/jobs/my", {
      params: {
        page,
        size,
        sortBy,
        dir: direction,
      },
    });
    return res;
  },

  getApplicants: async (jobId: string) => {
    const res = await api.get(`/recruiters/jobs/${jobId}/applicants`);
    return res;
  },

  getApplications: async () => {
    const res = await api.get<RecruiterApplication[]>("/recruiters/applications");
    return res;
  },

  createJob: async (payload: {
    title: string;
    description: string;
    location: string;
    salary?: number;
  }) => {
    const res = await api.post("/jobs", payload);
    return res;
  },

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

  deleteJob: async (jobId: string) => {
    return api.delete(`/jobs/${jobId}`);
  },

  updateApplicantStatus: async (
    applicationId: string,
    status: "SHORTLISTED" | "REJECTED",
  ) => {
    return api.patch(`/recruiters/applications/${applicationId}/status`, {
      status,
    });
  },
};
