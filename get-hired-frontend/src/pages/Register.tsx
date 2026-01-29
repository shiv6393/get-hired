import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm mx-auto px-4 py-10 space-y-6">
      <h1 className="text-xl font-semibold text-center">Register</h1>

      <Input placeholder="Full Name" />
      <Input placeholder="Email" />
      <Input placeholder="Password" type="password" />

      <Button onClick={() => navigate("/login")} className="w-full">
        Create Account
      </Button>
    </div>
  );
}
