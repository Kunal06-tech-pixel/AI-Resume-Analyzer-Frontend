import React, { useEffect, useState } from "react";

const AnalysisResults = ({ data }) => {

  if (!data) return null;

  const score = data?.ats_score?.score || 0;

  const [progress, setProgress] = useState(0);

  // ⭐ Animate score
  useEffect(() => {
    let start = 0;

    const interval = setInterval(() => {
      start += 1;
      if (start >= score) {
        start = score;
        clearInterval(interval);
      }
      setProgress(start);
    }, 15);

    return () => clearInterval(interval);
  }, [score]);

  // ⭐ Dynamic color
  let strokeColor = "#ef4444";

  if (score >= 71) strokeColor = "#22c55e";
  else if (score >= 41) strokeColor = "#facc15";

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="mt-10 space-y-6">

      {/* SCORE + SUMMARY */}
      <div className="
        bg-white/80 backdrop-blur-lg shadow-md rounded-xl p-6 flex gap-10 items-center
        transition-all duration-300
        hover:-translate-y-1 hover:scale-[1.01]
        hover:shadow-[0_10px_30px_rgba(168,85,247,0.2)]
      ">

        {/* CIRCLE */}
        <div className="flex flex-col items-center">

          <svg width="120" height="120">
            <circle cx="60" cy="60" r={radius} stroke="#e5e7eb" strokeWidth="10" fill="none" />

            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke={strokeColor}
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />

            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xl font-bold fill-gray-800"
            >
              {progress}
            </text>
          </svg>

          <p className="text-sm mt-2">ATS Score</p>
        </div>

        {/* SUMMARY */}
        <div>
          <h3 className="font-bold text-lg">Summary</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            {data?.summary || "No summary available"}
          </p>
        </div>

      </div>

      {/* GRID */}
      <div className="group grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* SKILLS MATCH */}
        <div className="
          bg-white/80 backdrop-blur-lg shadow-md rounded-xl p-6
          transition-all duration-300
          group-hover:opacity-60 hover:opacity-100
          hover:-translate-y-1 hover:scale-[1.02]
          hover:shadow-[0_10px_30px_rgba(34,197,94,0.25)]
        ">
          <h3 className="font-bold mb-3 text-green-600">Skills Match</h3>

          <div className="flex flex-wrap gap-2">
            {data?.skills_match?.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* MISSING KEYWORDS */}
        <div className="
          bg-white/80 backdrop-blur-lg shadow-md rounded-xl p-6
          transition-all duration-300
          group-hover:opacity-60 hover:opacity-100
          hover:-translate-y-1 hover:scale-[1.02]
          hover:shadow-[0_10px_30px_rgba(239,68,68,0.25)]
        ">
          <h3 className="font-bold mb-3 text-red-500">Missing Keywords</h3>

          <div className="flex flex-wrap gap-2">
            {data?.missing_keywords?.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* EXPERIENCE */}
      <div className="
        bg-white/80 backdrop-blur-lg shadow-md rounded-xl p-6
        transition-all duration-300
        hover:-translate-y-1 hover:scale-[1.01]
        hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]
      ">
        <h3 className="font-bold mb-2">Experience</h3>
        <p className="text-gray-600">
          {data?.experience_years || "No experience analysis available"}
        </p>
      </div>

      {/* SUGGESTIONS */}
      <div className="
        bg-white/80 backdrop-blur-lg shadow-md rounded-xl p-6
        transition-all duration-300
        hover:-translate-y-1 hover:scale-[1.01]
        hover:shadow-[0_10px_30px_rgba(99,102,241,0.2)]
      ">
        <h3 className="font-bold mb-3">Improvement Suggestions</h3>

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