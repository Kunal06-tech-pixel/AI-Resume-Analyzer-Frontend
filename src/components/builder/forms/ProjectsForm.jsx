import React from "react";

const emptyProject = {
  title: "",
  techStack: "",
  description: "",
  link: "",
};

const ProjectsForm = ({ data, setData }) => {
  const projects = data.projects || [emptyProject];

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setData((prev) => {
      const updatedProjects = [...prev.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [name]: value,
      };

      return {
        ...prev,
        projects: updatedProjects,
      };
    });
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...emptyProject }],
    }));
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Showcase your projects
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Add portfolio, internship, or academic projects.
          </p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="px-4 py-2 rounded-lg bg-linear-to-r from-purple-500 to-blue-500 text-white text-sm shadow-md hover:scale-105 transition"
        >
          + Add
        </button>
      </div>

      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-white/60 backdrop-blur-lg rounded-xl border border-gray-100 p-5 shadow-sm space-y-4"
        >
          {/* LABEL */}
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-800">
              Project {index + 1}
            </h3>
            <span className="text-xs text-gray-400">
              Work #{index + 1}
            </span>
          </div>

          {/* TITLE */}
          <input
            type="text"
            name="title"
            value={project.title}
            onChange={(e) => handleChange(index, e)}
            placeholder="Project Title"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* TECH STACK */}
          <input
            type="text"
            name="techStack"
            value={project.techStack}
            onChange={(e) => handleChange(index, e)}
            placeholder="Tech Stack (React, Node.js, MongoDB...)"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={project.description}
            onChange={(e) => handleChange(index, e)}
            rows="4"
            placeholder="Describe what this project does, your contribution, and impact..."
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none resize-none focus:ring-2 focus:ring-blue-400"
          />

          {/* LINK */}
          <input
            type="text"
            name="link"
            value={project.link}
            onChange={(e) => handleChange(index, e)}
            placeholder="Project Link / GitHub URL"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectsForm;