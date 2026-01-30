import { useJobs } from "@/context/JobsContext";
import { useAppliedJobs } from "@/context/AppliedJobsContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AdminDashboard() {
  const { jobs, deleteJob } = useJobs();
  const { appliedJobs } = useAppliedJobs();

  const [open, setOpen] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <Link to="/admin/users" className="text-sm font-medium text-blue-600">
        Manage Users →
      </Link>

      {/* ================= STATS ================= */}
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

      {/* ================= JOBS TABLE ================= */}
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
                onClick={() => {
                  setJobIdToDelete(job.id);
                  setOpen(true);
                }}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Job</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this job?
            <br />
            This action cannot be undone.
          </p>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setJobIdToDelete(null);
              }}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={() => {
                if (jobIdToDelete) {
                  deleteJob(jobIdToDelete);
                }
                setOpen(false);
                setJobIdToDelete(null);
              }}
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
