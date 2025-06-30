import React, { useState, FormEvent, useContext } from 'react';
import API from '../api/axios';
import RegisterModal from '../components/RegisterModal';
import AuthContext from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await API.post('/api/users/login', { email, password });
      login(data); // set user context
      window.location.href = '/'; // Redirect to home
    } catch (err: any) {
      console.error(err);
      const message = err.response?.data?.message || 'Login failed';
      if (message.includes('pending')) {
        setError('Your account is pending admin approval.');
      } else {
        setError(message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-4 text-center">Family Member Login</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-3 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-3 w-full"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            className="text-blue-600 underline"
            onClick={() => setShowRegister(true)}
          >
            Register a Family Member
          </button>
        </p>
      </form>

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
};

export default LoginPage;
