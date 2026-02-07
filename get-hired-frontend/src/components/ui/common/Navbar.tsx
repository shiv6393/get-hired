import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const { role, logout } = useAuth();

  const handleLogout = () => {
    // 🔐 clear backend auth token
    localStorage.removeItem("token");
    // 🔐 clear frontend role
    logout();
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="
        sticky top-0 z-50
        backdrop-blur-xl
        bg-white/70 dark:bg-gray-900/80
        border-b border-gray-200 dark:border-gray-800
      "
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* ================= LOGO ================= */}
        <Link
          to="/"
          className="text-xl font-semibold text-gray-900 dark:text-white"
        >
          GetHired
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/jobs" className={navLink}>
            Jobs
          </Link>

          {/* ================= CANDIDATE ================= */}
          {role === "CANDIDATE" && (
            <>
              <Link to="/applied" className={navLink}>
                Applied Jobs
              </Link>
              <Link to="/user" className={navLink}>
                Dashboard
              </Link>
            </>
          )}

          {/* ================= RECRUITER ================= */}
          {role === "RECRUITER" && (
            <>
              <Link to="/recruiter/post-job">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Post Job
                </Button>
              </Link>
              <Link to="/recruiter/dashboard" className={navLink}>
                Recruiter Dashboard
              </Link>
            </>
          )}

          {/* ================= ADMIN ================= */}
          {role === "ADMIN" && (
            <Link to="/admin" className="text-sm font-medium text-red-600">
              Admin
            </Link>
          )}

          {/* ================= THEME TOGGLE ================= */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </Button>

          {/* ================= AUTH ================= */}
          {role ? (
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden px-4 py-4 space-y-3 bg-white dark:bg-gray-900"
          >
            <Link to="/jobs" onClick={() => setOpen(false)}>
              Jobs
            </Link>

            {/* ================= CANDIDATE ================= */}
            {role === "CANDIDATE" && (
              <>
                <Link to="/applied" onClick={() => setOpen(false)}>
                  Applied Jobs
                </Link>
                <Link to="/user" onClick={() => setOpen(false)}>
                  Dashboard
                </Link>
              </>
            )}

            {/* ================= RECRUITER ================= */}
            {role === "RECRUITER" && (
              <>
                <Link
                  to="/recruiter/post-job"
                  onClick={() => setOpen(false)}
                  className="font-semibold text-blue-600"
                >
                  Post Job
                </Link>
                <Link to="/recruiter/dashboard" onClick={() => setOpen(false)}>
                  Recruiter Dashboard
                </Link>
              </>
            )}

            {/* ================= ADMIN ================= */}
            {role === "ADMIN" && (
              <Link to="/admin" className="text-red-600">
                Admin
              </Link>
            )}

            <Button variant="ghost" onClick={toggleTheme} className="w-full">
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </Button>

            {role ? (
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full"
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full">Register</Button>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ================= TAILWIND HELPER ================= */
const navLink =
  "text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors";
