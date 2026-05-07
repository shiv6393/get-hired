import type { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  MapPin,
  PencilLine,
  Trash2,
  Users,
} from "lucide-react";

type JobCardMode = "PUBLIC" | "RECRUITER";

interface JobCardProps {
  job: Job;
  mode?: JobCardMode;
  onDelete?: () => void | Promise<void>;
}

export default function JobCard({
  job,
  mode = "PUBLIC",
  onDelete,
}: JobCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="h-full"
    >
      <div className="flex h-full flex-col rounded-[2rem] border border-white/60 bg-white/82 p-6 shadow-sm transition-shadow hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge className="rounded-full bg-sky-100 px-3 py-1 text-sky-700 dark:bg-sky-400/10 dark:text-sky-200">
              Active role
            </Badge>
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">{job.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
                  <Building2 size={14} />
                  {job.company}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
                  <MapPin size={14} />
                  {job.location}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-950 px-4 py-3 text-right text-white dark:bg-white dark:text-slate-950">
            <p className="text-xs uppercase tracking-[0.22em] opacity-70">
              Applicants
            </p>
            <p className="mt-1 inline-flex items-center gap-2 text-lg font-semibold">
              <Users size={15} />
              {job.applicantsCount}
            </p>
          </div>
        </div>

        <p className="mt-5 line-clamp-3 text-sm leading-7 text-muted-foreground">
          {job.description}
        </p>

        <div className="mt-auto pt-6">
          {mode === "PUBLIC" && (
            <Link to={`/jobs/${job.id}`}>
              <Button className="w-full rounded-2xl bg-[linear-gradient(135deg,#0ea5e9,#0284c7)] text-white">
                View Details
                <ArrowRight size={16} />
              </Button>
            </Link>
          )}

          {mode === "RECRUITER" && (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="w-full rounded-2xl"
                onClick={() => navigate(`/recruiter/jobs/${job.id}/edit`)}
              >
                <PencilLine size={15} />
                Edit
              </Button>

              <Button
                variant="destructive"
                className="w-full rounded-2xl"
                onClick={onDelete}
              >
                <Trash2 size={15} />
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
