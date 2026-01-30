import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Jobs from "@/pages/Jobs";
import JobDetails from "@/pages/JobDetails";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AppliedJobs from "@/pages/AppliedJobs";
import PostJob from "@/pages/PostJob";
import ProtectedRoute from "@/routes/ProtectedRoute";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import UserDashboard from "@/pages/user/UserDashboard";






export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/applied" element={<AppliedJobs />} />
      <Route
        path="/recruiter/post-job"
        element={
          <ProtectedRoute allowedRoles={["RECRUITER", "ADMIN"]}>
            <PostJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={["USER"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
