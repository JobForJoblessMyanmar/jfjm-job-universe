import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { JobCard } from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { addComment, deleteMyJob, getJob, listComments } from "@/lib/api";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { COMMENT_PRESETS } from "@/lib/catalog";
import { queryClient } from "@/lib/query";
import { formatRelativeTime } from "@/lib/utils";

export const Route = createFileRoute("/job/$id")({ component: JobDetail });

function JobDetail() {
  const { id } = Route.useParams();
  const { user } = useCurrentUserState();
  const job = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJob({ data: id }),
  });
  const comments = useQuery({
    queryKey: ["comments", id],
    queryFn: () => listComments({ data: id }),
  });
  const [body, setBody] = useState("");

  if (job.isPending) {
    return (
      <AppShell>
        <div className="h-48 animate-pulse rounded-xl bg-surface" />
      </AppShell>
    );
  }
  if (!job.data) {
    return (
      <AppShell>
        <p className="mm text-center text-muted">အလုပ်မတွေ့ပါ။</p>
      </AppShell>
    );
  }

  const item = job.data;

  async function send() {
    if (!body.trim()) return;
    try {
      await addComment({ data: { jobId: id, body } });
      setBody("");
      await queryClient.invalidateQueries({ queryKey: ["comments", id] });
      await queryClient.invalidateQueries({ queryKey: ["job", id] });
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
    } catch {
      toast.error("Sign in to comment");
    }
  }

  return (
    <AppShell>
      <Link
        to="/"
        className="mb-3 inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" /> Feed
      </Link>
      <JobCard job={item} />

      <section className="mt-4 rounded-xl border border-border bg-surface p-4">
        <h3 className="font-display text-sm font-semibold">Requirements</h3>
        <p className="mm mt-2 whitespace-pre-line text-sm text-fg/85">
          {item.requirements || "—"}
        </p>
        {item.address ? (
          <p className="mt-3 text-sm text-muted">Address · {item.address}</p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2">
          {item.email ? (
            <a
              href={`mailto:${item.email}`}
              className="inline-flex h-11 items-center gap-1 rounded-md border border-border px-3 text-sm"
            >
              <Mail className="size-3.5" /> Email
            </a>
          ) : null}
          {item.phone ? (
            <a
              href={`tel:${item.phone}`}
              className="inline-flex h-11 items-center gap-1 rounded-md border border-border px-3 text-sm"
            >
              <Phone className="size-3.5" /> {item.phone}
            </a>
          ) : null}
        </div>
      </section>

      <section className="mt-4 rounded-xl border border-border bg-surface p-4">
        <h3 className="font-display text-sm font-semibold">Comments</h3>
        <div className="mt-3 grid gap-3">
          {(comments.data ?? []).map((c) => (
            <div key={c.id} className="border-b border-border/70 pb-2 last:border-0">
              <p className="text-xs text-faint">
                <span className="font-medium text-accent">{c.authorName}</span>
                <span className="mx-1">·</span>
                {formatRelativeTime(c.createdAt)}
              </p>
              <p className="mm mt-0.5 text-sm">{c.body}</p>
            </div>
          ))}
        </div>
        {user ? (
          <div className="mt-3">
            <div className="mb-2 flex flex-wrap gap-1">
              {COMMENT_PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  className="rounded-full bg-elevated px-2.5 py-1 text-[11px] text-muted"
                  onClick={() => setBody(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="မှတ်ချက်ရေးပါ"
            />
            <Button className="mt-2" size="sm" onClick={() => void send()}>
              Comment
            </Button>
          </div>
        ) : (
          <p className="mm mt-3 text-sm text-muted">
            မှတ်ချက်ရေးရန် <Link to="/login" className="text-accent">sign in</Link>
          </p>
        )}
      </section>

      {user && user.id === item.userId ? (
        <Button
          className="mt-4 w-full"
          variant="danger"
          onClick={async () => {
            await deleteMyJob({ data: item.id });
            toast.success("Deleted");
            await queryClient.invalidateQueries({ queryKey: ["jobs"] });
          }}
        >
          Delete my post
        </Button>
      ) : null}
    </AppShell>
  );
}
