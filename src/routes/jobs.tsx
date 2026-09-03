import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { JobCard } from "@/components/job-card";
import { Input } from "@/components/ui/input";
import { listJobs } from "@/lib/api";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/jobs")({ component: JobsPage });

function JobsPage() {
  const { user, isPending } = useCurrentUserState();
  const [tab, setTab] = useState<"feed" | "saved" | "mine">("feed");
  const [q, setQ] = useState("");

  const jobs = useQuery({
    queryKey: ["jobs", tab, q, user?.id],
    queryFn: () => listJobs({ data: { q, tab } }),
  });

  return (
    <AppShell>
      <h2 className="mb-3 font-display text-xl font-semibold">Jobs</h2>
      <div className="mb-3 grid grid-cols-3 gap-1 rounded-lg bg-elevated p-1">
        {(["feed", "saved", "mine"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={cn(
              "h-9 rounded-md text-sm font-medium capitalize",
              tab === item ? "bg-surface text-fg" : "text-muted",
            )}
          >
            {item === "feed" ? "All" : item === "saved" ? "Saved" : "Mine"}
          </button>
        ))}
      </div>
      <Input
        className="mb-4"
        placeholder="Search title, company, township…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {!isPending && !user && tab !== "feed" ? (
        <p className="mm rounded-xl border border-border bg-surface px-4 py-8 text-center text-sm text-muted">
          Saved / Mine ကြည့်ရန်{" "}
          <Link to="/login" className="text-accent">
            sign in
          </Link>{" "}
          လိုပါတယ်။
        </p>
      ) : jobs.isPending ? (
        <div className="h-40 animate-pulse rounded-xl bg-surface" />
      ) : jobs.data && jobs.data.length > 0 ? (
        <div className="grid gap-3">
          {jobs.data.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <p className="mm rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted">
          ဒီစာရင်းမှာ အလုပ်မရှိသေးပါ။
        </p>
      )}
    </AppShell>
  );
}
