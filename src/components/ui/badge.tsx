import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  tone = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "jade" | "sand" | "danger" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-[11px] font-medium tracking-wide",
        tone === "default" && "bg-elevated text-muted",
        tone === "jade" && "bg-accent/15 text-accent",
        tone === "sand" && "bg-sand/15 text-sand",
        tone === "danger" && "bg-danger/15 text-danger",
        tone === "muted" && "bg-fg/5 text-faint",
        className,
      )}
      {...props}
    />
  );
}
