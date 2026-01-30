import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import ApplyJobModal from "@/components/ui/jobs/ApplyJobModal";
import { useJobs } from "@/context/JobsContext";
import { Button } from "@/components/ui/button";

export default function JobDetails() {
  const { id } = useParams();
  const { jobs } = useJobs();

  const job = jobs.find((j) => j.id === id);

  // ❌ Job not found
  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
        <h1 className="text-xl font-semibold">Job not found</h1>
        <Link to="/jobs">
          <Button variant="outline">Back to Jobs</Button>
        </Link>
      </div>
    );
  }

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
        <p className="text-sm">
          {/* temporary description */}
          We are looking for a skilled professional to join {job.company}. You
          will work on modern technologies and scalable systems.
        </p>
      </div>

      {/* ✅ Pass real job from context */}
      <ApplyJobModal job={job} />
    </div>
  );
}
