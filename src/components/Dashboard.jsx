
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Welcome to the Admin Dashboard</h1>
        <p className="mt-4">Here you can manage users, investors, and more.</p>
      </div>
    </div>
  );
};

export default Dashboard;
