import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const MyAccountPage: React.FC = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated || !user) {
    return (
      <div className="p-4">
        <h1 className="text-2xl">My Account</h1>
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl mb-4">My Account</h1>

      <div className="mb-3">
        <label className="font-semibold">Name:</label>
        <p>{user.name}</p>
      </div>

      <div className="mb-3">
        <label className="font-semibold">Email:</label>
        <p>{user.email}</p>
      </div>

      <div className="mb-3">
        <label className="font-semibold">Role:</label>
        <p>
          {user.role}
          {user.role === 'admin' && (
            <span className="ml-2 inline-block bg-green-200 text-green-800 px-2 py-1 rounded text-xs">
              Admin
            </span>
          )}
        </p>
      </div>

      {/* Future: add edit button here */}
    </div>
  );
};

export default MyAccountPage;
