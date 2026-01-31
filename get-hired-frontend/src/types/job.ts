export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  type: "Full-time" | "Part-time" | "Internship";
}

