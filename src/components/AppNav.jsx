import { useLocation, useNavigate } from "react-router-dom";
import { FileText, LayoutDashboard, Search } from "lucide-react";
import { useAuth } from "../context/useAuth";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import NavButton3D from "./NavButton3D";

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
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/70 px-4 py-3 backdrop-blur-sm sm:px-8">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="shrink-0 text-lg font-semibold tracking-tight text-gray-950"
        >
          ATSmind AI
        </button>

        <div className="flex min-w-0 items-center gap-3 overflow-x-auto">
          {navItems.map((item) => (
            <NavButton3D
              key={item.to}
              icon={item.icon}
              active={location.pathname === item.to}
              onClick={() => navigate(item.to)}
            >
              {item.label}
            </NavButton3D>
          ))}

          {user ? (
            <>
              <span className="hidden max-w-32 shrink-0 truncate rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 sm:inline">
                {user.name || user.email}
              </span>
              <LogoutButton onClick={handleLogout} />
            </>
          ) : (
            <>
              <LoginButton onClick={goToLogin}>Login</LoginButton>
              <button
                type="button"
                onClick={goToSignup}
                className="shrink-0 rounded-full bg-linear-to-r from-purple-500 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppNav;
