import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { JobCard } from "@/components/job-card";
import { Input } from "@/components/ui/input";
import { listJobs } from "@/lib/api";
import { CALM_MESSAGES, INDUSTRIES } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  const [q, setQ] = useState("");
  const [industry, setIndustry] = useState("All");
  const calm = useMemo(
    () => CALM_MESSAGES[Math.floor(Date.now() / 86_400_000) % CALM_MESSAGES.length],
    [],
  );

  const jobs = useQuery({
    queryKey: ["jobs", "feed", q, industry],
    queryFn: () => listJobs({ data: { q, industry, tab: "feed" } }),
  });

  return (
    <AppShell>
      <p className="mm hud-panel mb-3 rounded-lg px-3 py-2 text-center text-sm text-muted">
        {calm}
      </p>

      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
        <Input
          aria-label="Search jobs"
          className="pl-10 pr-10"
          placeholder="ရာထူး၊ ကုမ္ပဏီ၊ မြို့နယ်၊ လစာ…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {q ? (
          <button
            type="button"
            aria-label="Clear search"
            className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center text-faint"
            onClick={() => setQ("")}
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {["All", ...INDUSTRIES.slice(0, 10)].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setIndustry(item)}
            className={cn(
              "h-9 shrink-0 rounded-full border px-3 text-xs font-medium",
              industry === item ? "hud-chip-on" : "hud-chip",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="mb-3 text-center text-xs tabular-nums text-faint">
        {jobs.data ? `${jobs.data.length} jobs` : " "}
      </p>

      {jobs.isPending ? (
        <div className="grid gap-3">
          <div className="h-40 animate-pulse rounded-xl bg-surface" />
          <div className="h-40 animate-pulse rounded-xl bg-surface" />
        </div>
      ) : jobs.data && jobs.data.length > 0 ? (
        <div className="grid gap-3">
          {jobs.data.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <p className="mm rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted">
          အလုပ်မတွေ့သေးပါ။ စကားလုံးပြောင်းရှာကြည့်ပါ။
        </p>
      )}
    </AppShell>
  );
}
