import React from "react";

const AnalysisResults = ({ data }) => {

  if (!data) return null;

  const score = data?.ats_score?.score || 0;

  // ⭐ Dynamic color based on ATS score
  let scoreColor = "border-red-500";

  if (score >= 71) {
    scoreColor = "border-green-500";
  } else if (score >= 41) {
    scoreColor = "border-yellow-400";
  } else {
    scoreColor = "border-red-500";
  }

  return (
    <div className="mt-10 space-y-6">

      {/* SCORE SECTION */}
      <div className="bg-white shadow-md rounded-xl p-6 flex gap-10 items-center">

        <div className="flex flex-col items-center">
          <div className={`w-24 h-24 rounded-full border-8 ${scoreColor} flex items-center justify-center text-xl font-bold`}>
            {score}
          </div>
          <p className="text-sm mt-2">ATS Score</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Summary</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            {data?.summary || "No summary available"}
          </p>
        </div>

      </div>

      {/* 🔥 GRID START */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* SKILLS MATCH */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="font-semibold mb-3 text-green-600">Skills Match</h3>

          <div className="flex flex-wrap gap-2">
            {data?.skills_match?.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* MISSING KEYWORDS */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="font-semibold mb-3 text-red-500">Missing Keywords</h3>

          <div className="flex flex-wrap gap-2">
            {data?.missing_keywords?.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
      {/* 🔥 GRID END */}

      {/* EXPERIENCE */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="font-semibold mb-2">Experience</h3>
        <p className="text-gray-600">
          {data?.experience_years || "No experience analysis available"}
        </p>
      </div>

      {/* SUGGESTIONS */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="font-semibold mb-3">Improvement Suggestions</h3>

        <ol className="list-decimal pl-5 text-gray-600">
          {data?.suggestions?.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </div>

    </div>
  );
};

export default AnalysisResults;