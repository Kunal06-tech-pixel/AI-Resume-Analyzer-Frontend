const steps = ["Personal", "Experience", "Education", "Skills"];

const Stepper = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between">

      {steps.map((step, index) => {
        const stepNumber = index + 1;

        return (
          <div key={step} className="flex-1 flex items-center">

            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium
                  ${currentStep >= stepNumber
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"}
                `}
              >
                {stepNumber}
              </div>

              <span className="text-xs mt-2 text-gray-600">
                {step}
              </span>
            </div>

            {stepNumber !== steps.length && (
              <div className="flex-1 h-0.5 bg-gray-200"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;