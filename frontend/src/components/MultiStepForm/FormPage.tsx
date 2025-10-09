import React from "react";
import ProgressBar from "../progressBar";
import Button from "../Button";
import { LongFormInput } from "../LongFormInput";

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
  step: number

};

const FormPage: React.FC<FormPageProps> = ({ 
  title, 
  questions,
  onNext,
  onPrev,
  isLastStep,
  totalPages,
  step
}) => {  return (
    <div className="multi-step-form flex flex-col justify-between w-full p-6 space-y-6">
      
      <h2 className="text-2xl font-semibold text-[#262633] text-[40px] ">{title}</h2>

      {questions.map((field) => (
        <div key={field.id} className="space-y-2">
          <label className="block text-sm font-medium text-foreground text-[#262633] text-[24px]">{field.question}</label>
          <LongFormInput placeholder={field.description} />
        </div>
      ))}

      <div className="mt-6 flex items-center justify-between gap-4">
        {onPrev && step > 1 && (
          <Button onClick={onPrev} label="Back"></Button>
        )}
        <ProgressBar page={step} total={totalPages} />
        { isLastStep ?
          <Button label="Submit"></Button> :
          <Button label="Next" onClick={onNext}></Button>
        }

      </div>
    </div>
  );
};

export default FormPage;
