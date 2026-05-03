import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import ResumePDF from "../components/pdf/ResumePDF";
import Stepper from "../components/builder/Stepper";
import ResumePreview from "../components/builder/ResumePreview";
import PersonalInfoForm from "../components/builder/forms/PersonalInfoForm";
import ExperienceForm from "../components/builder/forms/ExperienceForm";
import EducationForm from "../components/builder/forms/EducationForm";
import ProjectsForm from "../components/builder/forms/ProjectsForm";
import SkillsForm from "../components/builder/forms/SkillsForm";
import PageShell from "../components/ui/PageShell";
import GlassCard from "../components/ui/GlassCard";
import { PrimaryButton, SecondaryButton } from "../components/ui/Buttons";

const Builder = () => {
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

  const handleDownloadPDF = async () => {
    try {
      const blob = await pdf(<ResumePDF data={resumeData} />).toBlob();
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
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 pt-8">
        <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 items-start gap-8 px-4 pb-10 md:grid-cols-2">
        <GlassCard>
          {renderStep()}

          <div className="mt-6 flex justify-between gap-3">
            <SecondaryButton
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Back
            </SecondaryButton>

            {currentStep === 5 ? (
              <PrimaryButton type="button" onClick={handleDownloadPDF}>
                Download PDF
              </PrimaryButton>
            ) : (
              <PrimaryButton type="button" onClick={nextStep}>
                Next Step {"->"}
              </PrimaryButton>
            )}
          </div>
        </GlassCard>

        <div className="sticky top-24 h-fit">
          <div id="resume-preview">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default Builder;
