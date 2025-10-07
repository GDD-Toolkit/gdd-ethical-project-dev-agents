import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Base container for a Card UI element that applies default card layout and styling.
 *
 * @param className - Additional CSS class names to merge with the card's default classes
 * @param props - Other div props that are forwarded to the underlying element
 * @returns A div element with `data-slot="card"` and merged class names suitable for use as a card container
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
 * Header section of the Card that lays out title, description, and optional actions.
 *
 * @returns A div element rendered as the card header (data-slot="card-header") with a responsive grid layout and merged `className`.
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
 * Renders the title area within a Card.
 *
 * @returns A `div` element representing the card's title slot (`data-slot="card-title"`).
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
 * Renders the card description slot.
 *
 * @param className - Additional CSS classes to merge with the component's default muted, small-text styles.
 * @returns A `div` element with `data-slot="card-description"`, styled with muted foreground and small text; accepts and forwards standard `div` props.
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
 * Renders the card action container used to place interactive controls (e.g., buttons).
 *
 * @param className - Additional CSS class names merged with the component's default positioning classes
 * @param props - Additional div props forwarded to the rendered element
 * @returns The action slot `div` element with default positioning classes and any provided `className` merged
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
 * Renders the card's main content container.
 *
 * Applies horizontal padding and merges any provided `className` with the component's default styles.
 *
 * @param className - Additional CSS classes to append to the container
 * @returns The card content container element
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
 * Renders the card footer container.
 *
 * The footer is a horizontal flex row with horizontal padding and added top spacing when a top border is present.
 *
 * @param className - Additional CSS classes merged with the default footer styles.
 * @param props - Other div props forwarded to the root element.
 * @returns A div element with `data-slot="card-footer"` for footer content.
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