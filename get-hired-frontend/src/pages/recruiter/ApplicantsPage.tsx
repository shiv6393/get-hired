import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  downloadRecruiterAsset,
  recruiterApi,
} from "@/services/recruiterApi";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

type ApplicationStatus = "SHORTLISTED" | "REJECTED";

interface Applicant {
  id: string;
  jobId: string;
  jobTitle: string;
  email: string;
  resumeUrl: string;
  coverLetter: string | null;
  appliedAt: string;
  status: ApplicationStatus;
}

export default function ApplicantsPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const { role } = useAuth();

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (role !== "RECRUITER") {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    if (!jobId) return;

    const fetchApplicants = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await recruiterApi.getApplicants(jobId);
        setApplicants(res.data);
      } catch {
        setError("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const updateStatus = async (
    applicationId: string,
    status: ApplicationStatus,
  ) => {
    try {
      await recruiterApi.updateApplicantStatus(applicationId, status);

      setApplicants((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status } : app,
        ),
      );

      toast.success(`Applicant ${status.toLowerCase()}`);
    } catch {
      toast.error("Failed to update application status");
    }
  };

  const handleResumeDownload = async (resumeUrl: string, email: string) => {
    try {
      await downloadRecruiterAsset(resumeUrl, `${email}-resume`);
    } catch {
      toast.error("Failed to download resume");
    }
  };

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Loading applicants...</p>
    );
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Applicants</h1>
        <p className="text-sm text-muted-foreground">
          Review resumes, read cover letters, and update the pipeline for this role.
        </p>
      </div>

      {applicants.length === 0 ? (
        <p className="text-sm text-muted-foreground">No applicants yet.</p>
      ) : (
        <div className="divide-y rounded-lg border bg-background">
          {applicants.map((app) => (
            <div key={app.id} className="space-y-4 p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="font-medium">{app.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Job: {app.jobTitle}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Applied on {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                  <p className="mt-1 text-xs">
                    Status: <b>{app.status}</b>
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleResumeDownload(app.resumeUrl, app.email)}
                  >
                    Resume
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    disabled={app.status === "SHORTLISTED"}
                    onClick={() => updateStatus(app.id, "SHORTLISTED")}
                  >
                    Shortlist
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={app.status === "REJECTED"}
                    onClick={() => updateStatus(app.id, "REJECTED")}
                  >
                    Reject
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Cover letter
                </p>
                <p className="mt-2 text-sm leading-6">
                  {app.coverLetter?.trim() || "No cover letter provided."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
