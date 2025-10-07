import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders a styled card container element.
 *
 * @returns A `div` element with `data-slot="card"` and combined card styling; any additional props are spread onto the element.
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
 * Renders the card header container used to host title, description, and actions.
 *
 * @param className - Additional CSS class names merged with the header's default classes
 * @param props - Additional div props forwarded to the container element
 * @returns A React element representing the card header container with data-slot="card-header"
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
 * Renders the card title container.
 *
 * @param className - Optional additional CSS class names merged with the base title classes
 * @param props - Additional props forwarded to the underlying div element
 * @returns A div element with `data-slot="card-title"` and the merged title classes
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
 * Renders the card description area with muted, small body text.
 *
 * @param className - Additional CSS classes to merge with the component's default classes
 * @returns A div element with `data-slot="card-description"` and the merged class list
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
 * Renders the action area container inside a card.
 *
 * @returns A div element with data-slot="card-action" and classes that position and align action content.
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
 * Wraps children in the card's content area.
 *
 * @returns A `div` with `data-slot="card-content"` whose `className` merges the `px-6` padding class with the provided `className`, spreading any other props onto the element.
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
 * Renders the footer area of a card.
 *
 * @returns A div element used as the card footer with `data-slot="card-footer"`; default footer styles are applied and the provided `className` and other props are forwarded to the element.
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