export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Internship";
}

export interface JobDetails extends Job {
  description: string;
}
