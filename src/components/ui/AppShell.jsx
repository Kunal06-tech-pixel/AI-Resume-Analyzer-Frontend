import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Analyzer", to: "/analyzer", icon: Search },
  { label: "Builder", to: "/builder", icon: FileText },
];

const NavList = ({ onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = location.pathname === item.to;

        return (
          <button
            key={item.to}
            type="button"
            onClick={() => {
              navigate(item.to);
              onNavigate?.();
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-slate-950 text-white shadow-sm shadow-slate-950/15"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            }`}
          >
            <Icon size={17} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

const UserBlock = ({ user, onLogout }) => {
  const label = user?.name || user?.email || "Account";
  const initials = label
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm shadow-slate-950/[0.03]">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-xs font-bold text-white">
          {initials || "A"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-950">{label}</p>
          <p className="text-xs text-slate-500">Workspace</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-md p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          aria-label="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );
};

const AppShell = ({ title, description, actions, children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="glass-theme theme-bg min-h-screen text-slate-950">
      <aside className="glass-panel fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/60 px-4 py-5 xl:block">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-7 flex items-center gap-3 rounded-lg px-2 text-left"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-white">
            <Sparkles size={18} />
          </span>
          <span>
            <span className="block text-sm font-bold tracking-tight text-slate-950">
              ATSmind AI
            </span>
            <span className="block text-xs text-slate-500">Resume intelligence</span>
          </span>
        </button>

        <NavList />

        <div className="absolute bottom-5 left-4 right-4">
          <div className="mb-3 rounded-lg border border-white/60 bg-white/45 p-3 shadow-sm shadow-teal-950/5 backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
              ATS Suite
            </p>
            <p className="mt-1 text-sm leading-5 text-blue-950">
              Analyze, improve, and export a job-ready resume.
            </p>
          </div>
          <UserBlock user={user} onLogout={handleLogout} />
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/35 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Close navigation overlay"
          />
          <div className="glass-panel-strong relative flex h-full w-[min(20rem,88vw)] flex-col border-r border-white/60 p-4">
            <div className="mb-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center gap-3"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-white">
                  <Sparkles size={18} />
                </span>
                <span className="text-sm font-bold text-slate-950">ATSmind AI</span>
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-slate-200 p-2 text-slate-500"
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>
            </div>
            <NavList onNavigate={() => setOpen(false)} />
            <div className="mt-auto">
              <UserBlock user={user} onLogout={handleLogout} />
            </div>
          </div>
        </div>
      )}

      <div className="xl:pl-72">
        <header className="sticky top-0 z-30 border-b border-white/50 bg-white/45 shadow-sm shadow-teal-950/5 backdrop-blur-2xl">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 shadow-sm shadow-slate-950/[0.03] xl:hidden"
                aria-label="Open navigation"
              >
                <Menu size={18} />
              </button>
              <div className="min-w-0">
                <h1 className="truncate text-base font-semibold tracking-tight text-slate-950 sm:text-lg">
                  {title}
                </h1>
                {description && (
                  <p className="hidden truncate text-sm text-slate-500 md:block">
                    {description}
                  </p>
                )}
              </div>
            </div>
            {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
};

export default AppShell;
