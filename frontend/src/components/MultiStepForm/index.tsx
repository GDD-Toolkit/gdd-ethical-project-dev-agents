import React, { useState } from "react";
import FormPage from "./FormPage";
import { formSteps } from "./FormConfig";
import ProgressBar from "../progressBar";

const MultiStepForm = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < formSteps.length - 1)
    {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="multi-step-form flex flex-col justify-between">
      <div className = "w-full p-[20px] flex items-center text-[48px] text-white bg-gradient-to-b from-[#262633] to-[#727299]">Create Your Project Proposal</div>
      <FormPage
        title={formSteps[step].title}
        questions={formSteps[step].questions}
        onNext={nextStep}
        onPrev={prevStep}
        isLastStep={step === formSteps.length - 1}
        totalPages={formSteps.length}
        step={step + 1}
      />
    </div>
  );
};

export default MultiStepForm;
