import { Link, useNavigate } from "@tanstack/react-router";
import {
  Bookmark,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { applyToJob, toggleLike, toggleSave } from "@/lib/api";
import { queryClient } from "@/lib/query";
import type { JobCard as Job } from "@/lib/types";
import { cn, formatRelativeTime } from "@/lib/utils";

function frameClass(frame: string | null): string {
  if (
    frame === "frame-gold" ||
    frame === "frame-jade" ||
    frame === "frame-royal" ||
    frame === "frame-diamond" ||
    frame === "frame-orbit" ||
    frame === "frame-jfjm"
  ) {
    return frame;
  }
  return "";
}

export function JobCard({
  job,
  compact = false,
}: {
  job: Job;
  compact?: boolean;
}) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const preview = job.extra || job.requirements || "";
  const long = preview.length > 140;

  async function onLike() {
    try {
      await toggleLike({ data: job.id });
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
    } catch {
      navigate({ to: "/login" });
    }
  }

  async function onSave() {
    try {
      await toggleSave({ data: job.id });
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
    } catch {
      navigate({ to: "/login" });
    }
  }

  async function onShare() {
    const url = `${window.location.origin}/job/${job.id}`;
    const text = `${job.title} — ${job.companyName}`;
    try {
      if (navigator.share) await navigator.share({ title: job.title, text, url });
      else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        toast.success("Link copied");
      }
    } catch {
      /* cancelled */
    }
  }

  return (
    <article
      className={cn(
        "job-fx rounded-xl border border-border bg-surface p-4 shadow-[0_8px_28px_rgb(0_0_0/0.28)]",
        job.effectBg && `fx-${job.effectBg}`,
        frameClass(job.effectFrame),
        job.highlight && "title-highlight",
      )}
    >
      <div className="fx-layer" aria-hidden />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            {job.pinned ? <Badge tone="sand">Pinned</Badge> : null}
            {job.featured ? <Badge tone="jade">Featured</Badge> : null}
            {job.status !== "approved" ? (
              <Badge tone={job.status === "pending" ? "sand" : "danger"}>
                {job.status}
              </Badge>
            ) : null}
          </div>
          <h2
            className={cn(
              "mt-1 font-display text-lg font-semibold leading-snug tracking-tight",
              job.effectTitle === "title-shimmer" && "title-shimmer",
              job.effectTitle === "title-jade" && "title-jade",
              job.effectTitle === "title-universe" && "title-universe",
            )}
          >
            <Link to="/job/$id" params={{ id: job.id }} className="hover:text-accent">
              {job.title}
            </Link>
          </h2>
          <p className="mt-0.5 text-sm text-muted">
            {job.companyName}
            <span className="mx-1.5 text-faint">·</span>
            <span className="tabular-nums">{formatRelativeTime(job.createdAt)}</span>
          </p>
        </div>
        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={() => void onLike()}
            className={cn(
              "grid size-11 place-items-center rounded-md border border-border text-muted",
              job.liked && "border-danger/40 bg-danger/15 text-danger",
            )}
            aria-label="Like"
          >
            <Heart className={cn("size-4", job.liked && "fill-current")} />
          </button>
          <button
            type="button"
            onClick={() => void onSave()}
            className={cn(
              "grid size-11 place-items-center rounded-md border border-border text-muted",
              job.saved && "border-sand/50 bg-sand/15 text-sand",
            )}
            aria-label="Save"
          >
            <Bookmark className={cn("size-4", job.saved && "fill-current")} />
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {job.salary ? <Badge tone="jade">{job.salary}</Badge> : null}
        <Badge>
          <MapPin className="mr-1 size-3" />
          {job.location}
        </Badge>
        {job.industry ? <Badge>{job.industry}</Badge> : null}
        {job.headcount ? <Badge tone="muted">{job.headcount} ဦး</Badge> : null}
        {job.gender && job.gender !== "Any" ? <Badge tone="muted">{job.gender}</Badge> : null}
      </div>

      {!compact && preview ? (
        <div className="mm mt-3 text-sm leading-relaxed text-fg/85">
          <p className="whitespace-pre-line">
            {long && !expanded ? `${preview.slice(0, 140)}…` : preview}
          </p>
          {long ? (
            <button
              type="button"
              className="mt-1 text-sm font-medium text-accent"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "Show less" : "See more"}
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-faint">
        <span className="inline-flex items-center gap-1 tabular-nums">
          <Heart className="size-3.5" /> {job.likes}
        </span>
        <span className="inline-flex items-center gap-1 tabular-nums">
          <MessageCircle className="size-3.5" /> {job.commentsCount}
        </span>
        <button
          type="button"
          onClick={() => void onShare()}
          className="ml-auto inline-flex items-center gap-1 text-muted hover:text-fg"
        >
          <Share2 className="size-3.5" /> Share
        </button>
      </div>

      {!compact ? (
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            to="/job/$id"
            params={{ id: job.id }}
            className="inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg"
          >
            Open
          </Link>
          {job.viber ? (
            <a
              href={`viber://chat?number=${job.viber.replace(/\s/g, "")}`}
              className="inline-flex h-11 items-center rounded-md border border-border bg-elevated px-3 text-sm"
            >
              Viber
            </a>
          ) : null}
          {job.phone ? (
            <a
              href={`tel:${job.phone}`}
              className="inline-flex h-11 items-center gap-1 rounded-md border border-border bg-elevated px-3 text-sm"
            >
              <Phone className="size-3.5" /> Call
            </a>
          ) : null}
          <ApplyButton job={job} />
        </div>
      ) : null}
    </article>
  );
}

function ApplyButton({ job }: { job: Job }) {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  async function apply() {
    setBusy(true);
    try {
      await applyToJob({ data: { jobId: job.id } });
      toast.success("လျှောက်ထားပြီးပါပြီ");
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
    } catch {
      navigate({ to: "/login" });
    } finally {
      setBusy(false);
    }
  }

  if (job.applied) {
    return (
      <Button variant="secondary" size="md" disabled>
        Applied
      </Button>
    );
  }
  return (
    <Button variant="secondary" size="md" disabled={busy} onClick={() => void apply()}>
      Apply
    </Button>
  );
}
