import { useLocation } from "react-router-dom";
import DashboardResumeAnalyzer from "../components/DashboardResumeAnalyzer";
import PageShell from "../components/ui/PageShell";

const Analyzer = () => {
  const location = useLocation();
  const preloadedResult = location.state?.analysisResult || null;

  return (
    <PageShell>
      <DashboardResumeAnalyzer preloadedResult={preloadedResult} />
    </PageShell>
  );
};

export default Analyzer;
