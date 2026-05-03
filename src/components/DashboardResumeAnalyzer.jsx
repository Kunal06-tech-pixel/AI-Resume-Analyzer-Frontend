import { useState, useRef, useEffect } from "react";
import AnalysisResults from "./AnalysisResults";
import api from "../services/axios";
import GlassCard from "./ui/GlassCard";
import { PrimaryButton } from "./ui/Buttons";
import { inputClass, smallLabelClass } from "../utils/uiClasses";

export default function DashboardResumeAnalyzer({
  preloadedResult = null,
}) {
  const [resumeFile, setResumeFile] = useState(null);

  // ✅ BUILDER RESULT SUPPORT
  const [analysisResult, setAnalysisResult] = useState(
    preloadedResult || null
  );

  const [loading, setLoading] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const loaderRef = useRef(null);
  const resultRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const isPdf =
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf");

      if (!isPdf) {
        alert("Please upload a PDF resume");
        e.target.value = null;
        return;
      }

      setResumeFile(file);
    }

    e.target.value = null;
  };

  const handleClearFile = () => {
    setResumeFile(null);
  };

  const handleSubmit = async () => {
    if (!resumeFile) {
      alert("Please upload a resume first");
      return;
    }

    setLoading(true);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("companyName", companyName);
    formData.append("jobTitle", jobTitle);
    formData.append("jobDescription", jobDescription);

    try {
      const res = await api.post("/api/resume/upload", formData);
      setAnalysisResult(res.data.analysis);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Upload failed");
    }

    setLoading(false);
  };

  // ✅ AUTO SCROLL TO LOADER
  useEffect(() => {
    if (loading && loaderRef.current) {
      loaderRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [loading]);

  // ✅ AUTO SCROLL TO RESULTS
  useEffect(() => {
    if (!loading && analysisResult && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [analysisResult, loading]);

  return (
    <div className="mt-10 flex flex-col items-center px-4">

      {/* HERO */}
      <h1 className="text-center text-4xl font-bold leading-tight text-gray-950">
        Smart feedback for your
        <span className="block bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-center text-transparent">
          DREAM JOB
        </span>
      </h1>

      <p className="mt-4 max-w-xl text-center text-sm leading-relaxed text-gray-500">
        Drop your resume to get an ATS score, detailed insights, and
        improvement suggestions tailored to your job role.
      </p>

      {/* FORM */}
      <div className="flex w-full justify-center px-4 py-14">
        <GlassCard className="w-full max-w-xl space-y-5 p-10">

          <div>
            <label className={smallLabelClass}>
              Company Name
            </label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={`mt-1 ${inputClass}`}
              placeholder="Company name"
            />
          </div>

          <div>
            <label className={smallLabelClass}>
              Job Title
            </label>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className={`mt-1 ${inputClass}`}
              placeholder="Job title"
            />
          </div>

          <div>
            <label className={smallLabelClass}>
              Job Description
            </label>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Write a clear & concise job description..."
              className={`mt-1 resize-none ${inputClass}`}
            />
          </div>

          {/* UPLOAD */}
          <div>
            <label className={smallLabelClass}>
              Upload Resume
            </label>

            <div className="mt-2 flex flex-col items-center">

              <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-purple-300 bg-white/70 text-center transition hover:border-purple-400 hover:bg-white/90">

                {resumeFile ? (
                  <p className="text-sm font-medium text-purple-700">
                    {resumeFile.name}
                  </p>
                ) : (
                  <>
                    <p className="text-sm font-medium text-gray-700">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      PDF only (max. 10MB)
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {resumeFile && (
                <button
                  type="button"
                  onClick={handleClearFile}
                  className="mt-2 text-xs font-medium text-purple-600 hover:underline"
                >
                  Remove file
                </button>
              )}
            </div>
          </div>

          {/* BUTTON */}
          <PrimaryButton
            onClick={handleSubmit}
            className="mt-2 w-full"
          >
            Save & Analyze Resume
          </PrimaryButton>
        </GlassCard>
      </div>

      {/* LOADING */}
      {loading && (
        <div ref={loaderRef} className="mt-10 w-full max-w-5xl">

          <div className="flex animate-pulse flex-col items-center gap-6 rounded-2xl bg-white/75 p-10 shadow-md backdrop-blur-lg">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
            <p className="text-gray-500 text-sm">
              Analyzing your resume...
            </p>
          </div>
        </div>
      )}

      {/* RESULTS */}
      {!loading && analysisResult && (
        <div
          ref={resultRef}
          className="flex justify-center px-4 pb-20 w-full"
        >
          <div className="w-full max-w-6xl">
            <AnalysisResults data={analysisResult} />
          </div>
        </div>
      )}
    </div>
  );
}
