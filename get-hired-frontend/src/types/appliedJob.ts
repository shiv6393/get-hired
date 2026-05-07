export interface AppliedJob {
  applicationId: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: "APPLIED" | "SHORTLISTED" | "REJECTED";
  appliedAt: string;
}
