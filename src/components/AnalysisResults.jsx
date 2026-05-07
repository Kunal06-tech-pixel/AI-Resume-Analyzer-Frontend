import ScoreRing from "./ScoreRing";
import { normalizeAnalysis } from "../utils/analysis";
import FloatingChatButton from "./FloatingChatButton"; // ✅ UPDATED IMPORT

const PillList = ({ items, tone = "green" }) => {
  const styles = {
    green: "bg-purple-100 text-purple-700 ring-purple-200",
    red: "bg-red-50 text-red-600 ring-red-200",
    slate: "bg-blue-100 text-blue-700 ring-blue-200",
  };

  if (!items.length) {
    return <p className="text-sm text-gray-500">No items available.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className={`rounded-full px-3 py-1 text-sm font-medium ring-1 ${styles[tone]}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

const AnalysisResults = ({ data }) => {
  const analysis = normalizeAnalysis(data);

  if (!analysis) return null;

  return (
    <div className="mt-10 space-y-6">
      <div className="flex flex-col gap-8 rounded-2xl bg-white/75 p-6 shadow-md backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:flex-row md:items-center">
        <ScoreRing
          score={analysis.atsScore.score}
          size={120}
          strokeWidth={10}
          label="ATS Score"
        />

        <div>
          <h3 className="text-lg font-bold text-gray-950">Summary</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            {analysis.summary}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white/75 p-6 shadow-md backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="mb-3 font-bold text-purple-600">Skills Detected</h3>
          <PillList items={analysis.skillsDetected} />
        </div>

        <div className="rounded-2xl bg-white/75 p-6 shadow-md backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="mb-3 font-bold text-red-500">Missing Skills</h3>
          <PillList items={analysis.missingSkills} tone="red" />
        </div>
      </div>

      <div className="rounded-2xl bg-white/75 p-6 shadow-md backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <h3 className="mb-2 font-bold text-gray-950">Experience Analysis</h3>
        <p className="text-sm leading-relaxed text-gray-600">
          {analysis.experienceAnalysis}
        </p>
      </div>

      <div className="rounded-2xl bg-white/75 p-6 shadow-md backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <h3 className="mb-3 font-bold text-gray-950">Improvement Suggestions</h3>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-600 marker:text-purple-500">
          {analysis.suggestions.length ? (
            analysis.suggestions.map((suggestion, index) => (
              <li key={`${suggestion}-${index}`}>{suggestion}</li>
            ))
          ) : (
            <li>No suggestions available.</li>
          )}
        </ol>
      </div>

      {/* ✅ FLOATING CHAT BUTTON */}
      <FloatingChatButton 
        analysisId={analysis.id} 
        fileName={analysis.fileName}
      />
    </div>
  );
};

export default AnalysisResults;
