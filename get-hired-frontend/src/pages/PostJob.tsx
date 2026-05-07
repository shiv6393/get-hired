import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { recruiterApi } from "@/services/recruiterApi";
import { useAuth } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function PostJob() {
  const { role } = useAuth();
  const navigate = useNavigate();

  // 🔐 Only recruiters allowed
  if (role !== "RECRUITER") {
    return <Navigate to="/" replace />;
  }

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });

  const handleSubmit = async () => {
    const title = form.title.trim();
    const description = form.description.trim();
    const location = form.location.trim();

    if (!title || !description || !location) {
      toast.error("Please fill all required fields");
      return;
    }

    if (title.length < 3) {
      toast.error("Job title must be at least 3 characters");
      return;
    }

    if (description.length < 10) {
      toast.error("Job description must be at least 10 characters");
      return;
    }

    try {
      setLoading(true);
      const salary = form.salary.trim() === "" ? undefined : Number(form.salary);

      if (salary !== undefined && Number.isNaN(salary)) {
        toast.error("Salary must be a valid number");
        return;
      }

      await recruiterApi.createJob({
        title,
        description,
        location,
        salary,
      });

      toast.success("Job posted successfully");
      navigate("/recruiter/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 space-y-6">
      <h1 className="text-xl font-semibold">Post a Job</h1>

      <Input
        placeholder="Job Title *"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <Textarea
        placeholder="Job Description *"
        rows={4}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <Input
        placeholder="Location *"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      <Input
        type="number"
        placeholder="Salary (optional)"
        value={form.salary}
        onChange={(e) => setForm({ ...form, salary: e.target.value })}
      />

      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading ? "Posting..." : "Post Job"}
      </Button>
    </div>
  );
}
