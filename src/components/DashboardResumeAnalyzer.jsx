import { useEffect, useRef, useState } from "react";
import {
  AlignLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  FileText,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import AnalysisResults from "./AnalysisResults";
import api from "../services/axios";
import { PrimaryButton, SecondaryButton } from "./ui/Buttons";
import { inputClass, labelClass } from "../utils/uiClasses";
import { useToast } from "./ui/useToast";

export default function DashboardResumeAnalyzer({ preloadedResult = null }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(preloadedResult || null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const loaderRef = useRef(null);
  const resultRef = useRef(null);
  const toast = useToast();

  const acceptFile = (file) => {
    if (!file) return;

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      toast.error("Please upload a PDF resume.");
      return;
    }

    setResumeFile(file);
    toast.success(file.name, "Resume ready");
  };

  const handleFileChange = (event) => {
    acceptFile(event.target.files[0]);
    event.target.value = null;
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    acceptFile(event.dataTransfer.files[0]);
  };

  const handleClearFile = () => {
    setResumeFile(null);
  };

  const handleSubmit = async () => {
    if (!resumeFile) {
      toast.error("Please upload a resume first.");
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
      toast.success("Your analysis report is ready.");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading && loaderRef.current) {
      loaderRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && analysisResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [analysisResult, loading]);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/[0.03]">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Analysis setup
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              Match your resume to a real role.
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Add job context for more relevant ATS scoring and suggestions.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className={labelClass}>Company Name</label>
              <div className="relative">
                <Building2
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                  className={`${inputClass} pl-9`}
                  placeholder="Company name"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Job Title</label>
              <div className="relative">
                <Briefcase
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={jobTitle}
                  onChange={(event) => setJobTitle(event.target.value)}
                  className={`${inputClass} pl-9`}
                  placeholder="Product Manager"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Job Description</label>
              <div className="relative">
                <AlignLeft
                  size={16}
                  className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                />
                <textarea
                  rows={7}
                  value={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  placeholder="Paste the job description or key responsibilities..."
                  className={`${inputClass} resize-none pl-9`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/[0.03]">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Upload
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                Add your resume PDF.
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                PDF only, up to 10MB. The file is sent to the existing analysis endpoint.
              </p>
            </div>
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-500">
              PDF
            </span>
          </div>

          <label
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center transition ${
              dragging
                ? "border-slate-500 bg-slate-100"
                : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-white"
            }`}
          >
            {resumeFile ? (
              <div className="w-full max-w-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700">
                  <CheckCircle2 size={22} />
                </div>
                <p className="truncate text-sm font-semibold text-slate-950">
                  {resumeFile.name}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm shadow-slate-950/[0.03]">
                  <Upload size={22} />
                </div>
                <p className="text-sm font-semibold text-slate-950">
                  Click to upload or drag and drop
                </p>
                <p className="mt-1 text-sm text-slate-500">PDF only, max 10MB</p>
              </>
            )}

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton onClick={handleSubmit} disabled={loading} className="flex-1">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
              {loading ? "Analyzing..." : "Save & Analyze Resume"}
            </PrimaryButton>

            {resumeFile && (
              <SecondaryButton type="button" onClick={handleClearFile}>
                <X size={16} />
                Remove
              </SecondaryButton>
            )}
          </div>
        </div>
      </section>

      {loading && (
        <section ref={loaderRef} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/[0.03]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600">
              <Loader2 size={22} className="animate-spin" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-950">Analyzing your resume</p>
              <p className="mt-1 text-sm text-slate-500">
                Parsing the PDF, generating AI feedback, and saving the report.
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-2/3 animate-pulse rounded-full bg-slate-950" />
              </div>
            </div>
          </div>
        </section>
      )}

      {!loading && analysisResult && (
        <section ref={resultRef}>
          <AnalysisResults data={analysisResult} />
        </section>
      )}
    </div>
  );
}
