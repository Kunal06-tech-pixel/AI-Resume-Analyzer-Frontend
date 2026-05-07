import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ChevronRight,
  Clock3,
  FileText,
  Loader2,
  Search,
} from "lucide-react";
import ScoreRing from "../components/ScoreRing";
import PageShell from "../components/ui/PageShell";
import { PrimaryButton } from "../components/ui/Buttons";
import api from "../services/axios";
import { useAuth } from "../context/useAuth";
import {
  compactFileName,
  formatRelativeTime,
  normalizeAnalysis,
} from "../utils/analysis";

const AnalysisRow = ({ analysis, onNavigate }) => {
  const normalized = normalizeAnalysis(analysis);
  if (!normalized) return null;

  const skills = normalized.skillsDetected.length
    ? normalized.skillsDetected
    : normalized.skillsMatch;
  const visibleSkills = skills.slice(0, 5);
  const remainingSkills = Math.max(0, skills.length - visibleSkills.length);

  return (
    <button
      type="button"
      onClick={() => onNavigate(normalized.id)}
      className="group grid w-full grid-cols-[56px_1fr_18px] items-center gap-4 rounded-2xl bg-white/75 p-4 text-left shadow-md backdrop-blur-lg transition hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-xl"
    >
      <ScoreRing
        score={normalized.atsScore.score}
        size={54}
        strokeWidth={4}
        animated={false}
      />

      <div className="min-w-0">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="flex min-w-0 items-center gap-1.5 text-sm font-semibold text-gray-900">
            <FileText size={14} className="shrink-0 text-purple-600" />
            <span className="truncate">{compactFileName(normalized.fileName)}</span>
          </h3>
          <span className="text-xs text-gray-400">
            {formatRelativeTime(normalized.createdAt)}
          </span>
          <span className="text-xs font-medium text-purple-600">
            ATS {normalized.atsScore.score}%
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {visibleSkills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="rounded-full bg-purple-100 px-2 py-0.5 text-[11px] font-medium text-purple-700"
            >
              {skill}
            </span>
          ))}
          {remainingSkills > 0 && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-700">
              +{remainingSkills}
            </span>
          )}
        </div>

        <p className="mt-2 line-clamp-1 text-xs leading-relaxed text-gray-500">
          {normalized.summary}
        </p>
      </div>

      <ChevronRight
        size={18}
        className="text-purple-300 transition group-hover:translate-x-0.5 group-hover:text-purple-600"
      />
    </button>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadAnalyses = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/api/resume/analyses");

        if (!active) return;

        const loadedAnalyses = res.data.analyses || [];
        setAnalyses(loadedAnalyses);
        setTotal(res.data.total ?? loadedAnalyses.length);
      } catch (err) {
        if (!active) return;
        console.error("Load analyses error:", err);
        setError("Could not load your recent analyses.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadAnalyses();

    return () => {
      active = false;
    };
  }, []);

  const handleNavigateToResume = (analysisId) => {
    navigate(`/resume/${analysisId}`);
  };

  const firstName = user?.name?.split(" ")?.[0];

  return (
    <PageShell className="mx-auto w-full max-w-3xl px-4 pb-20 pt-8 sm:px-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
          Welcome back{firstName ? `, ${firstName}` : ""}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          You&apos;ve analyzed {total} {total === 1 ? "resume" : "resumes"} so
          far. Keep improving.
        </p>
      </header>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-950">
            <Clock3 size={16} className="text-purple-500" />
            Recent Analyses
          </h2>
          <span className="text-xs text-gray-500">{total} total</span>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm text-red-700 shadow-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-2xl bg-white/70 shadow-md backdrop-blur-lg"
              />
            ))}
          </div>
        ) : analyses.length > 0 ? (
          <div className="space-y-3">
            {analyses.map((analysis) => {
              const normalized = normalizeAnalysis(analysis);

              return (
                <AnalysisRow
                  key={normalized?.id || analysis.id}
                  analysis={analysis}
                  onNavigate={handleNavigateToResume}
                />
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl bg-white/75 p-8 text-center shadow-md backdrop-blur-lg">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-purple-200 to-blue-200 text-purple-700">
              <Search size={22} />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-gray-950">
              No analyses yet
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Upload a PDF resume in the analyzer to create your first saved
              report.
            </p>
            <PrimaryButton
              onClick={() => navigate("/analyzer")}
              className="mt-5"
            >
              Analyze Resume
            </PrimaryButton>
          </div>
        )}
      </section>
    </PageShell>
  );
};

export default Dashboard;
