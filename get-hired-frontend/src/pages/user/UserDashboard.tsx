import { useEffect } from "react";
import { useAppliedJobs } from "@/context/AppliedJobsContext";
import { useAuth } from "@/context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Clock3 } from "lucide-react";
import {
  getProfileCompletion,
  loadCandidateProfile,
} from "@/lib/candidateProfile";

const statusStyles = {
  APPLIED: "bg-sky-100 text-sky-800",
  SHORTLISTED: "bg-emerald-100 text-emerald-800",
  REJECTED: "bg-rose-100 text-rose-800",
} as const;

const formatStatus = (status: keyof typeof statusStyles) =>
  status.charAt(0) + status.slice(1).toLowerCase();

export default function UserDashboard() {
  const { appliedJobs, loading, fetchAppliedJobs } = useAppliedJobs();
  const { role } = useAuth();

  useEffect(() => {
    if (role === "CANDIDATE") {
      fetchAppliedJobs();
    }
  }, [fetchAppliedJobs, role]);

  if (role !== "CANDIDATE") {
    return <Navigate to="/" replace />;
  }

  const recentApplications = appliedJobs.slice(0, 3);
  const profileCompletion = getProfileCompletion(loadCandidateProfile());

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-[linear-gradient(135deg,rgba(14,165,233,0.1),rgba(16,185,129,0.1),rgba(255,255,255,0.9))] p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(14,165,233,0.12),rgba(16,185,129,0.08),rgba(15,23,42,0.92))] sm:p-10">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Candidate dashboard
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Keep your job search organized and moving.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            See your activity at a glance, revisit recent applications, and jump
            back into opportunities that matter.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <span className="mb-4 inline-flex rounded-2xl bg-slate-950 p-3 text-white dark:bg-white dark:text-slate-950">
              <BriefcaseBusiness size={18} />
            </span>
            <p className="text-sm text-muted-foreground">Applied jobs</p>
            <p className="mt-2 text-3xl font-semibold">
              {loading ? "..." : appliedJobs.length}
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <span className="mb-4 inline-flex rounded-2xl bg-slate-950 p-3 text-white dark:bg-white dark:text-slate-950">
              <Clock3 size={18} />
            </span>
            <p className="text-sm text-muted-foreground">Latest activity</p>
            <p className="mt-2 text-3xl font-semibold">
              {loading || appliedJobs.length === 0 ? "0" : "Recent"}
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <span className="mb-4 inline-flex rounded-2xl bg-slate-950 p-3 text-white dark:bg-white dark:text-slate-950">
              <BadgeCheck size={18} />
            </span>
            <p className="text-sm text-muted-foreground">Profile status</p>
            <p className="mt-2 text-3xl font-semibold">{profileCompletion}%</p>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-400/10" />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Recent applications</h2>
              <p className="text-sm text-muted-foreground">
                A quick view of the roles you have already moved on.
              </p>
            </div>
            <Link
              to="/applied"
              className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 dark:text-sky-300"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading applications...</p>
            ) : recentApplications.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-border p-6 text-sm text-muted-foreground">
                You have not applied to any jobs yet.
              </div>
            ) : (
              recentApplications.map((job) => (
                <div
                  key={job.applicationId}
                  className="rounded-[1.5rem] border border-white/70 bg-white/75 p-5 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{job.jobTitle}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {job.company}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[job.status]}`}
                    >
                      {formatStatus(job.status)}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Applied on {new Date(job.appliedAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/60 bg-slate-950 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)] dark:border-white/10">
            <h2 className="text-2xl font-semibold">What next?</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Keep your momentum high by exploring new roles and reviewing your
              active applications regularly.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Link to="/jobs">
                <div className="flex items-center justify-between rounded-[1.5rem] bg-white/10 px-4 py-4 transition hover:bg-white/15">
                  <span>Browse fresh jobs</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
              <Link to="/applied">
                <div className="flex items-center justify-between rounded-[1.5rem] bg-white/10 px-4 py-4 transition hover:bg-white/15">
                  <span>Review applied jobs</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
              <Link to="/user/profile">
                <div className="flex items-center justify-between rounded-[1.5rem] bg-white/10 px-4 py-4 transition hover:bg-white/15">
                  <span>Update profile</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
              <Link to="/user/settings">
                <div className="flex items-center justify-between rounded-[1.5rem] bg-white/10 px-4 py-4 transition hover:bg-white/15">
                  <span>Open settings</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <h3 className="text-xl font-semibold">Search rhythm</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Aim to check back often, tailor resumes by role, and keep your
              application history clean and easy to track.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
