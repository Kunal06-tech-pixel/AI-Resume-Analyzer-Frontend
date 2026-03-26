import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HeroBackground from "../components/HeroBackground";
import LogoutButton from "../components/LogoutButton"; // ✅ NEW

export default function Landing() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="relative min-h-screen bg-linear-to-br from-blue-50 via-white to-pink-100">

      {/* 🔥 BACKGROUND */}
      <HeroBackground />

      {/* 🌟 NAVBAR */}
      <nav className="z-10 w-full flex items-center justify-between px-8 py-4 backdrop-blur-md bg-white/60 border-b border-gray-200 sticky top-0">

        <h1
          onClick={() => navigate("/")}
          className="text-lg font-semibold cursor-pointer tracking-tight"
        >
          ATSmind AI
        </h1>

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

          {user ? (
            <>
              <span className="text-sm text-gray-600">
                {user.email}
              </span>

              {/* 🔥 UPDATED LOGOUT BUTTON */}
              <LogoutButton onClick={logout} />
            </>
          ) : (
            <>
              <button
                onClick={() =>
                  navigate("/login", { state: { mode: "login" } })
                }
                className="text-sm text-gray-600 hover:text-black transition"
              >
                Login
              </button>

              <button
                onClick={() =>
                  navigate("/login", { state: { mode: "signup" } })
                }
                className="px-4 py-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white text-sm shadow-lg hover:shadow-xl hover:scale-105 transition"
              >
                Sign Up
              </button>
            </>
          )}

        </div>
      </nav>

      {/* 🌟 HERO */}
      <section className="relative z-10 text-center mt-24 px-4">

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
              navigate(
                user ? "/dashboard" : "/login",
                user ? {} : { state: { mode: "login" } }
              )
            }
            className="px-7 py-3 rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white text-sm shadow-lg hover:shadow-xl hover:scale-105 transition"
          >
            Get Started →
          </button>

          <button
            onClick={() =>
              navigate(
                user ? "/builder" : "/login",
                user ? {} : { state: { mode: "signup" } }
              )
            }
            className="px-7 py-3 rounded-full border border-gray-300 text-sm hover:bg-white hover:shadow-md transition"
          >
            Build Resume
          </button>

        </div>
      </section>

      {/* 🌟 FEATURES */}
      <section className="relative z-10 mt-28 px-6">
        <h2 className="text-center text-xl font-semibold mb-12">
          Everything You Need to{" "}
          <span className="text-purple-600">Land Your Dream Job</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "AI-Powered Analysis",
            "ATS Compatibility",
            "Detailed Scoring",
            "Job Matching",
            "Resume Builder"
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="w-12 h-12 bg-linear-to-r from-purple-200 to-blue-200 rounded-xl mb-4"></div>
              <h3 className="font-semibold text-sm">{item}</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Powerful tools to optimize your resume and increase your chances.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 🌟 HOW IT WORKS */}
      <section className="relative z-10 mt-28 px-6 pb-20">
        <h2 className="text-center text-xl font-semibold mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="font-semibold mb-6">Resume Analyzer</h3>

            <div className="flex justify-between text-xs text-gray-500 mb-6">
              <span>Upload</span>
              <span>Analyze</span>
              <span>Score</span>
            </div>

            <button
              onClick={() =>
                navigate(
                  user ? "/dashboard" : "/login",
                  user ? {} : { state: { mode: "login" } }
                )
              }
              className="w-full py-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white text-sm shadow hover:scale-[1.02] transition"
            >
              Analyze Your Resume →
            </button>
          </div>

          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="font-semibold mb-6">Resume Builder</h3>

            <div className="flex justify-between text-xs text-gray-500 mb-6">
              <span>Fill</span>
              <span>Preview</span>
              <span>Download</span>
            </div>

            <button
              onClick={() =>
                navigate(
                  user ? "/builder" : "/login",
                  user ? {} : { state: { mode: "signup" } }
                )
              }
              className="w-full py-2 rounded-full border border-gray-300 text-sm hover:bg-white hover:shadow transition"
            >
              Build Your Resume →
            </button>
          </div>

        </div>
      </section>

      {/* 🌟 FOOTER */}
      <footer className="relative z-10 text-center text-xs text-gray-400 pb-6">
        © 2026 ATSmind AI. All rights reserved.
      </footer>

    </div>
  );
}