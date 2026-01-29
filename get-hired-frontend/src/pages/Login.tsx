import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<"USER" | "RECRUITER" | "ADMIN">("USER");

  const handleLogin = () => {
    login(role);
    navigate("/");
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-10 space-y-6">
      <h1 className="text-xl font-semibold text-center">Login</h1>

      <Input placeholder="Email" />
      <Input placeholder="Password" type="password" />

      <select
        className="w-full border rounded-md px-3 py-2 text-sm"
        value={role}
        onChange={(e) => setRole(e.target.value as typeof role)}
      >
        <option value="USER">User</option>
        <option value="RECRUITER">Recruiter</option>
        <option value="ADMIN">Admin</option>
      </select>

      <Button onClick={handleLogin} className="w-full">
        Login
      </Button>
    </div>
  );
}
