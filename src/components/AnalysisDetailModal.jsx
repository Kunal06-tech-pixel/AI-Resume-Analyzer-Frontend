import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileText,
  Lightbulb,
  ShieldX,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import ScoreRing from "./ScoreRing";
import { compactFileName, formatDateTime, normalizeAnalysis } from "../utils/analysis";

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
    return <p className="text-xs leading-relaxed text-gray-500">No items available.</p>;
  }

  return (
    <ul className={`list-disc space-y-2 pl-4 text-xs leading-relaxed text-gray-700 ${colors[tone]}`}>
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
    return <p className="text-xs leading-relaxed text-gray-500">No skills available.</p>;
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

const AnalysisDetailModal = ({ analysis, onClose }) => {
  const normalized = normalizeAnalysis(analysis);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!normalized) return null;

  const handleExport = async () => {
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
          addText(content.length ? content.map((item) => `- ${item}`).join("\n") : "No items available.");
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
      addText(`${normalized.fileName} | ATS Score: ${normalized.atsScore.score}%`, {
        size: 11,
        color: [37, 99, 235],
      });
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

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-10 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-3xl rounded-2xl border border-purple-100 bg-linear-to-br from-blue-50 via-white to-pink-100 p-5 shadow-2xl">
        <header className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="flex items-center gap-2 truncate text-sm font-semibold text-gray-950">
              <FileText size={17} className="text-purple-600" />
              <span className="truncate">{compactFileName(normalized.fileName)}</span>
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Analyzed on {formatDateTime(normalized.createdAt)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-500 transition hover:bg-purple-100 hover:text-purple-700"
            aria-label="Close analysis details"
          >
            <X size={17} />
          </button>
        </header>

        <div className="space-y-4">
          <section className="grid gap-6 rounded-2xl bg-white/75 p-6 shadow-sm backdrop-blur-lg md:grid-cols-[150px_1fr] md:items-center">
            <ScoreRing
              score={normalized.atsScore.score}
              size={132}
              strokeWidth={9}
              label="ATS Score"
            />

            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-950">Summary</h3>
              <p className="text-xs leading-6 text-gray-600">{normalized.summary}</p>
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-2">
            <SectionCard title="Strengths" icon={CheckCircle2} tone="green">
              <BulletList items={normalized.strengths} tone="green" />
            </SectionCard>

            <SectionCard title="Weaknesses" icon={AlertTriangle} tone="amber">
              <BulletList items={normalized.weaknesses} tone="amber" />
            </SectionCard>

            <SectionCard title="Skills Detected" icon={Zap} tone="violet">
              <SkillPills items={normalized.skillsDetected} />
            </SectionCard>

            <SectionCard title="Missing Skills" icon={ShieldX} tone="red">
              <SkillPills items={normalized.missingSkills} tone="red" />
            </SectionCard>
          </div>

          <SectionCard title="Experience Analysis" icon={Sparkles} tone="blue">
            <p className="text-xs leading-6 text-gray-600">
              {normalized.experienceAnalysis}
            </p>
          </SectionCard>

          <SectionCard title="Improvement Suggestions" icon={Lightbulb} tone="amber">
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

        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-purple-400 bg-white/60 px-4 text-xs font-medium text-purple-600 shadow-sm transition hover:bg-linear-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download size={14} />
            {exporting ? "Exporting..." : "Export as PDF"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetailModal;
