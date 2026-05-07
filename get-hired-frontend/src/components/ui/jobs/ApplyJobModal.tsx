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
import { FileText, Send } from "lucide-react";
import { useState } from "react";
import { applicationsApi } from "@/services/applicationsApi";
import { toast } from "sonner";
import type { Job } from "@/types/job";

interface Props {
  job: Job;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ApplyJobModal({ job }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");

  const handleApply = async () => {
    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    if (resumeFile.size > MAX_FILE_SIZE) {
      toast.error("Resume must be smaller than 5MB");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("jobId", job.id);
      formData.append("resume", resumeFile);
      formData.append("coverLetter", coverLetter);

      await applicationsApi.apply(formData);

      toast.success("Applied successfully");
      setOpen(false);
      setResumeFile(null);
      setCoverLetter("");
    } catch (error: any) {
      if (error?.response?.status === 409) {
        toast.error("You have already applied for this job");
      } else {
        toast.error("Failed to apply. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResumeFile(file);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl bg-[linear-gradient(135deg,#0ea5e9,#f59e0b)] text-white shadow-lg shadow-sky-500/20"
      >
        <Send size={16} />
        Apply Now
      </Button>

      <Dialog open={open} onOpenChange={(v) => !loading && setOpen(v)}>
        <DialogContent className="overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96))] p-0 shadow-[0_30px_80px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.98),rgba(2,6,23,0.98))] sm:max-w-xl">
          <div className="border-b border-border/60 px-6 py-5">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                Apply for {job.title}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm leading-6 text-muted-foreground">
                Submit your resume and a short note for {job.company}. Keep it
                clear, relevant, and easy to review.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-5 px-6 py-6">
            <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                <FileText size={16} />
                Resume
              </label>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                disabled={loading}
                className="h-11 rounded-2xl bg-white/75 dark:bg-white/5"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                PDF, DOC, or DOCX. Max size 5MB.
              </p>
              {resumeFile && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Selected: {resumeFile.name}
                </p>
              )}
            </div>

            <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
              <label className="mb-2 block text-sm font-medium">
                Cover Letter
              </label>
              <Textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write a short cover letter (optional)"
                rows={5}
                disabled={loading}
                className="rounded-2xl bg-white/75 dark:bg-white/5"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="rounded-2xl"
              >
                Cancel
              </Button>

              <Button
                onClick={handleApply}
                disabled={loading}
                className="rounded-2xl bg-[linear-gradient(135deg,#0ea5e9,#0284c7)] text-white"
              >
                {loading ? "Applying..." : "Confirm Apply"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
