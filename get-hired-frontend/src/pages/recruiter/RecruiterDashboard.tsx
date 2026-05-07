import { useEffect, useMemo, useState } from "react";
import {
  downloadRecruiterAsset,
  recruiterApi,
  type RecruiterApplication,
} from "@/services/recruiterApi";
import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  FileText,
  MapPin,
  Plus,
  Trash2,
  Users,
} from "lucide-react";

interface RecruiterJob {
  id: string;
  title: string;
  company: string;
  location: string;
  applicantsCount: number;
}

export default function RecruiterDashboard() {
  const { role } = useAuth();

  const [jobs, setJobs] = useState<RecruiterJob[]>([]);
  const [applications, setApplications] = useState<RecruiterApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  if (role !== "RECRUITER") {
    return <Navigate to="/" replace />;
  }

  const fetchJobs = async (pageNumber = 0) => {
    try {
      setLoading(true);
      setError(null);

      const [jobsRes, applicationsRes] = await Promise.all([
        recruiterApi.getMyJobs(pageNumber, "createdAt", "desc"),
        recruiterApi.getApplications(),
      ]);

      setJobs(jobsRes.data.content);
      setPage(jobsRes.data.number);
      setTotalPages(jobsRes.data.totalPages);
      setApplications(applicationsRes.data);
    } catch {
      setError("Failed to load recruiter jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(0);
  }, []);

  const totalApplicants = useMemo(
    () => jobs.reduce((sum, job) => sum + job.applicantsCount, 0),
    [jobs],
  );

  const handleDelete = async (jobId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?",
    );
    if (!confirmed) return;

    try {
      await recruiterApi.deleteJob(jobId);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
      setApplications((prev) =>
        prev.filter((application) => application.jobId !== jobId),
      );
      toast.success("Job deleted successfully");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          "Cannot delete job with existing applicants",
      );
    }
  };

  const handleResumeDownload = async (
    resumeUrl: string,
    candidateEmail: string,
  ) => {
    try {
      await downloadRecruiterAsset(resumeUrl, `${candidateEmail}-resume`);
    } catch {
      toast.error("Failed to download resume");
    }
  };

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-white/60 bg-white/75 p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
        <p className="text-sm text-muted-foreground">
          Loading recruiter dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[2rem] border border-red-200 bg-red-50/80 p-8 dark:border-red-400/20 dark:bg-red-400/10">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-[linear-gradient(135deg,rgba(14,165,233,0.12),rgba(245,158,11,0.12),rgba(255,255,255,0.88))] p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(14,165,233,0.14),rgba(245,158,11,0.08),rgba(15,23,42,0.9))] sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Recruiter dashboard
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Keep your hiring pipeline focused and moving.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Track open roles, review applicant momentum, and jump back into the
              jobs that need your attention.
            </p>
          </div>

          <Link to="/recruiter/post-job">
            <Button className="rounded-full bg-[linear-gradient(135deg,#0ea5e9,#0284c7)] px-6 text-white shadow-lg shadow-sky-500/20">
              <Plus size={16} />
              Post New Job
            </Button>
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              label: "Active job posts",
              value: jobs.length,
              icon: BriefcaseBusiness,
            },
            {
              label: "Applicants in view",
              value: totalApplicants,
              icon: Users,
            },
            {
              label: "Current page",
              value: totalPages === 0 ? 0 : page + 1,
              icon: Building2,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <span className="mb-4 inline-flex rounded-2xl bg-slate-950 p-3 text-white dark:bg-white dark:text-slate-950">
                <item.icon size={18} />
              </span>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-400/10" />
      </section>

      {jobs.length === 0 ? (
        <section className="rounded-[2rem] border border-white/60 bg-white/80 p-8 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-2xl font-semibold">No jobs posted yet</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            Start with your first role and turn this space into a live recruiting
            workspace.
          </p>
          <Link to="/recruiter/post-job" className="mt-6 inline-flex">
            <Button className="rounded-full bg-[linear-gradient(135deg,#0ea5e9,#f59e0b)] text-white">
              <Plus size={16} />
              Create First Job
            </Button>
          </Link>
        </section>
      ) : (
        <>
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Application inbox</h2>
                <p className="text-sm text-muted-foreground">
                  A recruiter-ready view of the latest candidates across all your roles.
                </p>
              </div>
            </div>

            {applications.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-white/60 bg-white/70 p-6 text-sm text-muted-foreground dark:border-white/10 dark:bg-white/5">
                New applications will appear here once candidates start applying.
              </div>
            ) : (
              <div className="grid gap-4">
                {applications.slice(0, 6).map((application) => (
                  <div
                    key={application.id}
                    className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-3">
                        <div>
                          <p className="text-lg font-semibold">
                            {application.candidateEmail}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                              <BriefcaseBusiness size={15} />
                              {application.jobTitle}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                              <Users size={15} />
                              {application.status}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                              <FileText size={15} />
                              {new Date(application.appliedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="rounded-[1.5rem] border border-white/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                            Candidate note
                          </p>
                          <p className="mt-3 text-sm leading-7 text-foreground/90">
                            {application.coverLetter?.trim() ||
                              "No cover letter provided by the candidate."}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full"
                          onClick={() =>
                            handleResumeDownload(
                              application.resumeUrl,
                              application.candidateEmail,
                            )
                          }
                        >
                          Resume
                        </Button>

                        <Link to={`/recruiter/jobs/${application.jobId}/applicants`}>
                          <Button size="sm" className="rounded-full">
                            View details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Your live job posts</h2>
                <p className="text-sm text-muted-foreground">
                  Review listings, check applicant counts, and update roles fast.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-sm transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-4">
                      <div>
                        <p className="text-2xl font-semibold">{job.title}</p>
                        <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                            <Building2 size={15} />
                            {job.company}
                          </span>
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                            <MapPin size={15} />
                            {job.location}
                          </span>
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                            <Users size={15} />
                            {job.applicantsCount} applicant
                            {job.applicantsCount === 1 ? "" : "s"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link to={`/recruiter/jobs/${job.id}/applicants`}>
                        <Button size="sm" variant="outline" className="rounded-full">
                          Applicants
                          <ArrowRight size={14} />
                        </Button>
                      </Link>

                      <Link to={`/recruiter/jobs/${job.id}/edit`}>
                        <Button size="sm" className="rounded-full">
                          Edit
                        </Button>
                      </Link>

                      <Button
                        size="sm"
                        variant="destructive"
                        className="rounded-full"
                        onClick={() => handleDelete(job.id)}
                      >
                        <Trash2 size={14} />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-center gap-3 pt-2">
            <Button
              variant="outline"
              className="rounded-full"
              disabled={page === 0}
              onClick={() => fetchJobs(page - 1)}
            >
              Previous
            </Button>

            <Button
              variant="outline"
              className="rounded-full"
              disabled={page + 1 === totalPages}
              onClick={() => fetchJobs(page + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
