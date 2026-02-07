import { useEffect, useState } from "react";
import { recruiterApi } from "@/services/recruiterApi";
import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface RecruiterJob {
  id: string;
  title: string;
  company: string;
  location: string;
  applicantsCount: number;
}

export default function RecruiterDashboard() {
  const { role } = useAuth();

  const [jobs, setJobs] = useState<RecruiterJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // 🔐 Role protection
  if (role !== "RECRUITER") {
    return <Navigate to="/" replace />;
  }

  const fetchJobs = async (pageNumber = 0) => {
    try {
      setLoading(true);
      setError(null);

      const res = await recruiterApi.getMyJobs(pageNumber, "createdAt", "desc");

      setJobs(res.data.content);
      setPage(res.data.number);
      setTotalPages(res.data.totalPages);
    } catch {
      setError("Failed to load recruiter jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(0);
  }, []);

  // 🔴 DELETE JOB HANDLER (STEP 2)
  const handleDelete = async (jobId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?",
    );
    if (!confirmed) return;

    try {
      await recruiterApi.deleteJob(jobId);

      // Remove from UI
      setJobs((prev) => prev.filter((job) => job.id !== jobId));

      toast.success("Job deleted successfully");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          "Cannot delete job with existing applicants",
      );
    }
  };

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading jobs...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>

      {jobs.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You haven’t posted any jobs yet.
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {job.company} • {job.location}
                  </p>
                  <p className="text-xs mt-1">
                    Applicants: <b>{job.applicantsCount}</b>
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link to={`/recruiter/jobs/${job.id}/applicants`}>
                    <Button size="sm" variant="outline">
                      Applicants
                    </Button>
                  </Link>

                  <Link to={`/recruiter/jobs/${job.id}/edit`}>
                    <Button size="sm">Edit</Button>
                  </Link>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex gap-2 justify-center mt-6">
            <Button
              variant="outline"
              disabled={page === 0}
              onClick={() => fetchJobs(page - 1)}
            >
              Previous
            </Button>

            <Button
              variant="outline"
              disabled={page + 1 === totalPages}
              onClick={() => fetchJobs(page + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
