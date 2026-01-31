import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import ApplyJobModal from "@/components/ui/jobs/ApplyJobModal";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type{ JobDetails } from "@/types/job";
import { jobsApi } from "@/services/jobsApi";

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const data = await jobsApi.getById(id);
        setJob(data);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-sm text-muted-foreground">Loading job details...</p>
      </div>
    );
  }

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
        <p className="text-sm">{job.description}</p>
      </div>

      {/* Apply modal still works */}
      <ApplyJobModal job={job} />
    </div>
  );
}
