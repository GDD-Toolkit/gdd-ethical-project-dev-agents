import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders a themed card container with default layout, spacing, and visual styles.
 *
 * @param props - Standard `div` props; `className` will be merged with the component's default classes.
 * @returns A `div` element representing the card with default background, foreground, layout, spacing, rounded corners, border, and shadow; any provided props are spread onto the element.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the header area of a Card with a responsive grid layout and slot-aware placement for actions.
 *
 * @param className - Additional CSS classes to merge with the component's default styles
 * @returns The header container element for a Card
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card title container used within a Card; applies heading typography and accepts additional div props.
 *
 * @returns A div element representing the card's title slot.
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Renders a description area for a Card with muted, small text styling.
 *
 * @param className - Additional CSS classes to merge with the component's default styles
 * @returns A `div` element styled as the card description (muted foreground, small text) with any provided props applied
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Renders a card action slot positioned within the card's grid.
 *
 * @returns A div element with `data-slot="card-action"` and default grid positioning classes that forwards any additional div props.
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Container for a card's main content that provides horizontal padding and a `data-slot="card-content"` marker.
 *
 * @param className - Additional CSS classes to merge with the default horizontal padding
 * @returns A `div` element that wraps card content with `px-6` padding and the `data-slot="card-content"` attribute
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * Renders the card's footer slot with footer-specific layout, horizontal padding, and top spacing.
 *
 * @returns The rendered footer element for a Card component.
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}