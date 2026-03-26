import { useState, useRef, useEffect } from "react";
import AnalysisResults from "./AnalysisResults";

export default function DashboardResumeAnalyzer() {

  const [resumeFile, setResumeFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  // ✅ NEW REFS
  const loaderRef = useRef(null);
  const resultRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setResumeFile(file);
      console.log("File selected:", file.name);
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

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("companyName", companyName);
    formData.append("jobTitle", jobTitle);
    formData.append("jobDescription", jobDescription);

    try {

      const res = await fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      console.log("SERVER RESPONSE:", data);

      setAnalysisResult(data.analysis.raw_output);

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }

    setLoading(false);
  };

  // ✅ AUTO SCROLL TO LOADER
  useEffect(() => {
    if (loading && loaderRef.current) {
      loaderRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  // ✅ AUTO SCROLL TO RESULTS
  useEffect(() => {
    if (!loading && analysisResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [analysisResult, loading]);

  return (
    <div className="flex flex-col items-center mt-10 px-4">

      {/* HERO */}
      <h1 className="text-4xl font-bold leading-tight">
        Smart feedback for your
        <span className="block bg-linear-to-r from-purple-500 via-pink-500 to-purple-600 bg-clip-text text-transparent text-center">
          DREAM JOB
        </span>
      </h1>

      <p className="mt-4 max-w-xl text-sm text-gray-500">
        Drop your resume to get an ATS score, detailed insights, and
        improvement suggestions tailored to your job role.
      </p>

      {/* FORM */}
      <div className="flex justify-center px-4 py-14 w-full">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-10 space-y-5">

          <div>
            <label className="text-xs text-gray-500">Company Name</label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Company name"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Job Title</label>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Job title"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Job Description</label>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Write a clear & concise job description..."
              className="mt-1 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Upload */}
          <div>
            <label className="text-xs text-gray-500">Upload Resume</label>

            <div className="mt-2 flex flex-col items-center">

              <label className="flex h-32 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-pink-300 bg-white text-center cursor-pointer hover:border-pink-400 transition">

                {resumeFile ? (
                  <p className="text-sm font-medium text-green-600">
                    {resumeFile.name}
                  </p>
                ) : (
                  <>
                    <p className="text-sm font-medium text-gray-700">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      PDF, DOCX, PNG or JPG (max. 10MB)
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </label>

              {resumeFile && (
                <button
                  type="button"
                  onClick={handleClearFile}
                  className="mt-2 text-xs text-red-500 hover:underline"
                >
                  Remove file
                </button>
              )}

            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="mt-2 w-full rounded-full bg-linear-to-r from-purple-500 via-pink-500 to-purple-600 py-3 text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            Save & Analyze Resume
          </button>

        </div>
      </div>

      {/* 🔥 LOADING */}
      {loading && (
        <div ref={loaderRef} className="mt-10 w-full max-w-5xl">

          <div className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center gap-6 animate-pulse">

            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

            <p className="text-gray-500 text-sm">Analyzing your resume...</p>

            <div className="flex gap-10 mt-4">
              <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
              <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
            </div>

            <div className="w-full mt-6 space-y-3">
              <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {[1,2,3,4].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 space-y-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* RESULTS */}
      {!loading && analysisResult && (
        <div ref={resultRef} className="flex justify-center px-4 pb-20 w-full">
          <div className="w-full max-w-6xl">
            <AnalysisResults data={analysisResult} />
          </div>
        </div>
      )}

    </div>
  );
}