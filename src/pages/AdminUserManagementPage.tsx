import React, { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import AuthContext from "../context/AuthContext";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  approved: boolean;
}

const AdminUserManagementPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/api/users");
      setUsers(data);
    } catch (err: any) {
      console.error("Failed to fetch users:", err.response?.data || err.message);
    }
  };

  const approveUser = async (id: string) => {
    try {
      await API.put(`/api/users/${id}/approve`);
      fetchUsers();
    } catch (err: any) {
      console.error("Failed to approve user:", err.response?.data || err.message);
    }
  };

  const deleteUser = async (id: string) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await API.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (err: any) {
      console.error("Failed to delete user:", err.response?.data || err.message);
    }
  };

  const updateRole = async (id: string, role: string) => {
    try {
      await API.put(`/api/users/${id}/role`, { role });
      fetchUsers();
    } catch (err: any) {
      console.error("Failed to update role:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!user || user.role !== "admin") {
    return <p className="p-4">Unauthorized. Admins only.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin User Management</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user._id} className="bg-white shadow rounded p-4">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Approved:</strong> {user.approved ? "Yes" : "No"}</p>

              {!user.approved && (
                <button
                  onClick={() => approveUser(user._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded mr-2 hover:bg-green-700"
                >
                  Approve
                </button>
              )}

              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-600 text-white px-4 py-2 rounded mr-2 hover:bg-red-700"
              >
                Delete
              </button>

              <select
                value={user.role}
                onChange={(e) => updateRole(user._id, e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUserManagementPage;
