import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  Lightbulb,
  Loader2,
  ShieldX,
  Sparkles,
  Zap,
} from "lucide-react";
import ScoreRing from "../components/ScoreRing";
import FloatingChatButton from "../components/FloatingChatButton";
import PageShell from "../components/ui/PageShell";
import { PrimaryButton, SecondaryButton } from "../components/ui/Buttons";
import api from "../services/axios";
import {
  compactFileName,
  formatDateTime,
  normalizeAnalysis,
} from "../utils/analysis";

const SectionCard = ({ title, icon: Icon, tone = "slate", children }) => {
  const tones = {
    green: "text-purple-600",
    amber: "text-amber-500",
    red: "text-red-500",
    blue: "text-blue-600",
    violet: "text-violet-600",
    slate: "text-gray-700",
  };

  return (
    <section className="rounded-2xl bg-white/75 p-5 shadow-sm backdrop-blur-lg">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
        {Icon && <Icon size={17} className={tones[tone]} />}
        {title}
      </h3>
      {children}
    </section>
  );
};

const BulletList = ({ items, tone = "slate" }) => {
  const colors = {
    green: "marker:text-purple-500",
    amber: "marker:text-amber-500",
    red: "marker:text-red-500",
    violet: "marker:text-violet-500",
    slate: "marker:text-gray-400",
  };

  if (!items.length) {
    return (
      <p className="text-xs leading-relaxed text-gray-500">
        No items available.
      </p>
    );
  }

  return (
    <ul
      className={`list-disc space-y-2 pl-4 text-xs leading-relaxed text-gray-700 ${colors[tone]}`}
    >
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
};

const SkillPills = ({ items, tone = "slate" }) => {
  const styles = {
    slate: "bg-purple-100 text-purple-700",
    red: "bg-red-50 text-red-600 ring-red-200",
  };

  if (!items.length) {
    return (
      <p className="text-xs leading-relaxed text-gray-500">
        No skills available.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((skill, index) => (
        <span
          key={`${skill}-${index}`}
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-transparent ${styles[tone]}`}
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

const ResumeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    let active = true;

    const loadAnalysis = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await api.get(`/api/resume/analyses/${id}`);

        if (!active) return;

        setAnalysis(res.data.analysis);
      } catch (err) {
        if (!active) return;
        console.error("Load analysis error:", err);
        setError("Could not load this analysis.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadAnalysis();

    return () => {
      active = false;
    };
  }, [id]);

  const handleExport = async () => {
    if (!normalized) return;

    const baseName = normalized.fileName
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60);

    setExporting(true);

    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "letter" });
      const margin = 48;
      const maxWidth = 516;
      let y = 48;

      const addText = (text, options = {}) => {
        const {
          size = 10,
          style = "normal",
          color = [71, 85, 105],
          gap = 14,
        } = options;

        doc.setFont("helvetica", style);
        doc.setFontSize(size);
        doc.setTextColor(...color);

        const lines = doc.splitTextToSize(String(text || ""), maxWidth);

        if (y + lines.length * (size + 4) > 742) {
          doc.addPage();
          y = 48;
        }

        doc.text(lines, margin, y);
        y += lines.length * (size + 4) + gap;
      };

      const addSection = (title, content) => {
        addText(title, {
          size: 12,
          style: "bold",
          color: [15, 23, 42],
          gap: 8,
        });

        if (Array.isArray(content)) {
          addText(
            content.length
              ? content.map((item) => `- ${item}`).join("\n")
              : "No items available."
          );
          return;
        }

        addText(content || "No content available.");
      };

      addText("Resume Analysis Report", {
        size: 18,
        style: "bold",
        color: [15, 23, 42],
        gap: 8,
      });
      addText(
        `${normalized.fileName} | ATS Score: ${normalized.atsScore.score}%`,
        {
          size: 11,
          color: [37, 99, 235],
        }
      );
      addSection("Summary", normalized.summary);
      addSection("Strengths", normalized.strengths);
      addSection("Weaknesses", normalized.weaknesses);
      addSection("Skills Detected", normalized.skillsDetected.join(", "));
      addSection("Missing Skills", normalized.missingSkills.join(", "));
      addSection("Experience Analysis", normalized.experienceAnalysis);
      addSection("Improvement Suggestions", normalized.suggestions);

      doc.save(`${baseName || "resume"}-analysis.pdf`);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <PageShell className="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:px-6">
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-purple-500" />
        </div>
      </PageShell>
    );
  }

  if (error || !analysis) {
    return (
      <PageShell className="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:px-6">
        <div className="rounded-2xl bg-white/75 p-8 text-center shadow-md backdrop-blur-lg">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <AlertTriangle size={22} />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-gray-950">
            {error || "Analysis not found"}
          </h3>
          <SecondaryButton
            onClick={() => navigate("/dashboard")}
            className="mt-5"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </SecondaryButton>
        </div>
      </PageShell>
    );
  }

  const normalized = normalizeAnalysis(analysis);

  if (!normalized) {
    return (
      <PageShell className="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:px-6">
        <div className="rounded-2xl bg-white/75 p-8 text-center shadow-md backdrop-blur-lg">
          <h3 className="text-sm font-semibold text-gray-950">
            Invalid analysis data
          </h3>
          <SecondaryButton
            onClick={() => navigate("/dashboard")}
            className="mt-5"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </SecondaryButton>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell className="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:px-6">
      {/* Header */}
      <header className="mb-6">
        <SecondaryButton
          onClick={() => navigate("/dashboard")}
          className="mb-4"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </SecondaryButton>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-950">
              <FileText size={24} className="shrink-0 text-purple-600" />
              <span className="truncate">
                {compactFileName(normalized.fileName)}
              </span>
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Analyzed on {formatDateTime(normalized.createdAt)}
            </p>
          </div>

          <PrimaryButton
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            {exporting ? "Exporting..." : "Export PDF"}
          </PrimaryButton>
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-4">
        {/* Score Summary */}
        <section className="grid gap-6 rounded-2xl bg-white/75 p-6 shadow-sm backdrop-blur-lg md:grid-cols-[150px_1fr] md:items-center">
            <ScoreRing
              score={normalized.atsScore.score}
              size={132}
              strokeWidth={9}
              label="ATS Score"
            />

            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-950">
                Summary
              </h3>
              <p className="text-xs leading-6 text-gray-600">
                {normalized.summary}
              </p>
            </div>
          </section>

          {/* Strengths & Weaknesses */}
          <div className="grid gap-4 md:grid-cols-2">
            <SectionCard title="Strengths" icon={CheckCircle2} tone="green">
              <BulletList items={normalized.strengths} tone="green" />
            </SectionCard>

            <SectionCard title="Weaknesses" icon={AlertTriangle} tone="amber">
              <BulletList items={normalized.weaknesses} tone="amber" />
            </SectionCard>
          </div>

          {/* Skills */}
          <div className="grid gap-4 md:grid-cols-2">
            <SectionCard title="Skills Detected" icon={Zap} tone="violet">
              <SkillPills items={normalized.skillsDetected} />
            </SectionCard>

            <SectionCard title="Missing Skills" icon={ShieldX} tone="red">
              <SkillPills items={normalized.missingSkills} tone="red" />
            </SectionCard>
          </div>

          {/* Experience Analysis */}
          <SectionCard title="Experience Analysis" icon={Sparkles} tone="blue">
            <p className="text-xs leading-6 text-gray-600">
              {normalized.experienceAnalysis}
            </p>
          </SectionCard>

          {/* Improvement Suggestions */}
          <SectionCard
            title="Improvement Suggestions"
            icon={Lightbulb}
            tone="amber"
          >
            <ol className="list-decimal space-y-2 pl-4 text-xs leading-relaxed text-gray-700 marker:text-violet-500">
              {normalized.suggestions.length ? (
                normalized.suggestions.map((suggestion, index) => (
                  <li key={`${suggestion}-${index}`}>{suggestion}</li>
                ))
              ) : (
                <li>No suggestions available.</li>
              )}
            </ol>
          </SectionCard>
      </div>

      {/* Floating Chat Button */}
      <FloatingChatButton
        analysisId={id}
        fileName={normalized.fileName}
      />
    </PageShell>
  );
};

export default ResumeDetail;
