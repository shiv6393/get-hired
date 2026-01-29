import { useUsers } from "@/context/UsersContext";
import { Button } from "@/components/ui/button";

export default function AdminUsers() {
  const { users, updateRole, deleteUser } = useUsers();

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <h1 className="text-2xl font-bold">Manage Users</h1>

      <div className="border rounded-md divide-y">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={user.role}
                onChange={(e) => updateRole(user.id, e.target.value as any)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="USER">USER</option>
                <option value="RECRUITER">RECRUITER</option>
                <option value="ADMIN">ADMIN</option>
              </select>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
