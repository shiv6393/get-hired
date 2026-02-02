import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useJobs } from "@/context/JobsContext";
import type { Job } from "@/types/job";

export default function PostJob() {
  const { addJob } = useJobs();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time" as Job["type"],
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // ✅ DO NOT create ID here
      await addJob(form);

      // ✅ Reset form after success
      setForm({
        title: "",
        company: "",
        location: "",
        type: "Full-time",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 space-y-6">
      <h1 className="text-xl font-semibold">Post a Job</h1>

      <Input
        placeholder="Job Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <Input
        placeholder="Company Name"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />

      <Input
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      <select
        className="w-full border rounded-md px-3 py-2 text-sm"
        value={form.type}
        onChange={(e) =>
          setForm({ ...form, type: e.target.value as Job["type"] })
        }
      >
        <option>Full-time</option>
        <option>Part-time</option>
        <option>Internship</option>
      </select>

      <Button
        onClick={handleSubmit}
        disabled={loading || !form.title || !form.company}
        className="w-full"
      >
        {loading ? "Posting..." : "Post Job"}
      </Button>
    </div>
  );
}
