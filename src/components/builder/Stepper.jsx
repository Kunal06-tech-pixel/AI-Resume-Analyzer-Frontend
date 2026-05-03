const steps = [
  "Personal",
  "Education",
  "Experience",
  "Projects",
  "Skills & Certs",
];

const Stepper = ({ currentStep, setCurrentStep }) => {
  return (
    <div className="mx-auto flex w-full max-w-4xl items-center justify-between overflow-x-auto rounded-2xl bg-white/60 px-4 py-4 shadow-md backdrop-blur-lg">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={step} className="flex shrink-0 items-center">
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setCurrentStep(stepNumber)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? "bg-linear-to-r from-purple-500 to-blue-500 text-white shadow-md"
                    : isActive
                    ? "border-2 border-purple-500 bg-white text-purple-600 shadow-sm"
                    : "bg-purple-100 text-purple-400 hover:bg-purple-200"
                }`}
              >
                {stepNumber}
              </button>

              <span
                className={`mt-2 whitespace-nowrap text-center text-xs ${
                  isActive ? "font-medium text-purple-600" : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`mx-3 h-0.5 w-16 md:w-24 ${
                  isCompleted
                    ? "bg-linear-to-r from-purple-500 to-blue-500"
                    : "bg-purple-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
