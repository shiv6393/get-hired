import { createContext, useContext, useEffect, useState } from "react";

type Role = "CANDIDATE" | "RECRUITER" | "ADMIN";

interface AuthContextType {
  role: Role | null;
  isAuthenticated: boolean;
  login: (role: Role, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ROLE_KEY = "auth_role";
const TOKEN_KEY = "token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [initialized, setInitialized] = useState(false);

  // 🔹 Load auth state on app start
  useEffect(() => {
    const storedRole = localStorage.getItem(ROLE_KEY) as Role | null;
    const token = localStorage.getItem(TOKEN_KEY);

    if (storedRole && token) {
      setRole(storedRole);
    } else {
      setRole(null);
    }

    setInitialized(true);
  }, []);

  const login = (newRole: Role, token: string) => {
    setRole(newRole);
    localStorage.setItem(ROLE_KEY, newRole);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  // ⛔ Prevent UI flicker before auth loads
  if (!initialized) {
    return null; // or a splash loader
  }

  return (
    <AuthContext.Provider
      value={{
        role,
        isAuthenticated: role !== null,
        login,
        logout,
      }}
    >
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
