const baseButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60";

export const PrimaryButton = ({
  children,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${baseButtonClass} bg-linear-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:scale-[1.02] hover:shadow-xl ${className}`}
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
      className={`${baseButtonClass} border border-purple-400 bg-white/50 text-purple-600 hover:bg-linear-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white hover:shadow-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
