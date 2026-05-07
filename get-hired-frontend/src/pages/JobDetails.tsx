import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import ApplyJobModal from "@/components/ui/jobs/ApplyJobModal";
import type { Job as JobDetailsType } from "@/types/job";
import { useEffect, useState } from "react";
import { jobsApi } from "@/services/jobsApi";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role } = useAuth();

  const [job, setJob] = useState<JobDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadJob = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await jobsApi.getById(id);
        setJob(res.data);
      } catch {
        setError("Unable to load job details");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-[2rem] border border-white/60 bg-white/75 p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-sm text-muted-foreground">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-[2rem] border border-red-200 bg-red-50/80 p-8 dark:border-red-400/20 dark:bg-red-400/10">
          <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4">
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          className="rounded-full px-0 text-muted-foreground hover:bg-transparent"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          Back
        </Button>
      </div>

      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-[linear-gradient(135deg,rgba(14,165,233,0.12),rgba(245,158,11,0.12),rgba(255,255,255,0.88))] p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(14,165,233,0.14),rgba(245,158,11,0.08),rgba(15,23,42,0.9))] sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="rounded-full bg-sky-600 px-4 py-1.5 text-white">
                Open Position
              </Badge>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-1.5 text-sm text-muted-foreground dark:border-white/10 dark:bg-white/5">
                <Sparkles size={14} className="text-amber-500" />
                Ready for applications
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                  <Building2 size={16} />
                  {job.company}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                  <MapPin size={16} />
                  {job.location}
                </span>
              </div>
            </div>

            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              {job.description}
            </p>
          </div>

          <div className="space-y-5">
            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Quick snapshot
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-2xl bg-sky-100 p-3 text-sky-700 dark:bg-sky-400/10 dark:text-sky-200">
                    <BriefcaseBusiness size={18} />
                  </span>
                  <div>
                    <p className="font-medium">Role</p>
                    <p className="text-sm text-muted-foreground">{job.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-2xl bg-amber-100 p-3 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200">
                    <Users size={18} />
                  </span>
                  <div>
                    <p className="font-medium">Applicants</p>
                    <p className="text-sm text-muted-foreground">
                      {job.applicantsCount} candidate
                      {job.applicantsCount === 1 ? "" : "s"} in pipeline
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-2xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                    <MapPin size={18} />
                  </span>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-slate-950 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)] dark:border-white/10">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-300">
                Your next step
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Move quickly while this role is active. If it fits your profile,
                send your resume and a short introduction now.
              </p>

              <div className="mt-6">
                {role === null && (
                  <Button
                    className="w-full rounded-2xl bg-white text-slate-950 hover:bg-slate-100"
                    onClick={() =>
                      navigate("/login", {
                        state: { redirectTo: `/jobs/${job.id}` },
                      })
                    }
                  >
                    Login to Apply
                  </Button>
                )}

                {role === "CANDIDATE" && <ApplyJobModal job={job} />}

                {(role === "RECRUITER" || role === "ADMIN") && (
                  <p className="text-sm text-slate-300">
                    Recruiters and admins can review this role, but only
                    candidates can apply.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-400/10" />
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "What stands out",
            text: "A clear role brief, visible hiring activity, and a focused application path.",
          },
          {
            title: "Why apply early",
            text: "The active applicant count suggests this role is already getting attention.",
          },
          {
            title: "Best preparation",
            text: "Tailor your resume and add a short cover note to improve context for recruiters.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
          >
            <h3 className="text-2xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {item.text}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
