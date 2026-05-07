import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/components/ui/common/ThemeProvider";
import {
  defaultCandidateSettings,
  loadCandidateSettings,
  saveCandidateSettings,
  type CandidateSettings,
} from "@/lib/candidateProfile";

export default function UserSettings() {
  const { role, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState<CandidateSettings>(defaultCandidateSettings);

  useEffect(() => {
    setSettings(loadCandidateSettings());
  }, []);

  if (role !== "CANDIDATE") {
    return <Navigate to="/" replace />;
  }

  const updateSetting =
    (field: keyof CandidateSettings) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSettings((prev) => ({ ...prev, [field]: event.target.checked }));
    };

  const handleSave = () => {
    saveCandidateSettings(settings);
    toast.success("Settings saved");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4">
      <section className="rounded-[2.5rem] border border-white/60 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(14,165,233,0.84))] p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.16)] dark:border-white/10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
          Settings
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Tune how the platform works for you.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-100/85">
          Control alerts, profile visibility, and your workspace theme from one
          place.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="space-y-4 rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-2xl font-semibold">Notifications</h2>

          <SettingRow
            title="Email updates"
            description="Receive account and activity updates by email."
            checked={settings.emailUpdates}
            onChange={updateSetting("emailUpdates")}
          />
          <SettingRow
            title="Shortlist alerts"
            description="Get notified when a recruiter moves your application forward."
            checked={settings.shortlistAlerts}
            onChange={updateSetting("shortlistAlerts")}
          />
          <SettingRow
            title="Weekly digest"
            description="Get a weekly recap of your search and recent activity."
            checked={settings.weeklyDigest}
            onChange={updateSetting("weeklyDigest")}
          />
          <SettingRow
            title="Public profile"
            description="Let recruiters discover your candidate profile more easily."
            checked={settings.publicProfile}
            onChange={updateSetting("publicProfile")}
          />

          <div className="flex justify-end pt-2">
            <Button
              onClick={handleSave}
              className="rounded-full bg-[linear-gradient(135deg,#0ea5e9,#0284c7)] text-white"
            >
              Save Settings
            </Button>
          </div>
        </section>

        <section className="space-y-5">
          <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <h3 className="text-xl font-semibold">Appearance</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Your current theme is <span className="font-medium">{theme}</span>.
            </p>
            <Button
              variant="outline"
              onClick={toggleTheme}
              className="mt-5 rounded-full"
            >
              Switch Theme
            </Button>
          </div>

          <div className="rounded-[2rem] border border-rose-200 bg-rose-50/80 p-6 shadow-sm dark:border-rose-400/20 dark:bg-rose-400/10">
            <h3 className="text-xl font-semibold text-rose-900 dark:text-rose-100">
              Account session
            </h3>
            <p className="mt-2 text-sm leading-7 text-rose-800/80 dark:text-rose-100/80">
              If you are on a shared device, you can end your session here.
            </p>
            <Button
              variant="destructive"
              onClick={logout}
              className="mt-5 rounded-full"
            >
              Logout
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

function SettingRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="flex items-start justify-between gap-4 rounded-[1.5rem] border border-white/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-1 size-4 accent-sky-600"
      />
    </label>
  );
}
