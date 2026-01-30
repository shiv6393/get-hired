import { useJobs } from "@/context/JobsContext";
import { useAppliedJobs } from "@/context/AppliedJobsContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";


export default function AdminAnalytics() {
  const { jobs } = useJobs();
  const { appliedJobs } = useAppliedJobs();

  // 📊 Jobs by type
  const jobTypeData = [
    {
      type: "Full-time",
      count: jobs.filter((j) => j.type === "Full-time").length,
    },
    {
      type: "Part-time",
      count: jobs.filter((j) => j.type === "Part-time").length,
    },
    {
      type: "Internship",
      count: jobs.filter((j) => j.type === "Internship").length,
    },
  ];

  // 📈 Applied jobs trend (mock timeline)
  const appliedTrend = [
    { day: "Mon", count: appliedJobs.length },
    { day: "Tue", count: appliedJobs.length },
    { day: "Wed", count: appliedJobs.length },
    { day: "Thu", count: appliedJobs.length },
    { day: "Fri", count: appliedJobs.length },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Jobs by Type */}
        <div className="border rounded-md p-4 h-80">
          <p className="text-sm font-medium mb-2">Jobs by Type</p>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={jobTypeData}>
              <XAxis dataKey="type" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Applied Jobs Trend */}
        <div className="border rounded-md p-4 h-80">
          <p className="text-sm font-medium mb-2">Applied Jobs Trend</p>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={appliedTrend}>
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line dataKey="count" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
