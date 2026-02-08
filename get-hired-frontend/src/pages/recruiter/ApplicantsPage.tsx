import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { recruiterApi } from "@/services/recruiterApi";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

type ApplicationStatus =  "SHORTLISTED" | "REJECTED";

interface Applicant {
  id: string;
  email: string;
  resumeUrl: string;
  appliedAt: string;
  status: ApplicationStatus;
}

export default function ApplicantsPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const { role } = useAuth();

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔐 Role protection
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

      // ✅ Update UI immediately
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

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Loading applicants...</p>
    );
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-6">
      <h1 className="text-2xl font-bold">Applicants</h1>

      {applicants.length === 0 ? (
        <p className="text-sm text-muted-foreground">No applicants yet.</p>
      ) : (
        <div className="border rounded-lg divide-y">
          {applicants.map((app) => (
            <div key={app.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{app.email}</p>

                <p className="text-xs text-muted-foreground">
                  Applied on {new Date(app.appliedAt).toLocaleDateString()}
                </p>

                <p className="text-xs mt-1">
                  Status: <b>{app.status}</b>
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm" variant="outline">
                    Resume
                  </Button>
                </a>

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
          ))}
        </div>
      )}
    </div>
  );
}
