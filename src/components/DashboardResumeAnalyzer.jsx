import { useState } from "react";
import AnalysisResults from "./AnalysisResults";

export default function DashboardResumeAnalyzer() {

  const [resumeFile, setResumeFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setResumeFile(file);
      console.log("File selected:", file.name);
    }

    // ✅ IMPORTANT FIX (same file upload)
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
  };

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

      {/* FORM CARD */}
      <div className="flex justify-center px-4 py-14 w-full">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-10 space-y-5">

          {/* Company Name */}
          <div>
            <label className="text-xs text-gray-500">Company Name</label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Company name"
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="text-xs text-gray-500">Job Title</label>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Job title"
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="text-xs text-gray-500">Job Description</label>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Write a clear & concise job description with responsibilities & expectations..."
              className="mt-1 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Upload Resume */}
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

          {/* Analyze Button */}
          <button
            onClick={handleSubmit}
            className="mt-2 w-full rounded-full bg-linear-to-r from-purple-500 via-pink-500 to-purple-600 py-3 text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            Save & Analyze Resume
          </button>

        </div>
      </div>

      {/* RESULTS */}
      {analysisResult && (
        <div className="flex justify-center px-4 pb-20 w-full">
          <div className="w-full max-w-6xl">
            <AnalysisResults data={analysisResult} />
          </div>
        </div>
      )}

    </div>
  );
}