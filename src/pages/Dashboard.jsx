import { useAuth } from "../context/AuthContext";
import DashboardResumeAnalyzer from "../components/DashboardResumeAnalyzer";

const Dashboard = () => {

  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-pink-100">

      {/* NAVBAR */}
      <nav className="w-full flex justify-end p-4">
        <button
          onClick={logout}
          className="rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <DashboardResumeAnalyzer />

    </div>
  );
};

export default Dashboard;