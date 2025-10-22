import { useState } from "react";
import FormPage from "../components/MultiStepForm/FormPage";
import { formSteps } from "../components/MultiStepForm/FormConfig";

type FormData = Record<number, string>;

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const handleAnswerChange = (questionId: number, answer: string) => {
    setFormData((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // TODO: Send formData to backend API
  };

  const nextStep = () => {
    if (step < formSteps.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="multi-step-form flex min-h-screen flex-col bg-background">
      <div className="w-full p-5 flex items-center text-4xl md:text-5xl font-[500] text-white bg-gradient-to-b from-[#262633] to-[#727299] shadow-sm">
        Create Your Project Proposal
      </div>
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
        <FormPage
          title={formSteps[step].title}
          questions={formSteps[step].questions}
          formData={formData}
          onAnswerChange={handleAnswerChange}
          onNext={nextStep}
          onPrev={prevStep}
          onSubmit={handleSubmit}
          isLastStep={step === formSteps.length - 1}
          totalPages={formSteps.length}
          step={step + 1}
        />
      </main>
    </div>
  );
};

export default MultiStepForm;
