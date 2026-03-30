import React from "react";

const EducationForm = ({ data, setData }) => {
  const education = data.education;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [name]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold">
          Tell us about your education
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Highlight your academic journey and achievements.
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white/60 backdrop-blur-lg rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
        {/* SCHOOL */}
        <input
          type="text"
          name="school"
          value={education.school}
          onChange={handleChange}
          placeholder="School / University"
          className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* DEGREE + FIELD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="degree"
            value={education.degree}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Degree</option>
            <option value="Bachelor's">Bachelor's</option>
            <option value="Master's">Master's</option>
            <option value="Diploma">Diploma</option>
            <option value="PhD">PhD</option>
          </select>

          <input
            type="text"
            name="field"
            value={education.field}
            onChange={handleChange}
            placeholder="Field of Study"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* ✅ START + END DATE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="start"
            value={education.start || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="date"
            name="end"
            value={education.end || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* GPA */}
        <input
          type="text"
          name="gpa"
          value={education.gpa}
          onChange={handleChange}
          placeholder="GPA / CGPA (Optional)"
          className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* AI TIP CARD */}
        <div className="bg-purple-100/60 border border-purple-200 rounded-xl p-4 text-sm text-purple-800">
          💡 <span className="font-medium">AI Insight:</span> Mention relevant
          coursework, honors, certifications, or thesis topics to strengthen
          fresher ATS matching.
        </div>
      </div>
    </div>
  );
};

export default EducationForm;