import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardResumeAnalyzer from "../components/DashboardResumeAnalyzer";
import LogoutButton from "../components/LogoutButton";
import NavButton3D from "../components/NavButton3D";
import HeroBackground from "../components/HeroBackground";

// ICONS
import { BarChart3, FileText } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 BUILDER ANALYSIS RESULT
  const builderAnalysis = location.state?.analysisResult || null;

  return (
    <div className="relative min-h-screen bg-linear-to-br from-blue-50 via-white to-pink-100">

      {/* 🔥 CAPSULE BACKGROUND (SAME AS LANDING) */}
      <HeroBackground />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10">

        {/* NAVBAR */}
        <nav className="z-50 w-full flex items-center justify-between px-8 py-4 backdrop-blur-md bg-white/70 border-b border-gray-200 sticky top-0">

          {/* LEFT */}
          <h1
            onClick={() => navigate("/")}
            className="text-lg font-semibold cursor-pointer tracking-tight"
          >
            ATSmind AI
          </h1>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            <NavButton3D
              icon={BarChart3}
              onClick={() => navigate("/dashboard")}
            >
              Analyzer
            </NavButton3D>

            <NavButton3D
              icon={FileText}
              onClick={() => navigate("/builder")}
            >
              Builder
            </NavButton3D>

            {/* USER NAME */}
            {user && (
              <span className="text-sm text-gray-700 font-medium bg-gray-100 px-3 py-1 rounded-full">
                {user.name}
              </span>
            )}

            {/* LOGOUT BUTTON */}
            <LogoutButton onClick={logout} />

          </div>
        </nav>

        {/* 🔥 MAIN (NOW SUPPORTS BUILDER FLOW) */}
        <DashboardResumeAnalyzer preloadedResult={builderAnalysis} />

      </div>
    </div>
  );
};

export default Dashboard;