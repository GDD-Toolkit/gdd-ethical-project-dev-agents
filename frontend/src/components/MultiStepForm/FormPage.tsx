import React from "react";
import ProgressBar from "../progressBar";
import Button from "../Button";
import QuestionBox from "../QuestionBox";

type FormPageProps = {
  title: string;
  questions: {
    id: number;
    question: string;
    description: string;
  }[];
  onNext: () => void;
  onPrev: () => void;
  isLastStep: boolean;
  totalPages: number;
  step: number;
};

const FormPage: React.FC<FormPageProps> = ({ 
  title, 
  questions,
  onNext,
  onPrev,
  isLastStep,
  totalPages,
  step
}) => {  
  return (
    <div className="multi-step-form flex flex-col justify-between w-full p-6 space-y-6">
      
      <h2 className="text-2xl font-semibold text-[#262633] text-[40px]">{title}</h2>

      {questions.map((field) => (
        <QuestionBox key={field.id} question={field.question} tooltip={field.description} className="mb-4" />
      ))}

      <div className="mt-6 flex items-center justify-between gap-4">
        {step > 1 ? (
          <Button onClick={onPrev} label="Back" />
        ) : (
          // Invisible placeholder to keep layout balanced
          <div className="opacity-0 pointer-events-none">
            <Button label="Back" />
          </div>
        )}

        <ProgressBar page={step} total={totalPages} />

        {isLastStep ? (
          <Button label="Submit" />
        ) : (
          <Button label="Next" onClick={onNext} />
        )}
      </div>
    </div>
  );
};

export default FormPage;
