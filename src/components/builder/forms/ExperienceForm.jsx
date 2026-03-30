import React from "react";
import ExperienceCard from "./ExperienceCard";

const ExperienceForm = ({ data, setData }) => {
  const addExperience = () => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          jobTitle: "",
          company: "",
          start: "",
          end: "",
          responsibilities: "",
        },
      ],
    }));
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Tell us about your experience
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Add all your relevant roles. Multiple experiences supported.
          </p>
        </div>

        {/* ✅ ADD EXPERIENCE BUTTON */}
        <button
          type="button"
          onClick={addExperience}
          className="
            px-4 py-2
            rounded-lg
            bg-linear-to-r from-purple-500 to-blue-500
            text-white text-sm font-medium
            shadow-md
            hover:shadow-lg hover:scale-105
            transition-all duration-300
          "
        >
          + Add
        </button>
      </div>

      {/* ✅ MULTIPLE EXPERIENCE CARDS */}
      <div className="space-y-5">
        {data.experience.map((exp, index) => (
          <ExperienceCard
            key={index}
            exp={exp}
            index={index}
            setData={setData}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;