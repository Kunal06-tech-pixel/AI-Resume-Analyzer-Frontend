const ResumePreview = ({ data }) => {
  const {
    personal,
    experience = [],
    education = [],
    projects = [],
    skills = { technical: [], soft: [] },
  } = data;

  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-200 p-8 text-[13px] leading-relaxed text-gray-900">
      {/* ================= HEADER ================= */}
      <div className="text-center border-b border-gray-300 pb-4 mb-5">
        <h1 className="text-3xl font-bold">
          {personal.name || "Your Name"}
        </h1>

        <div className="mt-2 text-xs text-gray-700 flex flex-wrap justify-center gap-2">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>| {personal.phone}</span>}
          {personal.location && <span>| {personal.location}</span>}
          {personal.linkedin && <span>| {personal.linkedin}</span>}
          {personal.portfolio && <span>| {personal.portfolio}</span>}
        </div>
      </div>

      {/* ================= EDUCATION ================= */}
      <section className="mb-5">
        <h2 className="font-bold text-[18px] uppercase border-b border-gray-400 mb-2">
          Education
        </h2>

        {education.map((edu, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between font-semibold">
              <span>{edu.school}</span>
              <span>{edu.end}</span>
            </div>

            <p className="text-sm">
              {edu.degree}
              {edu.field && `, ${edu.field}`}
            </p>

            {edu.gpa && (
              <p className="text-sm">CGPA: {edu.gpa}</p>
            )}
          </div>
        ))}
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="mb-5">
        <h2 className="font-bold text-[18px] uppercase border-b border-gray-400 mb-2">
          Work Experience
        </h2>

        {experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between font-semibold">
              <span>{exp.company}</span>
              <span>
                {exp.start} - {exp.end}
              </span>
            </div>

            <p className="italic">{exp.jobTitle}</p>

            <div className="mt-1 whitespace-pre-line">
              {exp.responsibilities
                ?.split("\n")
                .filter(Boolean)
                .map((line, idx) => (
                  <p key={idx}>• {line}</p>
                ))}
            </div>
          </div>
        ))}
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="mb-5">
        <h2 className="font-bold text-[18px] uppercase border-b border-gray-400 mb-2">
          Projects
        </h2>

        {projects.map((project, i) => (
          <div key={i} className="mb-4">
            <p className="font-semibold">
              {project.title}
              {project.link && (
                <span className="font-normal text-blue-700">
                  {" "}
                  | GitHub Link
                </span>
              )}
            </p>

            {project.techStack && (
              <p className="text-sm">
                <span className="font-medium">Tech:</span>{" "}
                {project.techStack}
              </p>
            )}

            {project.description && (
              <div className="mt-1 whitespace-pre-line">
                {project.description
                  ?.split("\n")
                  .filter(Boolean)
                  .map((line, idx) => (
                    <p key={idx}>• {line}</p>
                  ))}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ================= SKILLS ================= */}
      <section>
        <h2 className="font-bold text-[18px] uppercase border-b border-gray-400 mb-2">
          Skills
        </h2>

        <p>
          <span className="font-semibold">Technical:</span>{" "}
          {skills.technical.join(", ")}
        </p>

        <p>
          <span className="font-semibold">Soft Skills:</span>{" "}
          {skills.soft.join(", ")}
        </p>
      </section>
    </div>
  );
};

export default ResumePreview;