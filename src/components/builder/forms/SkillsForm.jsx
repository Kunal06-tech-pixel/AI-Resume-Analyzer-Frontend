import React, { useState } from "react";

const SkillsForm = ({ data, setData }) => {
  const skills = data.skills;

  const [techInput, setTechInput] = useState("");
  const [softInput, setSoftInput] = useState("");
  const [certName, setCertName] = useState("");
  const [certLink, setCertLink] = useState("");

  // ADD SKILL
  const addSkill = (type, value) => {
    if (!value.trim()) return;

    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: [...prev.skills[type], value],
      },
    }));
  };

  // REMOVE SKILL
  const removeSkill = (type, index) => {
    setData((prev) => {
      const updated = [...prev.skills[type]];
      updated.splice(index, 1);

      return {
        ...prev,
        skills: {
          ...prev.skills,
          [type]: updated,
        },
      };
    });
  };

  // ADD CERTIFICATION
  const addCertification = () => {
    if (!certName.trim()) return;

    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        certifications: [
          ...prev.skills.certifications,
          { name: certName, link: certLink },
        ],
      },
    }));

    setCertName("");
    setCertLink("");
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold">
          What are your superpowers?
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Add skills & certifications to boost ATS compatibility.
        </p>
      </div>

      {/* ✅ MATCH EXPERIENCE CARD STYLE */}
      <div className="bg-white/60 backdrop-blur-lg rounded-xl border border-gray-100 p-5 shadow-sm space-y-6">

        {/* ================= TECHNICAL ================= */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Technical Skills
          </p>

          <input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill("technical", techInput);
                setTechInput("");
              }
            }}
            placeholder="Add technical skill and press Enter"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex flex-wrap gap-2 mt-2">
            {skills.technical.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 rounded-full text-xs flex items-center gap-1"
              >
                {skill}
                <button onClick={() => removeSkill("technical", i)}>×</button>
              </span>
            ))}
          </div>
        </div>

        {/* ================= SOFT ================= */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Soft Skills
          </p>

          <input
            value={softInput}
            onChange={(e) => setSoftInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill("soft", softInput);
                setSoftInput("");
              }
            }}
            placeholder="Add soft skill and press Enter"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex flex-wrap gap-2 mt-2">
            {skills.soft.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 rounded-full text-xs flex items-center gap-1"
              >
                {skill}
                <button onClick={() => removeSkill("soft", i)}>×</button>
              </span>
            ))}
          </div>
        </div>

        {/* ================= CERTIFICATIONS ================= */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Certifications
          </p>

          <input
            value={certName}
            onChange={(e) => setCertName(e.target.value)}
            placeholder="Certification name"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400 mb-2"
          />

          <input
            value={certLink}
            onChange={(e) => setCertLink(e.target.value)}
            placeholder="Certification link (optional)"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={addCertification}
            className="mt-3 text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition"
          >
            + Add Certification
          </button>

          {/* LIST */}
          <div className="flex flex-col gap-2 mt-3">
            {skills.certifications.map((cert, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg text-xs"
              >
                <span className="truncate">
                  {typeof cert === "string" ? cert : cert.name}
                </span>

                <button
                  onClick={() => removeSkill("certifications", i)}
                  className="ml-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AI TIP */}
        <div className="bg-purple-100/60 border border-purple-200 rounded-xl p-4 text-sm text-purple-800">
          💡 <span className="font-medium">AI Insight:</span> Include certifications like AWS, Google Cloud, or Coursera to boost ATS ranking.
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;