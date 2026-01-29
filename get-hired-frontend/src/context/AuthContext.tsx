import { createContext, useContext, useEffect, useState } from "react";

type Role = "USER" | "RECRUITER" | "ADMIN";

interface AuthContextType {
  role: Role | null;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "auth_role";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);

  // 🔹 Load role on app start
  useEffect(() => {
    const storedRole = localStorage.getItem(STORAGE_KEY) as Role | null;
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const login = (newRole: Role) => {
    setRole(newRole);
    localStorage.setItem(STORAGE_KEY, newRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
