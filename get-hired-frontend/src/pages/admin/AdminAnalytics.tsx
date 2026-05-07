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

  const jobsByLocation = Object.entries(
    jobs.reduce<Record<string, number>>((acc, job) => {
      const key = job.location?.trim() || "Unspecified";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-80 rounded-md border p-4">
          <p className="mb-2 text-sm font-medium">Top Job Locations</p>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={jobsByLocation}>
              <XAxis dataKey="location" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-80 rounded-md border p-4">
          <p className="mb-2 text-sm font-medium">Applied Jobs Trend</p>

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
