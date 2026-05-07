import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/services/authApi";
import { toast } from "sonner";
import AuthShell from "@/components/ui/common/AuthShell";

type Role = "CANDIDATE" | "RECRUITER";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("CANDIDATE");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    if (role === "RECRUITER" && !companyName.trim()) {
      toast.error("Company name is required for recruiter registration");
      return;
    }

    try {
      setLoading(true);

      await authApi.register(
        email,
        password,
        role,
        role === "RECRUITER" ? companyName : undefined,
        fullName || undefined
      );

      toast.success("Account created. Please login.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 py-4 sm:py-8">
      <AuthShell
        eyebrow="Create account"
        title="Start your GetHired profile"
        description="Join as a candidate or recruiter and get your workflow ready in a few seconds."
        sideTitle="A better-looking front door for hiring."
        sideText="We refreshed this experience to feel calmer, sharper, and more premium while keeping your existing flow intact."
        accent="linear-gradient(135deg, rgba(14,165,233,0.35), rgba(245,158,11,0.28))"
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setRole("CANDIDATE")}
              className={`rounded-3xl border p-4 text-left transition ${
                role === "CANDIDATE"
                  ? "border-sky-400 bg-sky-50 shadow-sm dark:border-sky-300 dark:bg-sky-400/10"
                  : "border-border bg-background/60 hover:border-sky-200 dark:bg-white/5"
              }`}
            >
              <p className="font-semibold">Candidate</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Apply, track, and manage your next move.
              </p>
            </button>
            <button
              type="button"
              onClick={() => setRole("RECRUITER")}
              className={`rounded-3xl border p-4 text-left transition ${
                role === "RECRUITER"
                  ? "border-amber-400 bg-amber-50 shadow-sm dark:border-amber-300 dark:bg-amber-400/10"
                  : "border-border bg-background/60 hover:border-amber-200 dark:bg-white/5"
              }`}
            >
              <p className="font-semibold">Recruiter</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Post openings and review applicants faster.
              </p>
            </button>
          </div>

          <Input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-12 rounded-2xl bg-white/75 dark:bg-white/5"
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-2xl bg-white/75 dark:bg-white/5"
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-2xl bg-white/75 dark:bg-white/5"
          />

          {role === "RECRUITER" && (
            <Input
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="h-12 rounded-2xl bg-white/75 dark:bg-white/5"
            />
          )}

          <Button
            onClick={handleRegister}
            className="h-12 w-full rounded-2xl bg-[linear-gradient(135deg,#0ea5e9,#f59e0b)] text-white shadow-lg shadow-sky-500/20"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              className="font-semibold text-sky-700 hover:underline dark:text-sky-300"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>
        </div>
      </AuthShell>
    </div>
  );
}
