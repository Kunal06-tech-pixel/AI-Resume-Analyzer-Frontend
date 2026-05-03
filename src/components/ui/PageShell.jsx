import AppNav from "../AppNav";
import HeroBackground from "../HeroBackground";

const PageShell = ({ children, showNav = true, className = "" }) => {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-blue-100 via-white to-pink-200 text-gray-950">
      <HeroBackground />

      <div className="relative z-10">
        {showNav && <AppNav />}
        <main className={className}>{children}</main>
      </div>
    </div>
  );
};

export default PageShell;
