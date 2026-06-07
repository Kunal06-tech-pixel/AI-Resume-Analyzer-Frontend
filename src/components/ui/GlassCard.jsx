const GlassCard = ({ children, className = "" }) => {
  return (
    <div
      className={`glass-panel rounded-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
