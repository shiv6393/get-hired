import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import ApplyJobModal from "@/components/ui/jobs/ApplyJobModal";
import type{ JobDetails } from "@/types/job";

export default function JobDetails() {
  const { id } = useParams();

  const job: JobDetails = {
    id: id || "1",
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore",
    type: "Full-time",
    description:
      "We are looking for a frontend developer with strong React skills.",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p className="text-muted-foreground">{job.company}</p>
        <Badge>{job.type}</Badge>
      </div>

      <p className="text-sm text-muted-foreground">📍 {job.location}</p>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Job Description</h2>
        <p className="text-sm">{job.description}</p>
      </div>

      {/* ✅ Pass correct type */}
      <ApplyJobModal job={job} />
    </div>
  );
}
