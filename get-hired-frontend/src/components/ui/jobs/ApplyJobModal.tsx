import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAppliedJobs } from "@/context/AppliedJobsContext";
import type{ Job } from "@/types/job";


interface ApplyJobModalProps {
  job: Job;
}

export default function ApplyJobModal({ job }: ApplyJobModalProps) {
  const { applyToJob, isApplied } = useAppliedJobs();
  const [coverLetter, setCoverLetter] = useState("");

  const applied = isApplied(job.id);

  const handleApply = () => {
    applyToJob(job);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={applied}>{applied ? "Applied" : "Apply Now"}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for {job.title}</DialogTitle>
        </DialogHeader>

        {!applied ? (
          <div className="space-y-4">
            <Textarea
              placeholder="Write a short cover letter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />

            <Button
              onClick={handleApply}
              disabled={!coverLetter.trim()}
              className="w-full"
            >
              Submit Application
            </Button>
          </div>
        ) : (
          <p className="text-green-600 text-sm">
            ✅ Application submitted successfully
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
