import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import {
  defaultCandidateProfile,
  getProfileCompletion,
  loadCandidateProfile,
  saveCandidateProfile,
  type CandidateProfile,
} from "@/lib/candidateProfile";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

export default function UserProfile() {
  const { role } = useAuth();
  const [profile, setProfile] = useState<CandidateProfile>(defaultCandidateProfile);

  useEffect(() => {
    setProfile(loadCandidateProfile());
  }, []);

  if (role !== "CANDIDATE") {
    return <Navigate to="/" replace />;
  }

  const completion = getProfileCompletion(profile);

  const handleChange =
    (field: keyof CandidateProfile) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProfile((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveCandidateProfile(profile);
    toast.success("Profile updated");
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Profile image must be smaller than 2MB");
      event.target.value = "";
      return;
    }

    const dataUrl = await readFileAsDataUrl(file);
    setProfile((prev) => ({ ...prev, imageUrl: dataUrl }));
    event.target.value = "";
  };

  const clearImage = () => {
    setProfile((prev) => ({ ...prev, imageUrl: "" }));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4">
      <section className="rounded-[2.5rem] border border-white/60 bg-[linear-gradient(135deg,rgba(14,165,233,0.12),rgba(16,185,129,0.1),rgba(255,255,255,0.92))] p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(14,165,233,0.12),rgba(16,185,129,0.08),rgba(15,23,42,0.9))]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          Profile
        </p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight">
              Shape the candidate profile recruiters should remember.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              Keep your basics, links, and personal summary ready so each application
              carries stronger context.
            </p>
          </div>

          <div className="min-w-56 rounded-[1.75rem] border border-white/70 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-sm text-muted-foreground">Profile completion</p>
            <p className="mt-2 text-3xl font-semibold">{completion}%</p>
            <div className="mt-4 h-2 rounded-full bg-slate-200 dark:bg-white/10">
              <div
                className="h-2 rounded-full bg-[linear-gradient(135deg,#0ea5e9,#10b981)]"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="space-y-6 rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="rounded-[1.75rem] border border-dashed border-sky-200 bg-sky-50/70 p-5 dark:border-sky-400/20 dark:bg-sky-400/10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-24 items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
                  {profile.imageUrl ? (
                    <img
                      src={profile.imageUrl}
                      alt="Candidate profile"
                      className="size-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      No photo
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Profile image</p>
                  <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                    Add a clear headshot so recruiters can recognize your profile
                    faster.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <span className="inline-flex h-9 cursor-pointer items-center rounded-full bg-[linear-gradient(135deg,#0ea5e9,#0284c7)] px-4 text-sm font-medium text-white shadow-lg shadow-sky-500/20">
                    Upload image
                  </span>
                </label>
                {profile.imageUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full"
                    onClick={clearImage}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Full name</span>
              <Input
                value={profile.fullName}
                onChange={handleChange("fullName")}
                placeholder="Aarav Mehta"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Professional headline</span>
              <Input
                value={profile.headline}
                onChange={handleChange("headline")}
                placeholder="Frontend developer focused on product UX"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Location</span>
              <Input
                value={profile.location}
                onChange={handleChange("location")}
                placeholder="Bengaluru"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Phone</span>
              <Input
                value={profile.phone}
                onChange={handleChange("phone")}
                placeholder="+91 98XXXXXXX"
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium">Short bio</span>
            <Textarea
              value={profile.bio}
              onChange={handleChange("bio")}
              placeholder="A short summary recruiters can scan quickly."
              className="min-h-28"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Core skills</span>
            <Textarea
              value={profile.skills}
              onChange={handleChange("skills")}
              placeholder="React, TypeScript, Java, Spring Boot, SQL"
              className="min-h-24"
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Portfolio URL</span>
              <Input
                value={profile.portfolioUrl}
                onChange={handleChange("portfolioUrl")}
                placeholder="https://portfolio.example.com"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">LinkedIn URL</span>
              <Input
                value={profile.linkedinUrl}
                onChange={handleChange("linkedinUrl")}
                placeholder="https://linkedin.com/in/your-name"
              />
            </label>
          </div>

          <div className="flex justify-end">
            <Button className="rounded-full bg-[linear-gradient(135deg,#0ea5e9,#0284c7)] text-white">
              Save Profile
            </Button>
          </div>
        </div>

        <aside className="space-y-5 rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div>
            <h2 className="text-xl font-semibold">Profile checklist</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Finishing these sections makes your applications easier to review.
            </p>
          </div>

          {[
            ["Profile image", profile.imageUrl],
            ["Full name", profile.fullName],
            ["Headline", profile.headline],
            ["Location", profile.location],
            ["Phone", profile.phone],
            ["Bio", profile.bio],
            ["Skills", profile.skills],
            ["Portfolio", profile.portfolioUrl],
            ["LinkedIn", profile.linkedinUrl],
          ].map(([label, value]) => {
            const done = value.trim().length > 0;

            return (
              <div
                key={label}
                className="flex items-center justify-between rounded-[1.25rem] border border-white/70 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/5"
              >
                <span className="text-sm font-medium">{label}</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    done
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {done ? "Done" : "Pending"}
                </span>
              </div>
            );
          })}
        </aside>
      </form>
    </div>
  );
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
