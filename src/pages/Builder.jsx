import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import ResumePDF from "../components/pdf/ResumePDF";
import Stepper from "../components/builder/Stepper";
import ResumePreview from "../components/builder/ResumePreview";
import PersonalInfoForm from "../components/builder/forms/PersonalInfoForm";
import ExperienceForm from "../components/builder/forms/ExperienceForm";
import EducationForm from "../components/builder/forms/EducationForm";
import ProjectsForm from "../components/builder/forms/ProjectsForm";
import SkillsForm from "../components/builder/forms/SkillsForm";
import AppShell from "../components/ui/AppShell";
import GlassCard from "../components/ui/GlassCard";
import { PrimaryButton, SecondaryButton } from "../components/ui/Buttons";
import { useToast } from "../components/ui/useToast";

const Builder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const toast = useToast();

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

  const handleDownloadPDF = async () => {
    try {
      const blob = await pdf(<ResumePDF data={resumeData} />).toBlob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      link.click();

      URL.revokeObjectURL(url);
      toast.success("Your resume PDF has been generated.");
    } catch (err) {
      console.error("PDF Error:", err);
      toast.error("Failed to generate PDF");
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
    <AppShell
      title="Resume builder"
      description="Build a clean PDF resume from guided sections."
      actions={
        <PrimaryButton onClick={handleDownloadPDF} className="hidden sm:inline-flex">
          <Download size={16} />
          Export PDF
        </PrimaryButton>
      }
    >
      <div className="mx-auto max-w-7xl space-y-6">
        <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(28rem,1.08fr)]">
          <GlassCard className="p-5 sm:p-6">
            {renderStep()}

            <div className="mt-6 flex justify-between gap-3 border-t border-slate-200 pt-5">
              <SecondaryButton
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Back
              </SecondaryButton>

              {currentStep === 5 ? (
                <PrimaryButton type="button" onClick={handleDownloadPDF}>
                  <Download size={16} />
                  Download PDF
                </PrimaryButton>
              ) : (
                <PrimaryButton type="button" onClick={nextStep}>
                  Next Step
                </PrimaryButton>
              )}
            </div>
          </GlassCard>

          <aside className="sticky top-24 h-fit">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Live preview
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
                  Resume document
                </h2>
              </div>
              <span className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-500">
                PDF
              </span>
            </div>
            <div id="resume-preview">
              <ResumePreview data={resumeData} />
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
};

export default Builder;
