import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/services/authApi";
import { toast } from "sonner";
import AuthShell from "@/components/ui/common/AuthShell";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await authApi.login(email, password);

      login(res.data.role, res.data.token);

      toast.success("Logged in successfully");
      navigate("/");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to log in right now",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 py-4 sm:py-8">
      <AuthShell
        eyebrow="Welcome back"
        title="Sign in to continue"
        description="Access your dashboard, applications, and hiring workspace."
        sideTitle="Pick up where your search left off."
        sideText="Your jobs, applicants, and progress are waiting behind a cleaner, more focused sign-in experience."
        accent="linear-gradient(135deg, rgba(14,165,233,0.3), rgba(15,23,42,0.25))"
      >
        <div className="space-y-4">
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

          <Button
            onClick={handleLogin}
            className="h-12 w-full rounded-2xl bg-[linear-gradient(135deg,#0f172a,#0ea5e9)] text-white shadow-lg shadow-slate-900/10 dark:bg-[linear-gradient(135deg,#f59e0b,#0ea5e9)]"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </AuthShell>
    </div>
  );
}
