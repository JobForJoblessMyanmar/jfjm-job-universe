import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buyEffect, getMyProfile, listJobs } from "@/lib/api";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  EFFECTS,
  EFFECT_TIERS,
  type EffectItem,
  type EffectTier,
} from "@/lib/catalog";
import { queryClient } from "@/lib/query";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/effects")({ component: EffectsPage });

function EffectsPage() {
  const { user } = useCurrentUserState();
  const [tier, setTier] = useState<EffectTier>("loyalty");
  const [kind, setKind] = useState<"all" | EffectItem["kind"]>("all");
  const [selected, setSelected] = useState<EffectItem>(EFFECTS[0]);
  const [days, setDays] = useState<1 | 3 | 7>(1);
  const [jobId, setJobId] = useState("");

  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(),
    enabled: Boolean(user),
  });
  const mine = useQuery({
    queryKey: ["jobs", "mine"],
    queryFn: () => listJobs({ data: { tab: "mine" } }),
    enabled: Boolean(user),
  });

  const list = useMemo(
    () =>
      EFFECTS.filter((e) => e.tier === tier && (kind === "all" || e.kind === kind)),
    [tier, kind],
  );

  const previewJob = mine.data?.find((j) => j.id === jobId) ?? mine.data?.[0];

  async function buy() {
    const target = jobId || previewJob?.id;
    if (!target) {
      toast.error("Apply လုပ်ရန် သင့်အလုပ်တစ်ခု လိုပါတယ်");
      return;
    }
    try {
      await buyEffect({ data: { jobId: target, effectId: selected.id, days } });
      toast.success(`${selected.name} applied`);
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Purchase failed");
    }
  }

  return (
    <AppShell>
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">Effect Shop</h2>
          <p className="mm text-sm text-muted">ပို့စ်ကို ဂိမ်းစတိုင် အလှဆင်ပါ</p>
        </div>
        <p className="text-sm tabular-nums text-sand">
          {profile.data ? `${profile.data.diamonds} ♦` : ""}
        </p>
      </div>

      <div className="mb-3 flex gap-1 overflow-x-auto pb-1">
        {EFFECT_TIERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTier(item.id)}
            className={cn(
              "h-9 shrink-0 rounded-full px-3 text-xs font-medium",
              tier === item.id ? "bg-accent text-accent-fg" : "bg-elevated text-muted",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mb-4 flex gap-1">
        {(["all", "background", "frame", "title", "utility"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setKind(item)}
            className={cn(
              "h-8 rounded-full px-2.5 text-[11px] capitalize",
              kind === item ? "bg-surface text-fg" : "text-faint",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div
        className={cn(
          "job-fx mb-4 min-h-28 rounded-xl border border-border bg-surface p-4",
          selected.kind === "background" && `fx-${selected.id}`,
          selected.kind === "frame" && selected.id,
        )}
      >
        <div className="fx-layer" />
        <p className="text-[11px] uppercase tracking-wider text-faint">Live preview</p>
        <h3
          className={cn(
            "mt-1 font-display text-lg font-semibold",
            selected.id === "title-shimmer" && "title-shimmer",
            selected.id === "title-jade" && "title-jade",
            selected.id === "title-universe" && "title-universe",
            selected.id === "highlight" && "title-highlight",
          )}
        >
          {previewJob?.title ?? "Sales Executive"}
        </h3>
        <p className="text-sm text-muted">
          {previewJob?.companyName ?? "Your company"} · {selected.nameMy}
        </p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        {list.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item)}
            className={cn(
              "rounded-lg border p-3 text-left",
              selected.id === item.id
                ? "border-accent bg-elevated"
                : "border-border bg-surface",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium">{item.name}</span>
              <Badge tone="sand">{item.prices[1]}♦</Badge>
            </div>
            <p className="mm mt-1 text-xs text-muted">{item.nameMy}</p>
          </button>
        ))}
      </div>

      {user ? (
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="mb-2 text-xs text-muted">Apply to one of your posts</p>
          <select
            className="mb-3 h-11 w-full rounded-md border border-border bg-bg px-3 text-sm"
            value={jobId || previewJob?.id || ""}
            onChange={(e) => setJobId(e.target.value)}
          >
            {(mine.data ?? []).length === 0 ? (
              <option value="">No posts yet</option>
            ) : (
              (mine.data ?? []).map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))
            )}
          </select>
          <div className="mb-3 grid grid-cols-3 gap-2">
            {([1, 3, 7] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                className={cn(
                  "h-11 rounded-md border text-sm tabular-nums",
                  days === d
                    ? "border-accent bg-accent/10 text-fg"
                    : "border-border text-muted",
                )}
              >
                {d}d · {selected.prices[d]}♦
              </button>
            ))}
          </div>
          <Button className="w-full" onClick={() => void buy()}>
            Use {selected.name}
          </Button>
        </div>
      ) : (
        <p className="mm text-center text-sm text-muted">
          ဝယ်ရန် <Link to="/login" className="text-accent">sign in</Link> လိုပါတယ်။
        </p>
      )}
    </AppShell>
  );
}
