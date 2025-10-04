interface LongFormInputProps {
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
    className?: string
    rows?: number
    disabled?: boolean
}

export function LongFormInput({
    placeholder = "Enter your text here...",
    value,
    onChange,
    className,
    rows = 2,
    disabled = false,
    ...props
}: LongFormInputProps) {
    return (
        <div className="relative w-full">
            <textarea
                className={`w-full bg-gray-300 border-red-400 border rounded-lg px-4 py-3 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400/20 focus:border-red-400 transition-all duration-200 resize-none font-sans leading-relaxed ${className || ''}`}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                rows={rows}
                disabled={disabled}
                {...props}
            />
        </div>
    )
}
