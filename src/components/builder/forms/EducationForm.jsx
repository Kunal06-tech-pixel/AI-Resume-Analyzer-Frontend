import React from "react";

const emptyEducation = {
  school: "",
  degree: "",
  field: "",
  start: "",
  end: "",
  gpa: "",
};

const EducationForm = ({ data, setData }) => {
  const educationList = data.education || [emptyEducation];

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setData((prev) => {
      const updated = [...prev.education];
      updated[index] = {
        ...updated[index],
        [name]: value,
      };

      return {
        ...prev,
        education: updated,
      };
    });
  };

  const addEducation = () => {
    setData((prev) => ({
      ...prev,
      education: [...prev.education, { ...emptyEducation }],
    }));
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Tell us about your education
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Add all your academic qualifications.
          </p>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="px-4 py-2 rounded-lg bg-linear-to-r from-purple-500 to-blue-500 text-white text-sm shadow-md hover:scale-105 transition"
        >
          + Add
        </button>
      </div>

      {educationList.map((education, index) => (
        <div
          key={index}
          className="bg-white/60 backdrop-blur-lg rounded-xl border border-gray-100 p-5 shadow-sm space-y-4"
        >
          {/* TOP LABEL */}
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-800">
              Education {index + 1}
            </h3>
            <span className="text-xs text-gray-400">
              Degree #{index + 1}
            </span>
          </div>

          {/* SCHOOL */}
          <input
            type="text"
            name="school"
            value={education.school}
            onChange={(e) => handleChange(index, e)}
            placeholder="School / University"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* DEGREE + FIELD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="degree"
              value={education.degree}
              onChange={(e) => handleChange(index, e)}
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
              onChange={(e) => handleChange(index, e)}
              placeholder="Field of Study"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* START + END */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="start"
              value={education.start}
              onChange={(e) => handleChange(index, e)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="date"
              name="end"
              value={education.end}
              onChange={(e) => handleChange(index, e)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* GPA */}
          <input
            type="text"
            name="gpa"
            value={education.gpa}
            onChange={(e) => handleChange(index, e)}
            placeholder="GPA / CGPA (Optional)"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ))}
    </div>
  );
};

export default EducationForm;