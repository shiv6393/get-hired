import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import ApplyJobModal from "@/components/ui/jobs/ApplyJobModal";
import type { Job as JobDetailsType } from "@/types/job";
import { useEffect, useState } from "react";
import { jobsApi } from "@/services/jobsApi";

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();

  const [job, setJob] = useState<JobDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadJob = async () => {
      try {
        setLoading(true);
        const data = await jobsApi.getById(id);
        setJob(data);
      } catch (err) {
        setError("Unable to load job details");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-sm text-muted-foreground">Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-sm text-red-500">{error}</p>
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

      <ApplyJobModal job={job} />
    </div>
  );
}
