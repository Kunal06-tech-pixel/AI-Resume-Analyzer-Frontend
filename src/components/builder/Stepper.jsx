const steps = [
  "Personal",
  "Experience",
  "Education",
  "Projects",
  "Skills & Certs",
];

const Stepper = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between gap-2 md:gap-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep >= stepNumber;

        return (
          <div key={step} className="flex-1 flex items-center">
            {/* STEP */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {stepNumber}
              </div>

              <span
                className={`text-xs mt-2 text-center transition-colors duration-300 ${
                  isActive
                    ? "text-gray-800 font-medium"
                    : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>

            {/* LINE */}
            {stepNumber !== steps.length && (
              <div
                className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${
                  currentStep > stepNumber
                    ? "bg-blue-400"
                    : "bg-gray-200"
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