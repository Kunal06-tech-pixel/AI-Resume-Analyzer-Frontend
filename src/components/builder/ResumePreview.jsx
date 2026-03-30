const ResumePreview = ({ data }) => {
  const { personal, experience, education, skills } = data;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-sm border border-gray-100">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {personal.name || "Your Name"}
        </h2>

        <p className="text-gray-600 mt-1">
          {personal.title || "Professional Title"}
        </p>

        <p className="text-gray-500 text-xs mt-2">
          {personal.email}
          {personal.phone && ` • ${personal.phone}`}
          {personal.location && ` • ${personal.location}`}
        </p>
      </div>

      {/* EXPERIENCE */}
      <div className="mb-6">
        <h3 className="font-semibold border-b border-gray-300 pb-1 mb-3">
          Experience
        </h3>

        {experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <p className="font-medium text-gray-900">
              {exp.jobTitle || "Job Title"}
            </p>

            <p className="text-xs text-gray-500">
              {exp.company || "Company"}
            </p>

            {(exp.start || exp.end) && (
              <p className="text-xs text-gray-400 mt-1">
                {exp.start || "Start"} - {exp.end || "End"}
              </p>
            )}

            <p className="text-xs text-gray-700 mt-2 leading-relaxed wrap-break-word whitespace-pre-line">
              {exp.responsibilities}
            </p>
          </div>
        ))}
      </div>

      {/* ✅ EDUCATION FIXED */}
      <div className="mb-6">
        <h3 className="font-semibold border-b border-gray-300 pb-1 mb-3">
          Education
        </h3>

        <p className="font-medium text-gray-900">
          {education.school || "School / University"}
        </p>

        <p className="text-xs text-gray-600 mt-1">
          {education.degree || "Degree"}
          {education.field && ` in ${education.field}`}
        </p>

        {/* ✅ START + END DATE */}
        {(education.start || education.end) && (
          <p className="text-xs text-gray-400 mt-1">
            {education.start || "Start"} - {education.end || "End"}
          </p>
        )}

        {/* ✅ GPA */}
        {education.gpa && (
          <p className="text-xs text-gray-500 mt-1">
            GPA / CGPA: {education.gpa}
          </p>
        )}
      </div>

      {/* SKILLS */}
      <div>
        <h3 className="font-semibold border-b border-gray-300 pb-1 mb-3">
          Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {skills.technical.map((skill, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-100 rounded text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;