export interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "RECRUITER" | "ADMIN";
}
