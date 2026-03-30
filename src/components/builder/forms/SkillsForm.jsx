import React, { useState } from "react";

const SkillsForm = ({ data, setData }) => {
  const [technicalInput, setTechnicalInput] = useState("");
  const [softInput, setSoftInput] = useState("");

  const technicalSkills = data.skills.technical;
  const softSkills = data.skills.soft;

  const addSkill = (type, value) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: [...prev.skills[type], trimmed],
      },
    }));
  };

  const removeSkill = (type, index) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: prev.skills[type].filter((_, i) => i !== index),
      },
    }));
  };

  const handleKeyDown = (e, type) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (type === "technical") {
        addSkill(type, technicalInput);
        setTechnicalInput("");
      } else {
        addSkill(type, softInput);
        setSoftInput("");
      }
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold">
          What are your superpowers?
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Add relevant skills to boost ATS compatibility and recruiter appeal.
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white/60 backdrop-blur-lg rounded-xl border border-gray-100 p-5 shadow-sm space-y-6">

        {/* TECHNICAL SKILLS */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Technical Skills
          </label>

          <input
            type="text"
            value={technicalInput}
            onChange={(e) => setTechnicalInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "technical")}
            placeholder="Add technical skill and press Enter"
            className="mt-2 w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex flex-wrap gap-2 mt-3">
            {technicalSkills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => removeSkill("technical", i)}
                  className="text-xs hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* SOFT SKILLS */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Soft Skills
          </label>

          <input
            type="text"
            value={softInput}
            onChange={(e) => setSoftInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "soft")}
            placeholder="Add soft skill and press Enter"
            className="mt-2 w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex flex-wrap gap-2 mt-3">
            {softSkills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => removeSkill("soft", i)}
                  className="text-xs hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* AI TIP CARD */}
        <div className="bg-purple-100/60 border border-purple-200 rounded-xl p-4 text-sm text-purple-800">
          💡 <span className="font-medium">AI Insight:</span> Include both
          technical and soft skills like <span className="font-semibold">React</span>,
          <span className="font-semibold"> API Integration</span>, and
          <span className="font-semibold"> Problem Solving</span> to improve ATS ranking.
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;