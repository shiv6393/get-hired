import { useEffect, useState } from "react";
import { recruiterApi } from "@/services/recruiterApi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface RecruiterJob {
  id: string;
  title: string;
  company: string;
  location: string;
  applicantsCount: number;
}

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState<RecruiterJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchJobs = async (pageNumber = 0) => {
    try {
      setLoading(true);
      setError(null);

      const res = await recruiterApi.getMyJobs(pageNumber, "createdAt", "desc");

      setJobs(res.content);
      setPage(res.number);
      setTotalPages(res.totalPages);
    } catch {
      setError("Failed to load recruiter jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(0);
  }, []);

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

                <Link to={`/recruiter/jobs/${job.id}/applicants`}>
                  <Button size="sm">View Applicants</Button>
                </Link>
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
