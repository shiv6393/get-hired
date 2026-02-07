import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import ApplyJobModal from "@/components/ui/jobs/ApplyJobModal";
import type { Job as JobDetailsType } from "@/types/job";
import { useEffect, useState } from "react";
import { jobsApi } from "@/services/jobsApi";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role } = useAuth();

  const [job, setJob] = useState<JobDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadJob = async () => {
      try {
        setLoading(true);

        // ✅ Proper backend integration
        const res = await jobsApi.getById(id);
        setJob(res.data);
      } catch {
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
      {/* ================= JOB HEADER ================= */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p className="text-muted-foreground">{job.company}</p>
        <Badge>Open Position</Badge>
      </div>

      <p className="text-sm text-muted-foreground">📍 {job.location}</p>

      {/* ================= APPLY SECTION ================= */}

      {/* Not logged in */}
      {role === null && (
        <Button
          className="w-full"
          onClick={() =>
            navigate("/login", {
              state: { redirectTo: `/jobs/${job.id}` },
            })
          }
        >
          Login to Apply
        </Button>
      )}

      {/* Candidate */}
      {role === "CANDIDATE" && <ApplyJobModal job={job} />}

      {/* Recruiter / Admin */}
      {(role === "RECRUITER" || role === "ADMIN") && (
        <p className="text-sm text-muted-foreground">
          Recruiters and admins cannot apply for jobs.
        </p>
      )}
    </div>
  );
}
