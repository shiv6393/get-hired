import { useAppliedJobs } from "@/context/AppliedJobsContext";
import { useAuth } from "@/context/AuthContext";
import { Link, Navigate } from "react-router-dom";

export default function UserDashboard() {
  const { appliedJobs, loading } = useAppliedJobs();
  const { role } = useAuth();

  // 🔐 Role protection
  if (role !== "CANDIDATE") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <h1 className="text-2xl font-bold">Candidate Dashboard</h1>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border rounded-md p-4">
          <p className="text-sm text-muted-foreground">Applied Jobs</p>

          {loading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <p className="text-2xl font-semibold">{appliedJobs.length}</p>
          )}
        </div>

        <div className="border rounded-md p-4">
          <p className="text-sm text-muted-foreground">Saved Jobs</p>
          <p className="text-2xl font-semibold">0</p>
        </div>

        <div className="border rounded-md p-4">
          <p className="text-sm text-muted-foreground">Profile Status</p>
          <p className="text-2xl font-semibold">Complete</p>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="flex gap-4">
        <Link to="/jobs" className="text-blue-600 font-medium">
          Browse Jobs →
        </Link>

        <Link to="/applied" className="text-blue-600 font-medium">
          View Applied Jobs →
        </Link>
      </div>
    </div>
  );
}
