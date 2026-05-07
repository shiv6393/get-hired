import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppliedJobs } from "@/context/AppliedJobsContext";
import { useAuth } from "@/context/AuthContext";

const statusStyles = {
  APPLIED: "bg-sky-100 text-sky-800",
  SHORTLISTED: "bg-emerald-100 text-emerald-800",
  REJECTED: "bg-rose-100 text-rose-800",
} as const;

const formatStatus = (status: keyof typeof statusStyles) =>
  status.charAt(0) + status.slice(1).toLowerCase();

export default function AppliedJobs() {
  const { appliedJobs, loading, fetchAppliedJobs } = useAppliedJobs();
  const { role } = useAuth();

  useEffect(() => {
    if (role === "CANDIDATE") {
      fetchAppliedJobs();
    }
  }, [fetchAppliedJobs, role]);

  if (role !== "CANDIDATE") {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <p className="text-center">Loading applied jobs...</p>;
  }

  if (appliedJobs.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        You have not applied to any jobs yet.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <h1 className="text-xl font-semibold">Applied Jobs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {appliedJobs.map((job) => (
          <div key={job.applicationId} className="border p-4 rounded">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-medium">{job.jobTitle}</h2>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[job.status]}`}
              >
                {formatStatus(job.status)}
              </span>
            </div>
            <p className="text-xs mt-3">
              Applied on {new Date(job.appliedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
