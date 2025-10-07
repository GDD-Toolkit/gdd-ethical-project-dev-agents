import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders a card container element with the component's base styling and optional extra classes.
 *
 * The output is a div with a `data-slot="card"` attribute and the component's default card styles;
 * any provided `className` is merged into the container's classes.
 *
 * @returns The rendered card container element.
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
 * Renders the header slot for a Card component.
 *
 * Renders a div with data-slot="card-header" and default grid and spacing classes; any `className` passed is merged with the defaults.
 *
 * @returns A div element used as the card header with the combined classes and `data-slot="card-header"`.
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
 * Wraps content with title styling for a card.
 *
 * Renders a wrapper intended for the card's title slot with default leading and
 * semibold font styling; accepts standard div props and merges an optional
 * `className`.
 *
 * @returns A div element used as the card's title slot.
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
 * Renders a container for a card's descriptive text with muted, small typography.
 *
 * @param className - Additional CSS classes to apply to the container
 * @returns The card description element
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
 * Renders the card action container used to position actionable controls within a Card.
 *
 * @param className - Additional CSS class names to apply to the action container
 * @returns A div element serving as the card's action slot with positioning and any provided classes applied
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
 * Renders the content area of a Card.
 *
 * @returns A div element with `data-slot="card-content"`, horizontal padding, and any additional `className` or div props applied.
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
 * Renders the footer section of a Card.
 *
 * @param className - Additional CSS classes to apply to the footer container
 * @returns A div element serving as the card footer that contains children and forwards other div props
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