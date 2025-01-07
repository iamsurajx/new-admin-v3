import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={logout}
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
