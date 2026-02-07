import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { recruiterApi } from "@/services/recruiterApi";
import { jobsApi } from "@/services/jobsApi";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function EditJob() {
  const { jobId } = useParams<{ jobId: string }>();
  const { role } = useAuth();
  const navigate = useNavigate();

  if (role !== "RECRUITER") {
    return <Navigate to="/" replace />;
  }

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });

  // 🔹 Load job details
  useEffect(() => {
    if (!jobId) return;

    jobsApi.getById(jobId).then((res) => {
      setForm({
        title: res.data.title,
        description: res.data.description,
        location: res.data.location,
        salary: res.data.salary ?? "",
      });
      setLoading(false);
    });
  }, [jobId]);

  const handleSubmit = async () => {
    try {
      setSaving(true);

      await recruiterApi.updateJob(jobId!, {
        title: form.title,
        description: form.description,
        location: form.location,
        salary: Number(form.salary),
      });

      toast.success("Job updated successfully");
      navigate("/recruiter/dashboard");
    } catch {
      toast.error("Failed to update job");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading job...</p>;
  }

  return (
    <div className="max-w-xl mx-auto px-4 space-y-6">
      <h1 className="text-xl font-semibold">Edit Job</h1>

      <Input
        placeholder="Job Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <Textarea
        placeholder="Job Description"
        rows={4}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <Input
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      <Input
        type="number"
        placeholder="Salary"
        value={form.salary}
        onChange={(e) => setForm({ ...form, salary: e.target.value })}
      />

      <Button onClick={handleSubmit} disabled={saving} className="w-full">
        {saving ? "Saving..." : "Update Job"}
      </Button>
    </div>
  );
}
