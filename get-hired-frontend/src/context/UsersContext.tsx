import { createContext, useContext, useState } from "react";
import type{ User } from "@/types/user";

interface UsersContextType {
  users: User[];
  updateRole: (id: string, role: User["role"]) => void;
  deleteUser: (id: string) => void;
}

const UsersContext = createContext<UsersContextType | null>(null);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Admin User",
      email: "admin@gethired.com",
      role: "ADMIN",
    },
    {
      id: "2",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      role: "USER",
    },
    {
      id: "3",
      name: "Amit Verma",
      email: "amit@gmail.com",
      role: "RECRUITER",
    },
  ]);

  const updateRole = (id: string, role: User["role"]) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <UsersContext.Provider value={{ users, updateRole, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => {
  const ctx = useContext(UsersContext);
  if (!ctx) {
    throw new Error("useUsers must be used inside UsersProvider");
  }
  return ctx;
};
