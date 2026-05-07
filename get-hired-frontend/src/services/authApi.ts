import { api } from "@/lib/axios";

export const authApi = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),

  register: (
    email: string,
    password: string,
    role: "CANDIDATE" | "RECRUITER",
    companyName?: string,
    fullName?: string
  ) => api.post("/auth/register", { email, password, role, companyName, fullName }),
};
