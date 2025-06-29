import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

interface User {
  _id: string;
  name: string;
  email: string;
  approved: boolean;
  role: 'user' | 'admin';
}

const AdminUserManagementPage: React.FC = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/users');
        console.log('Fetched data:', data);
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const approveUser = async (id: string) => {
    try {
      await axios.put(`/api/users/${id}/approve`);
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, approved: true } : u))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateRole = async (id: string, newRole: 'user' | 'admin') => {
    try {
      await axios.put(`/api/users/${id}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return <div className="p-4">You are not authorized to view this page.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Manage Users</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          {/* Table view for md+ screens */}
          <div className="hidden md:block">
            <table className="min-w-full bg-white shadow rounded">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Approved</th>
                  <th className="py-2 px-4 border">Role</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td className="py-2 px-4 border">{u.name}</td>
                    <td className="py-2 px-4 border">{u.email}</td>
                    <td className="py-2 px-4 border">{u.approved ? 'Yes' : 'No'}</td>
                    <td className="py-2 px-4 border">{u.role}</td>
                    <td className="py-2 px-4 border space-x-2">
                      {!u.approved && (
                        <button
                          onClick={() => approveUser(u._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() =>
                          updateRole(u._id, u.role === 'admin' ? 'user' : 'admin')
                        }
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        {u.role === 'admin' ? 'Demote' : 'Promote'}
                      </button>
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card view for mobile screens */}
          <div className="md:hidden space-y-4">
            {users.map((u) => (
              <div key={u._id} className="bg-white shadow rounded p-4">
                <p className="font-bold">{u.name}</p>
                <p className="text-sm text-gray-600">{u.email}</p>
                <p className="mt-1">
                  <span className="font-semibold">Approved:</span> {u.approved ? 'Yes' : 'No'}
                </p>
                <p>
                  <span className="font-semibold">Role:</span> {u.role}
                </p>

                <div className="mt-3 space-y-2">
                  {!u.approved && (
                    <button
                      onClick={() => approveUser(u._id)}
                      className="w-full bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() =>
                      updateRole(u._id, u.role === 'admin' ? 'user' : 'admin')
                    }
                    className="w-full bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    {u.role === 'admin' ? 'Demote' : 'Promote'}
                  </button>
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="w-full bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminUserManagementPage;
