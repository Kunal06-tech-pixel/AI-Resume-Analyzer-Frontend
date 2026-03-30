import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";

import Stepper from "../components/builder/Stepper";
import ResumePreview from "../components/builder/ResumePreview";
import PersonalInfoForm from "../components/builder/forms/PersonalInfoForm";
import ExperienceForm from "../components/builder/forms/ExperienceForm";
import EducationForm from "../components/builder/forms/EducationForm";
import SkillsForm from "../components/builder/forms/SkillsForm";

import HeroBackground from "../components/HeroBackground";
import NavButton3D from "../components/NavButton3D";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../context/AuthContext";

// ICONS
import { BarChart3, FileText } from "lucide-react";

const Builder = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);

  const [resumeData, setResumeData] = useState({
    personal: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
    },

    experience: [
      {
        jobTitle: "",
        company: "",
        start: "",
        end: "",
        responsibilities: "",
      },
    ],

    // ✅ UPDATED EDUCATION SHAPE
    education: {
      school: "",
      degree: "",
      field: "",
      start: "",
      end: "",
      gpa: "",
    },

    skills: {
      technical: [],
      soft: [],
    },
  });

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  // 🔥 ANALYZE BUILT RESUME
  const handleAnalyzeResume = async () => {
    try {
      const resumeText = `
${resumeData.personal.name}
${resumeData.personal.title}
${resumeData.personal.email}
${resumeData.personal.phone}
${resumeData.personal.location}

EXPERIENCE:
${resumeData.experience
  .map(
    (exp) =>
      `${exp.jobTitle} at ${exp.company} (${exp.start} - ${exp.end}). ${exp.responsibilities}`
  )
  .join(" ")}

EDUCATION:
${resumeData.education.school}
${resumeData.education.degree}
${resumeData.education.field}
${resumeData.education.start} - ${resumeData.education.end}
GPA: ${resumeData.education.gpa}

SKILLS:
${resumeData.skills.technical.join(", ")}
${resumeData.skills.soft.join(", ")}
      `;

      const res = await api.post("/api/resume/analyze-text", {
        resumeText,
      });

      navigate("/dashboard", {
        state: {
          analysisResult: res.data.analysis.raw_output,
        },
      });
    } catch (error) {
      console.error("Builder analyze failed:", error);
      alert("Resume analysis failed. Please try again.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={resumeData}
            setData={setResumeData}
          />
        );

      case 2:
        return (
          <ExperienceForm
            data={resumeData}
            setData={setResumeData}
          />
        );

      case 3:
        return (
          <EducationForm
            data={resumeData}
            setData={setResumeData}
          />
        );

      case 4:
        return (
          <SkillsForm
            data={resumeData}
            setData={setResumeData}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-blue-50 via-white to-pink-100">
      {/* 🔥 SAME CAPSULE BACKGROUND */}
      <HeroBackground />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* ✅ SAME NAVBAR AS LANDING */}
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

            {user && (
              <>
                <span className="text-sm text-gray-700 font-medium bg-gray-100 px-3 py-1 rounded-full">
                  {user.name}
                </span>
                <LogoutButton onClick={logout} />
              </>
            )}
          </div>
        </nav>

        {/* STEP HEADER */}
        <div className="max-w-6xl mx-auto pt-8 px-4">
          <Stepper currentStep={currentStep} />
        </div>

        {/* MAIN */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 px-4 pb-10">
          {/* LEFT FORM */}
          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-6">
            {renderStep()}

            {/* NAV BUTTONS */}
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="text-gray-500 hover:text-gray-800 disabled:opacity-40"
              >
                Back
              </button>

              <button
                onClick={
                  currentStep === 4
                    ? handleAnalyzeResume
                    : nextStep
                }
                className="px-5 py-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white shadow-md hover:scale-105 transition"
              >
                {currentStep === 4
                  ? "Analyze Resume ✨"
                  : "Next Step →"}
              </button>
            </div>
          </div>

          {/* RIGHT PREVIEW */}
          <div className="sticky top-24 h-fit">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;