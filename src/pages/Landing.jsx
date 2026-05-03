import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import PageShell from "../components/ui/PageShell";
import { PrimaryButton, SecondaryButton } from "../components/ui/Buttons";
import {
  BarChart3,
  Brain,
  CheckCircle,
  Download,
  Edit3,
  Eye,
  FileText,
  ShieldCheck,
  Target,
  Upload,
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    { title: "AI-Powered Analysis", icon: Brain },
    { title: "ATS Compatibility", icon: ShieldCheck },
    { title: "Detailed Scoring", icon: BarChart3 },
    { title: "Job Matching", icon: Target },
    { title: "Resume Builder", icon: FileText },
  ];

  const goToLogin = () => navigate("/login", { state: { mode: "login" } });
  const goToSignup = () => navigate("/login", { state: { mode: "signup" } });

  return (
    <PageShell>
      <section className="relative z-0 -mt-20 px-4 pt-28 text-center">
        <div className="mb-6 inline-block rounded-full bg-purple-100 px-4 py-1 text-xs text-purple-600 shadow-sm">
          AI-Powered Resume Tools
        </div>

        <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
          Analyze & Build
          <br />
          <span className="bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Your Perfect Resume
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-gray-500">
          Upload your resume for instant AI-powered feedback, or build one from
          scratch with our guided builder and export a polished PDF.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <PrimaryButton
            onClick={() =>
              navigate(
                user ? "/analyzer" : "/login",
                user ? {} : { state: { mode: "login" } }
              )
            }
          >
            Get Started {"->"}
          </PrimaryButton>

          <SecondaryButton
            onClick={() =>
              navigate(
                user ? "/builder" : "/login",
                user ? {} : { state: { mode: "signup" } }
              )
            }
          >
            Build Resume
          </SecondaryButton>
        </div>
      </section>

      <section className="relative z-10 mt-28 px-6">
        <h2 className="mb-12 text-center text-xl font-semibold">
          Everything You Need to{" "}
          <span className="text-purple-600">Land Your Dream Job</span>
        </h2>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl bg-white/70 p-6 shadow-md backdrop-blur-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-purple-200 to-blue-200">
                  <Icon size={22} className="text-purple-700" />
                </div>

                <h3 className="text-sm font-semibold">{item.title}</h3>

                <p className="mt-2 text-xs leading-relaxed text-gray-500">
                  Powerful tools to optimize your resume and increase your
                  chances.
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 mt-28 px-6 pb-20">
        <h2 className="mb-12 text-center text-xl font-semibold">How It Works</h2>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white/70 p-6 shadow-md backdrop-blur-lg transition hover:shadow-xl">
            <h3 className="mb-6 font-semibold">Resume Analyzer</h3>

            <div className="relative mb-8 flex items-center justify-between">
              <div className="absolute left-0 right-0 top-4 h-0.5 bg-linear-to-r from-purple-300 via-blue-300 to-purple-300 opacity-40" />

              {[
                { label: "Upload", icon: Upload },
                { label: "Analyze", icon: Brain },
                { label: "Score", icon: CheckCircle },
              ].map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.label}
                    className="group relative z-10 flex flex-col items-center gap-2"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-purple-400 to-blue-400 text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      <Icon size={16} />
                    </div>
                    <span className="text-xs text-gray-600 transition group-hover:text-purple-600">
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <PrimaryButton
              onClick={() => (user ? navigate("/analyzer") : goToLogin())}
              className="w-full"
            >
              Analyze Your Resume {"->"}
            </PrimaryButton>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-md backdrop-blur-lg transition hover:shadow-xl">
            <h3 className="mb-6 font-semibold">Resume Builder</h3>

            <div className="relative mb-8 flex items-center justify-between">
              <div className="absolute left-0 right-0 top-4 h-0.5 bg-linear-to-r from-purple-300 via-blue-300 to-purple-300 opacity-40" />

              {[
                { label: "Fill", icon: Edit3 },
                { label: "Preview", icon: Eye },
                { label: "Download", icon: Download },
              ].map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.label}
                    className="group relative z-10 flex flex-col items-center gap-2"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-purple-400 to-blue-400 text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      <Icon size={16} />
                    </div>
                    <span className="text-xs text-gray-600 transition group-hover:text-purple-600">
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <SecondaryButton
              onClick={() => (user ? navigate("/builder") : goToSignup())}
              className="w-full"
            >
              Build Your Resume {"->"}
            </SecondaryButton>
          </div>
        </div>
      </section>

      <footer className="relative z-10 pb-6 text-center text-xs text-gray-400">
        Copyright 2026 ATSmind AI. All rights reserved.
      </footer>
    </PageShell>
  );
}
