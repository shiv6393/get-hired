import { useJobs } from "@/context/JobsContext";
import { useAppliedJobs } from "@/context/AppliedJobsContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


export default function AdminDashboard() {
  const { jobs, deleteJob } = useJobs();

  const { appliedJobs } = useAppliedJobs();

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <Link to="/admin/users" className="text-sm font-medium text-blue-600">
        Manage Users →
      </Link>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border rounded-md p-4">
          <p className="text-sm text-muted-foreground">Total Jobs</p>
          <p className="text-2xl font-semibold">{jobs.length}</p>
        </div>

        <div className="border rounded-md p-4">
          <p className="text-sm text-muted-foreground">Applied Jobs</p>
          <p className="text-2xl font-semibold">{appliedJobs.length}</p>
        </div>

        <div className="border rounded-md p-4">
          <p className="text-sm text-muted-foreground">Admins</p>
          <p className="text-2xl font-semibold">1</p>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">All Jobs</h2>

        <div className="border rounded-md divide-y">
          {jobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between p-3">
              <div>
                <p className="font-medium">{job.title}</p>
                <p className="text-sm text-muted-foreground">
                  {job.company} • {job.location}
                </p>
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteJob(job.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
