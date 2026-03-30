import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HeroBackground from "../components/HeroBackground";
import LogoutButton from "../components/LogoutButton";
import LoginButton from "../components/LoginButton";
import NavButton3D from "../components/NavButton3D";

// ICONS
import {
  Brain,
  ShieldCheck,
  BarChart3,
  Target,
  FileText,
  Upload,
  CheckCircle,
  Edit3,
  Eye,
  Download,
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const features = [
    { title: "AI-Powered Analysis", icon: Brain },
    { title: "ATS Compatibility", icon: ShieldCheck },
    { title: "Detailed Scoring", icon: BarChart3 },
    { title: "Job Matching", icon: Target },
    { title: "Resume Builder", icon: FileText },
  ];

  const goToLogin = () =>
    navigate("/login", { state: { mode: "login" } });

  const goToSignup = () =>
    navigate("/login", { state: { mode: "signup" } });

  return (
    <div className="relative min-h-screen bg-linear-to-br from-blue-100 via-white to-pink-200">

      {/* HERO CAPSULE BACKGROUND */}
      <HeroBackground />

      {/* NAVBAR */}
      <nav className="z-50 w-full flex items-center justify-between px-8 py-4 backdrop-blur-sm bg-white/70 border-b border-gray-200 sticky top-0">
        <h1
          onClick={() => navigate("/")}
          className="text-lg font-semibold cursor-pointer tracking-tight"
        >
          ATSmind AI
        </h1>

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

          {user ? (
            <>
              <span className="text-sm text-gray-700 font-medium bg-gray-100 px-3 py-1 rounded-full">
                {user.name}
              </span>
              <LogoutButton onClick={logout} />
            </>
          ) : (
            <>
              {/* 🔥 RESTORED PREMIUM LOGIN BUTTON */}
              <LoginButton onClick={goToLogin}>Login</LoginButton>

              <button
                onClick={goToSignup}
                className="px-4 py-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 transition"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-0 text-center -mt-20 pt-28 px-4">
        <div className="inline-block mb-6 px-4 py-1 text-xs rounded-full bg-purple-100 text-purple-600 shadow-sm">
          AI-Powered Resume Tools
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
          Analyze & Build
          <br />
          <span className="bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Your Perfect Resume
          </span>
        </h1>

        <p className="mt-6 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
          Upload your resume for instant AI-powered feedback — or build one
          from scratch with our guided builder and export a polished PDF.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() =>
              navigate(user ? "/dashboard" : "/login", user ? {} : { state: { mode: "login" } })
            }
            className="px-7 py-3 rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white text-sm shadow-lg hover:shadow-xl hover:scale-105 transition"
          >
            Get Started →
          </button>

          <button
            onClick={() =>
              navigate(user ? "/builder" : "/login", user ? {} : { state: { mode: "signup" } })
            }
            className="px-7 py-3 rounded-full border border-gray-300 text-sm hover:bg-white hover:shadow-md transition"
          >
            Build Resume
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 mt-28 px-6">
        <h2 className="text-center text-xl font-semibold mb-12">
          Everything You Need to{" "}
          <span className="text-purple-600">Land Your Dream Job</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
              >
                <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-linear-to-r from-purple-200 to-blue-200">
                  <Icon size={22} className="text-purple-700" />
                </div>

                <h3 className="font-semibold text-sm">{item.title}</h3>

                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Powerful tools to optimize your resume and increase your chances.
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 mt-28 px-6 pb-20">
        <h2 className="text-center text-xl font-semibold mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* ANALYZER */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="font-semibold mb-6">Resume Analyzer</h3>

            <div className="relative flex justify-between items-center mb-8">
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-linear-to-r from-purple-300 via-blue-300 to-purple-300 opacity-40" />

              {[
                { label: "Upload", icon: Upload },
                { label: "Analyze", icon: Brain },
                { label: "Score", icon: CheckCircle },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="relative z-10 flex flex-col items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-r from-purple-400 to-blue-400 text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      <Icon size={16} />
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-purple-600 transition">
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => (user ? navigate("/dashboard") : goToLogin())}
              className="w-full py-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white text-sm shadow hover:scale-[1.02] transition"
            >
              Analyze Your Resume →
            </button>
          </div>

          {/* BUILDER */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="font-semibold mb-6">Resume Builder</h3>

            <div className="relative flex justify-between items-center mb-8">
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-linear-to-r from-purple-300 via-blue-300 to-purple-300 opacity-40" />

              {[
                { label: "Fill", icon: Edit3 },
                { label: "Preview", icon: Eye },
                { label: "Download", icon: Download },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="relative z-10 flex flex-col items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-r from-purple-400 to-blue-400 text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      <Icon size={16} />
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-purple-600 transition">
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => (user ? navigate("/builder") : goToSignup())}
              className="w-full py-2 rounded-full text-sm font-medium border border-purple-400 text-purple-600 bg-transparent transition-all duration-300 hover:text-white hover:bg-linear-to-r hover:from-purple-500 hover:to-blue-500 hover:shadow-lg hover:scale-[1.02]"
            >
              Build Your Resume →
            </button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 text-center text-xs text-gray-400 pb-6">
        © 2026 ATSmind AI. All rights reserved.
      </footer>
    </div>
  );
}