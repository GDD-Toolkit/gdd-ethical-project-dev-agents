import { LongFormInput } from "./LongFormInput";

interface QuestionBoxProps {
  question: string;
  tooltip?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
  rows?: number;
}

const QuestionBox = ({
  question,
  tooltip,
  value,
  onChange,
  required = false,
  className = "",
  placeholder = "Type your response here...",
  rows = 4,
}: QuestionBoxProps) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-gray-900 flex items-center">
          {question || "Question"}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {tooltip && (
          <div className="relative group ml-2">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 border border-gray-300 text-gray-700 text-xs font-semibold cursor-pointer hover:bg-gray-200 transition">
              i
            </div>

            <div
              className="absolute right-0 top-6 z-20 hidden group-hover:block bg-white border border-gray-300 text-gray-700 text-sm p-3 rounded-md shadow-md whitespace-pre-wrap break-words"
              style={{ maxWidth: "20rem", width: "max-content" }}
              role="tooltip"
            >
              {tooltip}
            </div>
          </div>
        )}
      </div>

      <LongFormInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="border border-gray-300 bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400/40 focus:border-gray-400"
      />
    </div>
  );
};

export default QuestionBox;
