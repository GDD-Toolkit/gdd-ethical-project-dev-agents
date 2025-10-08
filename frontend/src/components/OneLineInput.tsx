import React, { useState } from "react";

interface OneLineInputProps {
  placeholder?: string;
  type?: string;
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
  type = "text",
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

  return (
    <div className="relative w-full">
      <input
        type={type}
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
              : "bg-gray-300 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400/20 focus:border-red-400"
          }
          ${className || ""}
        `}
        {...props}
      />
    </div>
  );
}
