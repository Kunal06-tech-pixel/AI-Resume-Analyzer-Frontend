const baseButtonClass =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/25 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export const PrimaryButton = ({
  children,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${baseButtonClass} border border-teal-700/40 bg-slate-950 text-white shadow-lg shadow-teal-900/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-900/25 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({
  children,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${baseButtonClass} border border-white/70 bg-white/55 text-slate-700 shadow-sm shadow-teal-950/[0.06] backdrop-blur-xl hover:-translate-y-0.5 hover:border-teal-200/70 hover:bg-white/75 hover:text-slate-950 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
