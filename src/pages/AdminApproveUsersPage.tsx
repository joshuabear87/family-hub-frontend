import React, { useState, useEffect } from 'react';
import API from '../api/axios';

interface User {
  _id: string;
  name: string;
  email: string;
  approved: boolean;
}

const AdminApproveUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setMessage('');
    try {
      const { data } = await API.get('/users'); // ensure you have GET /api/users route for admins
      setUsers(data);
    } catch (err: any) {
      setMessage(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const approveHandler = async (id: string) => {
    setLoading(true);
    setMessage('');
    try {
      await API.put(`/users/${id}/approve`);
      setMessage('User approved.');
      fetchUsers(); // refresh list
    } catch (err: any) {
      setMessage(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Approve Users</h1>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Approved</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.approved ? 'Yes' : 'No'}</td>
                <td>
                  {!user.approved && (
                    <button
                      onClick={() => approveHandler(user._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      disabled={loading}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminApproveUsersPage;
