import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders a styled <textarea> element that merges provided class names with the component's default styles and forwards all other props.
 *
 * @param className - Optional additional CSS class names to append to the default styling
 * @returns A textarea DOM element with merged class names, a data-slot="textarea" attribute, and all remaining props forwarded
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }