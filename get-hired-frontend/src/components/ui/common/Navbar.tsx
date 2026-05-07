import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BriefcaseBusiness,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const { role, logout } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-white/60 bg-background/75 backdrop-blur-2xl dark:border-white/10"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0ea5e9,#f59e0b)] text-white shadow-lg shadow-sky-500/20">
            <BriefcaseBusiness size={18} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-semibold text-foreground">GetHired</span>
            <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Career Studio
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link to="/jobs" className={navLink}>
            Jobs
          </Link>

          {role === "CANDIDATE" && (
            <>
              <Link to="/applied" className={navLink}>
                Applied Jobs
              </Link>
              <Link to="/user" className={navLink}>
                Dashboard
              </Link>
              <Link to="/user/profile" className={navLink}>
                Profile
              </Link>
              <Link to="/user/settings" className={navLink}>
                Settings
              </Link>
            </>
          )}

          {role === "RECRUITER" && (
            <>
              <Link to="/recruiter/post-job">
                <Button className="rounded-full bg-[linear-gradient(135deg,#0ea5e9,#0284c7)] text-white shadow-lg shadow-sky-500/20">
                  Post Job
                </Button>
              </Link>
              <Link to="/recruiter/dashboard" className={navLink}>
                Recruiter Dashboard
              </Link>
            </>
          )}

          {role === "ADMIN" && (
            <Link
              to="/admin"
              className="rounded-full border border-amber-300/60 bg-amber-100/70 px-3 py-1 text-sm font-medium text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-100"
            >
              Admin
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full border border-white/60 bg-white/70 shadow-sm dark:border-white/10 dark:bg-white/5"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </Button>

          {role ? (
            <Button variant="outline" onClick={handleLogout} className="rounded-full">
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="rounded-full">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="rounded-full bg-[linear-gradient(135deg,#0f172a,#334155)] text-white dark:bg-[linear-gradient(135deg,#f59e0b,#f97316)] dark:text-slate-950">
                  <Sparkles size={16} />
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-white/60 bg-white/70 shadow-sm md:hidden dark:border-white/10 dark:bg-white/5"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-3 border-t border-white/60 bg-background/90 px-4 py-4 md:hidden dark:border-white/10"
          >
            <Link to="/jobs" onClick={() => setOpen(false)}>
              Jobs
            </Link>

            {role === "CANDIDATE" && (
              <>
                <Link to="/applied" onClick={() => setOpen(false)}>
                  Applied Jobs
                </Link>
                <Link to="/user" onClick={() => setOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/user/profile" onClick={() => setOpen(false)}>
                  Profile
                </Link>
                <Link to="/user/settings" onClick={() => setOpen(false)}>
                  Settings
                </Link>
              </>
            )}

            {role === "RECRUITER" && (
              <>
                <Link
                  to="/recruiter/post-job"
                  onClick={() => setOpen(false)}
                  className="font-semibold text-sky-600 dark:text-sky-300"
                >
                  Post Job
                </Link>
                <Link to="/recruiter/dashboard" onClick={() => setOpen(false)}>
                  Recruiter Dashboard
                </Link>
              </>
            )}

            {role === "ADMIN" && (
              <Link to="/admin" className="text-amber-700 dark:text-amber-200">
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
                className="w-full rounded-full"
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full rounded-full">Register</Button>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

const navLink =
  "text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white";
