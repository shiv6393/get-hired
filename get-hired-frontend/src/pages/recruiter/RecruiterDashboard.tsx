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

  useEffect(() => {
    recruiterApi.getMyJobs().then((data) => {
      setJobs(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading jobs...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>

      {jobs.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You haven’t posted any jobs yet.
        </p>
      ) : (
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
      )}
    </div>
  );
}
