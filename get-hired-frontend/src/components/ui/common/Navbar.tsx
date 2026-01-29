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

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        sticky top-0 z-50
        backdrop-blur-xl
        bg-white/70 dark:bg-gray-900/80
        border-b border-gray-200 dark:border-gray-800
      "
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight
                       text-gray-900 dark:text-white"
          >
            GetHired
          </Link>
        </motion.div>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex items-center gap-6">
          {/* Jobs */}
          <Link
            to="/jobs"
            className="text-sm font-medium
                       text-gray-600 hover:text-gray-900
                       dark:text-gray-300 dark:hover:text-white
                       transition-colors"
          >
            Jobs
          </Link>

          {/* Applied Jobs */}
          {role && (
            <Link
              to="/applied"
              className="text-sm font-medium
                         text-gray-600 hover:text-gray-900
                         dark:text-gray-300 dark:hover:text-white
                         transition-colors"
            >
              Applied Jobs
            </Link>
          )}

          {/* Recruiter / Admin */}
          {(role === "RECRUITER" || role === "ADMIN") && (
            <Link
              to="/recruiter/post-job"
              className="text-sm font-medium
                         text-gray-600 hover:text-gray-900
                         dark:text-gray-300 dark:hover:text-white
                         transition-colors"
            >
              Post Job
            </Link>
          )}

          {/* Admin */}
          {role === "ADMIN" && (
            <Link to="/admin" className="text-sm font-medium text-red-600">
              Admin
            </Link>
          )}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            <AnimatePresence mode="wait">
              {theme === "light" ? (
                <motion.span
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <Moon size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Sun size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          {/* Auth Buttons */}
          {role ? (
            <Button variant="outline" onClick={logout}>
              Logout ({role})
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
            transition={{ duration: 0.3 }}
            className="
              md:hidden overflow-hidden
              px-4 py-4 space-y-3
              bg-white/90 dark:bg-gray-900
              border-t border-gray-200 dark:border-gray-800
            "
          >
            <Link
              to="/jobs"
              onClick={() => setOpen(false)}
              className="block text-sm font-medium
                         text-gray-700 dark:text-gray-300"
            >
              Jobs
            </Link>

            {role && (
              <Link
                to="/applied"
                onClick={() => setOpen(false)}
                className="block text-sm font-medium
                           text-gray-700 dark:text-gray-300"
              >
                Applied Jobs
              </Link>
            )}

            {(role === "RECRUITER" || role === "ADMIN") && (
              <Link
                to="/recruiter/post-job"
                onClick={() => setOpen(false)}
                className="block text-sm font-medium
                           text-gray-700 dark:text-gray-300"
              >
                Post Job
              </Link>
            )}

            {role === "ADMIN" && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-red-600"
              >
                Admin
              </Link>
            )}

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={toggleTheme}
            >
              {theme === "light" ? "Switch to Dark" : "Switch to Light"}
            </Button>

            {role ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Logout ({role})
              </Button>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>

                <Link to="/register" onClick={() => setOpen(false)}>
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
