import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ NEW (react-pdf)
import { pdf } from "@react-pdf/renderer";
import ResumePDF from "../components/pdf/ResumePDF";

import Stepper from "../components/builder/Stepper";
import ResumePreview from "../components/builder/ResumePreview";
import PersonalInfoForm from "../components/builder/forms/PersonalInfoForm";
import ExperienceForm from "../components/builder/forms/ExperienceForm";
import EducationForm from "../components/builder/forms/EducationForm";
import ProjectsForm from "../components/builder/forms/ProjectsForm";
import SkillsForm from "../components/builder/forms/SkillsForm";

import HeroBackground from "../components/HeroBackground";
import NavButton3D from "../components/NavButton3D";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../context/AuthContext";

import { BarChart3, FileText } from "lucide-react";

const Builder = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);

  const [resumeData, setResumeData] = useState({
    personal: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
    },
    education: [
      {
        school: "",
        degree: "",
        field: "",
        start: "",
        end: "",
        gpa: "",
      },
    ],
    experience: [
      {
        jobTitle: "",
        company: "",
        start: "",
        end: "",
        responsibilities: "",
      },
    ],
    projects: [
      {
        title: "",
        techStack: "",
        description: "",
        github: "",
        live: "",
      },
    ],
    skills: {
      technical: [],
      soft: [],
      certifications: [],
    },
  });

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  // ================= DOWNLOAD PDF (FIXED - TEXT BASED) =================
  const handleDownloadPDF = async () => {
    try {
      const blob = await pdf(
        <ResumePDF data={resumeData} />
      ).toBlob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      link.click();

      URL.revokeObjectURL(url);

    } catch (err) {
      console.error("PDF Error:", err);
      alert("Failed to generate PDF");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoForm data={resumeData} setData={setResumeData} />;
      case 2:
        return <EducationForm data={resumeData} setData={setResumeData} />;
      case 3:
        return <ExperienceForm data={resumeData} setData={setResumeData} />;
      case 4:
        return <ProjectsForm data={resumeData} setData={setResumeData} />;
      case 5:
        return <SkillsForm data={resumeData} setData={setResumeData} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-blue-50 via-white to-pink-100">
      <HeroBackground />

      <div className="relative z-10">

        {/* NAVBAR */}
        <nav className="z-50 w-full flex items-center justify-between px-8 py-4 backdrop-blur-sm bg-white/70 border-b border-gray-200 sticky top-0">
          <h1 onClick={() => navigate("/")} className="text-lg font-semibold cursor-pointer">
            ATSmind AI
          </h1>

          <div className="flex items-center gap-3">
            <NavButton3D icon={BarChart3} onClick={() => navigate("/dashboard")}>
              Analyzer
            </NavButton3D>

            <NavButton3D icon={FileText} onClick={() => navigate("/builder")}>
              Builder
            </NavButton3D>

            {user && (
              <>
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                  {user.name}
                </span>
                <LogoutButton onClick={logout} />
              </>
            )}
          </div>
        </nav>

        {/* STEPPER */}
        <div className="max-w-5xl mx-auto pt-8 px-4">
          <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>

        {/* MAIN */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-8 px-4 pb-10">

          {/* LEFT */}
          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-6">
            {renderStep()}

            <div className="flex justify-between mt-6">
              <button type="button" onClick={prevStep} disabled={currentStep === 1}>
                Back
              </button>

              {currentStep === 5 ? (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    className="px-5 py-2 rounded-full bg-gray-800 text-white"
                  >
                    Download PDF
                  </button>
                </div>
              ) : (
                <button type="button" onClick={nextStep}>
                  Next Step →
                </button>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="sticky top-24 h-fit">
            <div id="resume-preview">
              <ResumePreview data={resumeData} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Builder;