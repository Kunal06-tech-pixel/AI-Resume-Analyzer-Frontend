import React from "react";

const steps = [
  "Personal",
  "Education",
  "Experience",
  "Projects",
  "Skills & Certs",
];

const Stepper = ({ currentStep, setCurrentStep }) => {
  return (
    <div className="w-full max-w-4xl mx-auto flex items-center justify-between">

      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={step} className="flex items-center">

            {/* STEP */}
            <div className="flex flex-col items-center">

              {/* CIRCLE */}
              <button
                onClick={() => setCurrentStep(stepNumber)}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  transition-all duration-300

                  ${isCompleted 
                    ? "bg-blue-600 text-white" 
                    : isActive 
                    ? "border-2 border-blue-600 text-blue-600 bg-white"
                    : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                  }
                `}
              >
                {stepNumber}
              </button>

              {/* LABEL */}
              <span
                className={`
                  text-xs mt-2 text-center whitespace-nowrap
                  ${isActive ? "text-blue-600 font-medium" : "text-gray-500"}
                `}
              >
                {step}
              </span>
            </div>

            {/* LINE */}
            {index !== steps.length - 1 && (
              <div
                className={`
                  w-16 md:w-24 h-0.5 mx-3
                  ${isCompleted ? "bg-blue-500" : "bg-gray-300"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;