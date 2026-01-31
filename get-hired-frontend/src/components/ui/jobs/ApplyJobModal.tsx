import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useState } from "react";
import { jobsApi } from "@/services/jobsApi";
import { toast } from "sonner";
import type{ Job } from "@/types/job";

interface Props {
  job: Job;
}

export default function ApplyJobModal({ job }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    try {
      setLoading(true);
      await jobsApi.applyJob(job.id);
      toast.success("Applied successfully");
      setOpen(false);
    } catch {
      // error toast handled globally by axios interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Apply Now</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {job.title}</DialogTitle>

            <DialogDescription>
              You are about to apply for this job at {job.company}. Please
              confirm to continue.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleApply} disabled={loading}>
              {loading ? "Applying..." : "Confirm Apply"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
