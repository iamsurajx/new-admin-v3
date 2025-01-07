import React from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    login();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
