import React from "react";

const ResumePreview = ({ data }) => {
  const {
    personal = {},
    experience = [],
    education = [],
    projects = [],
    skills = { technical: [], soft: [], certifications: [] },
  } = data;

  return (
    <div
      id="resume-preview"
      className="bg-white shadow-md rounded-xl border border-gray-200 p-8 text-[14px] leading-[1.6] text-gray-900 w-full mx-auto break-words"
      style={{ transform: "none" }}
    >

      {/* HEADER */}
      <div className="text-center border-b border-gray-300 pb-4 mb-5">
        <h1 className="text-3xl font-bold break-words">
          {personal.name || "Your Name"}
        </h1>

        <div className="mt-2 text-xs text-gray-700 flex flex-wrap justify-center gap-2 break-all">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>| {personal.phone}</span>}
          {personal.location && <span>| {personal.location}</span>}

          {personal.linkedin && (
            <span>
              |{" "}
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 hover:underline"
              >
                LinkedIn
              </a>
            </span>
          )}

          {personal.portfolio && (
            <span>
              |{" "}
              <a
                href={personal.portfolio}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 hover:underline"
              >
                Portfolio
              </a>
            </span>
          )}
        </div>
      </div>

      {/* EDUCATION */}
      <section className="mb-5">
        <h2 className="font-bold text-[18px] uppercase border-b border-gray-400 mb-2">
          Education
        </h2>

        {education.map((edu, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between font-semibold gap-4">
              <span className="break-words">{edu.school}</span>
              <span className="text-xs whitespace-nowrap">
                {edu.end}
              </span>
            </div>

            <p className="text-sm break-words">
              {edu.degree}
              {edu.field && `, ${edu.field}`}
            </p>

            {edu.gpa && <p className="text-sm">CGPA: {edu.gpa}</p>}
          </div>
        ))}
      </section>

      {/* EXPERIENCE */}
      <section className="mb-5">
        <h2 className="font-bold text-[18px] uppercase border-b border-gray-400 mb-2">
          Work Experience
        </h2>

        {experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between font-semibold gap-4">
              <span className="break-words">{exp.company}</span>
              <span className="text-xs whitespace-nowrap">
                {exp.start} - {exp.end}
              </span>
            </div>

            <p className="italic break-words">{exp.jobTitle}</p>

            <div className="mt-2 space-y-2">
              {exp.responsibilities
                ?.split("\n")
                .filter(Boolean)
                .map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="mt-1 shrink-0">•</span>
                    <p className="flex-1 break-words leading-[1.6]">
                      {line}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>

      {/* PROJECTS */}
      <section className="mb-5">
        <h2 className="font-bold text-[18px] uppercase border-b border-gray-400 mb-2">
          Projects
        </h2>

        {projects.map((project, i) => (
          <div key={i} className="mb-4">
            <p className="font-semibold break-words">
              {project.title || "Project Title"}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2 text-blue-700 text-sm font-normal hover:underline"
                >
                  | GitHub
                </a>
              )}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2 text-green-700 text-sm font-normal hover:underline"
                >
                  | Live
                </a>
              )}
            </p>

            {project.techStack && (
              <p className="text-sm break-words">
                <span className="font-medium">Tech:</span>{" "}
                {project.techStack}
              </p>
            )}

            <div className="mt-2 space-y-2">
              {project.description
                ?.split("\n")
                .filter(Boolean)
                .map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="mt-1 shrink-0">•</span>
                    <p className="flex-1 break-words leading-[1.6]">
                      {line}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>

      {/* SKILLS */}
      <section className="mb-5">
        <h2 className="font-bold text-[18px] uppercase border-b border-gray-400 mb-2">
          Skills
        </h2>

        <p>
          <span className="font-semibold">Technical:</span>{" "}
          {skills.technical.join(", ") || "—"}
        </p>

        <p>
          <span className="font-semibold">Soft Skills:</span>{" "}
          {skills.soft.join(", ") || "—"}
        </p>
      </section>

      {/* CERTIFICATIONS */}
      {skills.certifications?.length > 0 && (
        <section>
          <h2 className="font-bold text-[18px] uppercase border-b border-gray-400 mb-2">
            Certifications
          </h2>

          <div className="space-y-2">
            {skills.certifications.map((cert, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1 shrink-0">•</span>

                <p className="flex-1 break-words">
                  {typeof cert === "string" ? (
                    cert
                  ) : (
                    <>
                      {cert.name}
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 text-blue-700 hover:underline"
                        >
                          (View)
                        </a>
                      )}
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;