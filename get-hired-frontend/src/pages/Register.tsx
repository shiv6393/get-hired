import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type Role = "CANDIDATE" | "RECRUITER";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState<Role>("CANDIDATE");

  const handleRegister = () => {
    // 🔐 TEMP token (replace when backend register API is ready)
    const fakeToken = "mock-jwt-token";

    login(role, fakeToken);
    navigate("/");
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-10 space-y-6">
      <h1 className="text-xl font-semibold text-center">Register</h1>

      <Input placeholder="Full Name" />
      <Input placeholder="Email" />
      <Input placeholder="Password" type="password" />

      {/* Role Selection */}
      <select
        className="w-full border rounded-md px-3 py-2 text-sm"
        value={role}
        onChange={(e) => setRole(e.target.value as Role)}
      >
        <option value="CANDIDATE">User</option>
        <option value="RECRUITER">Recruiter</option>
      </select>

      <Button onClick={handleRegister} className="w-full">
        Create Account
      </Button>

      <p className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <button
          className="text-blue-600 hover:underline"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </p>
    </div>
  );
}
