import { useState } from "react";
import AnalysisResults from "./AnalysisResults";

export default function DashboardResumeAnalyzer() {

  const [resumeFile, setResumeFile] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setResumeFile(file);
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
    <div className="min-h-screen flex flex-col items-center bg-[#eef1ff] px-4 py-10">

      <div className="w-full max-w-3xl rounded-3xl bg-linear-to-br from-[#f7f9ff] via-[#f2f4ff] to-[#fbecec] p-10 shadow-xl">

        {/* your form UI */}

        <button
          onClick={handleSubmit}
          className="mt-6 w-full rounded-full bg-indigo-500 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-600 transition"
        >
          Save & Analyze Resume
        </button>

      </div>

      {analysisResult && (
        <div className="w-full max-w-5xl mt-10">
          <AnalysisResults data={analysisResult} />
        </div>
      )}

    </div>
  );
}