import React from "react";
import ProgressBar from "../progressBar";

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
    <div className="form-page">
      <h2 className="text-red">{title}</h2>

      {questions.map((field) => (
        <div key={field.id} className="form-group">
          <label>{field.question}</label>
          <textarea
              name={field.question}
              placeholder="Enter your response here..."
            />
        </div>
      ))}

      <div className="nav-buttons">
        {onPrev && <button onClick={onPrev}>Back</button>}
        <ProgressBar page={step + 1} total={totalPages} />
        <button onClick={isLastStep ? onNext : onNext}>
          {isLastStep ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default FormPage;
