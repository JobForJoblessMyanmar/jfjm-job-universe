import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { JobCard } from "@/components/job-card";
import { SuggestField } from "@/components/suggest-field";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import {
  claimAdminIfNone,
  countAdmins,
  getMyProfile,
  listPendingJobs,
  listTopups,
  moderateJob,
  moderateTopup,
  requestTopup,
  saveProfile,
} from "@/lib/api";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { YANGON_TOWNSHIPS } from "@/lib/catalog";
import { queryClient } from "@/lib/query";

export const Route = createFileRoute("/me")({ component: MePage });

function MePage() {
  const { user, isPending } = useCurrentUserState();
  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(),
    enabled: Boolean(user),
  });
  const adminCount = useQuery({
    queryKey: ["admin-count"],
    queryFn: () => countAdmins(),
    enabled: Boolean(user),
  });

  const [displayName, setDisplayName] = useState("");
  const [headline, setHeadline] = useState("");
  const [phone, setPhone] = useState("");
  const [viber, setViber] = useState("");
  const [email, setEmail] = useState("");
  const [cvName, setCvName] = useState("");
  const [township, setTownship] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [pkg, setPkg] = useState(50);

  useEffect(() => {
    const p = profile.data;
    if (!p) return;
    setDisplayName(p.displayName);
    setHeadline(p.headline ?? "");
    setPhone(p.phone ?? "");
    setViber(p.viber ?? "");
    setEmail(p.email ?? "");
    setCvName(p.cvName ?? "");
    setTownship(p.township ?? "");
    setCompanyName(p.companyName ?? "");
  }, [profile.data]);

  if (isPending) {
    return (
      <AppShell>
        <div className="h-40 animate-pulse rounded-xl bg-surface" />
      </AppShell>
    );
  }
  if (!user) return <RedirectToSignIn />;

  const me = profile.data;

  async function save() {
    try {
      await saveProfile({
        data: {
          displayName,
          headline,
          phone,
          viber,
          email,
          cvName,
          township,
          companyName,
        },
      });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    }
  }

  async function topup() {
    try {
      const res = await requestTopup({ data: { diamonds: pkg } });
      toast.success(`Requested ${pkg}♦ · ${res.mmk.toLocaleString()} MMK`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Request failed");
    }
  }

  return (
    <AppShell>
      <section className="rounded-xl border border-border bg-surface p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold">
              {me?.displayName ?? user.displayName ?? "Me"}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {me?.isEmployer ? "Employer" : "Job seeker"}
              {me?.isAdmin ? " · Admin" : ""}
            </p>
          </div>
          <p className="text-right text-sm">
            <span className="block text-faint">Wallet</span>
            <span className="tabular-nums text-lg font-semibold text-sand">
              {me?.diamonds ?? 0} ♦
            </span>
          </p>
        </div>

        <div className="mt-5 grid gap-3">
          <div>
            <Label>Name</Label>
            <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          </div>
          <div>
            <Label>Headline</Label>
            <Input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Graphic designer · 3 yrs"
            />
          </div>
          <SuggestField
            label="Township"
            value={township}
            onChange={setTownship}
            items={YANGON_TOWNSHIPS}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Phone</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <Label>Viber</Label>
              <Input value={viber} onChange={(e) => setViber(e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label>CV file name</Label>
            <Input
              value={cvName}
              onChange={(e) => setCvName(e.target.value)}
              placeholder="AungAung_CV.pdf"
            />
          </div>
          {me?.isEmployer ? (
            <div>
              <Label>Company</Label>
              <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>
          ) : null}
          <Button onClick={() => void save()}>Save profile</Button>
        </div>
      </section>

      <section className="mt-4 rounded-xl border border-border bg-surface p-5">
        <h3 className="font-display font-semibold">Top up diamonds</h3>
        <p className="mm mt-1 text-sm text-muted">
          တောင်းဆိုမှုကို admin အတည်ပြုမှ wallet ထဲဝင်မယ်။ ၁ ♦ = ၁၀၀ MMK။
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { d: 50, mmk: 5000 },
            { d: 120, mmk: 12000 },
            { d: 300, mmk: 30000 },
          ].map((item) => (
            <button
              key={item.d}
              type="button"
              onClick={() => setPkg(item.d)}
              className={
                pkg === item.d
                  ? "rounded-lg border border-sand bg-sand/10 p-3"
                  : "rounded-lg border border-border p-3"
              }
            >
              <span className="block text-lg font-semibold tabular-nums text-sand">
                {item.d}♦
              </span>
              <span className="text-[11px] text-muted">{item.mmk.toLocaleString()} MMK</span>
            </button>
          ))}
        </div>
        <Button className="mt-3 w-full" variant="secondary" onClick={() => void topup()}>
          Request top-up
        </Button>
      </section>

      {adminCount.data === 0 ? (
        <section className="mt-4 rounded-xl border border-border bg-elevated p-5">
          <h3 className="font-display font-semibold">Claim first admin</h3>
          <p className="mm mt-1 text-sm text-muted">
            Admin မရှိသေးပါ။ ပထမဆုံးအကောင့်က moderation ယူနိုင်တယ်။
          </p>
          <Button
            className="mt-3"
            variant="secondary"
            onClick={async () => {
              try {
                await claimAdminIfNone();
                await queryClient.invalidateQueries({ queryKey: ["profile"] });
                await queryClient.invalidateQueries({ queryKey: ["admin-count"] });
                toast.success("You are admin");
              } catch (err) {
                toast.error(err instanceof Error ? err.message : "Failed");
              }
            }}
          >
            Become admin
          </Button>
        </section>
      ) : null}

      {me?.isAdmin ? <AdminPanel /> : null}

      <p className="mt-6 text-center text-xs text-faint">
        Official updates ·{" "}
        <a
          className="text-accent"
          href="https://x.com/JobForJoblessMM"
          target="_blank"
          rel="noreferrer"
        >
          @JobForJoblessMM
        </a>
        {" · "}
        <Link to="/jobs" className="text-muted hover:text-fg">
          My posts
        </Link>
      </p>
    </AppShell>
  );
}

function AdminPanel() {
  const pending = useQuery({
    queryKey: ["admin-jobs"],
    queryFn: () => listPendingJobs(),
  });
  const topups = useQuery({
    queryKey: ["admin-topups"],
    queryFn: () => listTopups(),
  });

  return (
    <section className="mt-4 rounded-xl border border-border bg-surface p-5">
      <h3 className="font-display font-semibold">Admin</h3>
      <p className="mt-3 text-xs uppercase tracking-wider text-faint">Pending posts</p>
      <div className="mt-2 grid gap-3">
        {(pending.data ?? []).length === 0 ? (
          <p className="text-sm text-muted">Queue is clear.</p>
        ) : (
          pending.data?.map((job) => (
            <div key={job.id} className="grid gap-2">
              <JobCard job={job} compact />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={async () => {
                    await moderateJob({ data: { id: job.id, action: "approve" } });
                    await queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
                    await queryClient.invalidateQueries({ queryKey: ["jobs"] });
                  }}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={async () => {
                    await moderateJob({ data: { id: job.id, action: "reject" } });
                    await queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
                  }}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <p className="mt-5 text-xs uppercase tracking-wider text-faint">Top-up requests</p>
      <div className="mt-2 grid gap-2">
        {(topups.data ?? []).map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2"
          >
            <div>
              <p className="text-sm">
                {row.displayName} ·{" "}
                <span className="tabular-nums text-sand">{row.diamonds}♦</span>
              </p>
              <p className="text-xs text-faint">{row.status}</p>
            </div>
            {row.status === "pending" ? (
              <div className="flex gap-1">
                <Button
                  size="sm"
                  onClick={async () => {
                    await moderateTopup({ data: { id: row.id, action: "approve" } });
                    await queryClient.invalidateQueries({ queryKey: ["admin-topups"] });
                  }}
                >
                  OK
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={async () => {
                    await moderateTopup({ data: { id: row.id, action: "reject" } });
                    await queryClient.invalidateQueries({ queryKey: ["admin-topups"] });
                  }}
                >
                  No
                </Button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
