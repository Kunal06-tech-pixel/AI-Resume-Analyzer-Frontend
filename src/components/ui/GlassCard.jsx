const GlassCard = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-2xl bg-white/75 p-6 shadow-md backdrop-blur-lg transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
