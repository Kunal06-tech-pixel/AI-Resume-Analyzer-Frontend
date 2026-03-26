import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardResumeAnalyzer from "../components/DashboardResumeAnalyzer";
import LogoutButton from "../components/LogoutButton"; // ✅ NEW

const Dashboard = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-pink-100">

      {/* ✅ NAVBAR */}
      <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm">

        {/* LEFT */}
        <h1
          onClick={() => navigate("/")}
          className="text-lg font-semibold cursor-pointer"
        >
          ATSmind AI
        </h1>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-700 hover:text-purple-600 transition"
          >
            Analyzer
          </button>

          <button
            onClick={() => navigate("/builder")}
            className="text-sm text-gray-700 hover:text-purple-600 transition"
          >
            Builder
          </button>

          {/* ✅ USER EMAIL */}
          {user && (
            <span className="text-sm text-gray-600">
              {user.email}
            </span>
          )}

          {/* 🔥 NEW ANIMATED LOGOUT BUTTON */}
          <LogoutButton onClick={logout} />

        </div>

      </nav>

      {/* MAIN */}
      <DashboardResumeAnalyzer />

    </div>
  );
};

export default Dashboard;