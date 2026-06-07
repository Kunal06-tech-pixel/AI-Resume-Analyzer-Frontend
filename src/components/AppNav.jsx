import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, FileText, LayoutDashboard, Search, Sparkles } from "lucide-react";
import { useAuth } from "../context/useAuth";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Analyzer", to: "/analyzer", icon: Search },
  { label: "Builder", to: "/builder", icon: FileText },
];

const AppNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const goToLogin = () => navigate("/login", { state: { mode: "login" } });
  const goToSignup = () => navigate("/login", { state: { mode: "signup" } });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full px-4 py-4 sm:px-6 lg:px-8">
      <div className="glass-panel-strong mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-4 py-3">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex shrink-0 items-center gap-2 text-sm font-bold tracking-tight text-slate-950"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-white">
            <Sparkles size={16} />
          </span>
          ATSmind AI
        </button>

        <div className="hidden min-w-0 items-center gap-1 overflow-x-auto rounded-xl border border-white/60 bg-white/30 p-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;

            return (
              <button
                key={item.to}
                type="button"
                onClick={() => navigate(item.to)}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-white/55 text-slate-950 shadow-sm shadow-teal-950/[0.06] backdrop-blur-xl"
                    : "text-slate-500 hover:bg-white/30 hover:text-slate-950"
                }`}
              >
                <Icon size={15} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden max-w-40 shrink-0 truncate rounded-lg border border-white/60 bg-white/45 px-3 py-2 text-sm font-semibold text-teal-800 shadow-sm shadow-teal-950/[0.05] backdrop-blur-xl sm:inline">
                {user.name || user.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-teal-700/40 bg-slate-950 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-900/20 transition hover:-translate-y-0.5"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={goToLogin}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white/35 hover:text-slate-950"
              >
                Login
              </button>
              <button
                type="button"
                onClick={goToSignup}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-teal-700/40 bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-900/20 transition hover:-translate-y-0.5"
              >
                Sign Up
                <ArrowRight size={15} />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppNav;
