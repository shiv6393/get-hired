import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { recruiterApi } from "@/services/recruiterApi";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface Applicant {
  id: string;
  applicantName: string;
  email: string;
  resumeUrl: string;
  appliedAt: string;
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
                <p className="font-medium">{app.applicantName}</p>
                <p className="text-sm text-muted-foreground">{app.email}</p>
                <p className="text-xs text-muted-foreground">
                  Applied on {new Date(app.appliedAt).toLocaleDateString()}
                </p>
              </div>

              <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline">
                  View Resume
                </Button>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
