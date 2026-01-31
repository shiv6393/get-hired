import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { applicationsApi } from "@/services/applicationsApi";
import { toast } from "sonner";
import type { Job } from "@/types/job";

interface Props {
  job: Job;
}

export default function ApplyJobModal({ job }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<string>("");

  const handleApply = async (): Promise<void> => {
    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    try {
      setLoading(true);

      const formData: FormData = new FormData();
      formData.append("jobId", job.id.toString());
      formData.append("resume", resumeFile);
      formData.append("coverLetter", coverLetter);

      await applicationsApi.apply(formData);

      toast.success("Applied successfully");
      setOpen(false);

      setResumeFile(null);
      setCoverLetter("");
    } catch (error: unknown) {
      console.error("Apply failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] ?? null;
    setResumeFile(file);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Apply Now</Button>

      <Dialog
        open={open}
        onOpenChange={(value: boolean) => {
          if (!loading) setOpen(value);
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Apply for {job.title}</DialogTitle>
            <DialogDescription>
              Submit your resume and cover letter to apply at {job.company}.
            </DialogDescription>
          </DialogHeader>

          {/* Resume Upload */}
          <div className="space-y-2 mt-4">
            <label className="text-sm font-medium">Resume *</label>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              disabled={loading}
            />
            {resumeFile && (
              <p className="text-xs text-muted-foreground">
                Selected: {resumeFile.name}
              </p>
            )}
          </div>

          {/* Cover Letter */}
          <div className="space-y-2 mt-4">
            <label className="text-sm font-medium">Cover Letter</label>
            <Textarea
              value={coverLetter}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setCoverLetter(e.target.value)
              }
              placeholder="Write a short cover letter (optional)"
              rows={4}
              disabled={loading}
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
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
