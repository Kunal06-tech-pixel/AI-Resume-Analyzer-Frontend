import React from "react";

const ExperienceCard = ({ exp, index, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      const updatedExperience = [...prev.experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [name]: value,
      };

      return {
        ...prev,
        experience: updatedExperience,
      };
    });
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">
          Experience {index + 1}
        </h3>

        <span className="text-xs text-gray-400">
          Role #{index + 1}
        </span>
      </div>

      {/* ROW 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="jobTitle"
          value={exp.jobTitle}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="company"
          value={exp.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="date"
          name="start"
          value={exp.start}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="date"
          name="end"
          value={exp.end}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* RESPONSIBILITIES */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Responsibilities
          </label>

          <button
            type="button"
            className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
          >
            ✨ AI Suggestions
          </button>
        </div>

        <textarea
          name="responsibilities"
          value={exp.responsibilities}
          onChange={handleChange}
          rows="5"
          placeholder="Describe your key achievements, impact, and technologies used..."
          className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none resize-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* AI TIP */}
      <div className="bg-purple-100/60 border border-purple-200 rounded-xl p-4 text-sm text-purple-800">
        💡 <span className="font-medium">AI Insight:</span> Start bullet points
        with action verbs like <span className="font-semibold">“Built”</span>,
        <span className="font-semibold"> “Optimized”</span>, or
        <span className="font-semibold"> “Developed”</span>.
      </div>
    </div>
  );
};

export default ExperienceCard;