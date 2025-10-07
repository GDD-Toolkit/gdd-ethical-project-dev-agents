import React, { useState } from "react";
import { Delete } from "lucide-react";

interface OneLineInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
  className?: string;
  disabled?: boolean;
}

/**
 * Single-line input field with an optional delete icon for clearing text.
 *
 * Example:
 * <OneLineInput placeholder="Username" maxLength={25} />
 */
export function OneLineInput({
  placeholder = "Enter text...",
  value,
  onChange,
  maxLength,
  className,
  disabled = false,
  ...props
}: OneLineInputProps) {
  const [internalValue, setInternalValue] = useState("");

  const displayValue = value ?? internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) onChange(newValue);
    else setInternalValue(newValue);
  };

  const handleClear = () => {
    if (onChange) onChange("");
    else setInternalValue("");
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        maxLength={maxLength}
        disabled={disabled}
        className={`
          w-full border rounded-lg px-4 py-2 pr-10 font-sans leading-relaxed
          transition-all duration-200
          ${
            disabled
              ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed opacity-70"
              : "bg-gray-300 text-gray-800 border-red-400 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400/20 focus:border-red-400"
          }
          ${className || ""}
        `}
        {...props}
      />

      {displayValue && !disabled && (
        <Delete
          onClick={handleClear}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            h-5 w-5 text-gray-500
            hover:text-gray-700 hover:scale-110
            transition-transform duration-200 ease-in-out
            cursor-pointer
          "
        />
      )}
    </div>
  );
}
