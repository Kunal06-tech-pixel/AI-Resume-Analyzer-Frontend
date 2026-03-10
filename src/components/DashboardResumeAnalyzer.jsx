import { useState } from "react";

export default function DashboardResumeAnalyzer() {

  const [resumeFile, setResumeFile] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
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

      console.log("Analysis Result:", data);

      alert("Resume uploaded successfully!");

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef1ff] px-4">
      <div className="w-full max-w-3xl rounded-3xl bg-linear-to-br from-[#f7f9ff] via-[#f2f4ff] to-[#fbecec] p-10 shadow-xl">

        {/* Title */}
        <h1 className="text-4xl font-semibold leading-tight text-gray-900">
          Smart feedback <br />
          <span className="text-indigo-500">for your dream</span>{" "}
          <span className="text-black">job</span>
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Drop your resume for an ATS score and improvement tips.
        </p>

        {/* Form */}
        <div className="mt-8 space-y-5">

          {/* Company */}
          <div>
            <label className="text-xs text-gray-500">Company Name</label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Company name"
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="text-xs text-gray-500">Job Title</label>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
              className="mt-1 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Upload Resume */}
          <div>
            <label className="text-xs text-gray-500">Upload Resume</label>

            <label className="mt-2 flex h-32 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-white text-center cursor-pointer hover:border-indigo-400 transition">

              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                📄
              </div>

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
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full rounded-full bg-indigo-500 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-600 transition"
          >
            Save & Analyze Resume
          </button>

        </div>
      </div>
    </div>
  );
}