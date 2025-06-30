import React, { useState, FormEvent, useContext } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
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
    <div className="flex flex-col items-center justify-center min-h-screen px-2 bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-5 rounded shadow-md w-full max-w-xs space-y-3"
      >
        <h2 className="text-lg font-semibold text-center">Family Member Login</h2>

        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        <div className="flex items-center border rounded px-2 py-1">
          <Mail size={16} className="text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm w-full outline-none"
            required
          />
        </div>

        <div className="flex items-center border rounded px-2 py-1">
          <Lock size={16} className="text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-sm w-full outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center bg-blue-500 text-white text-sm px-4 py-2 rounded w-full hover:bg-blue-600 transition"
        >
          <LogIn size={16} className="mr-2" /> Login
        </button>

        <p className="text-[10px] text-center">
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
