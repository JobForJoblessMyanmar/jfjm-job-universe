import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { SuggestField } from "@/components/suggest-field";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { becomeEmployer, getMyProfile, postJob } from "@/lib/api";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  GENDERS,
  INDUSTRIES,
  POST_COST,
  TITLE_SUGGEST,
  YANGON_TOWNSHIPS,
} from "@/lib/catalog";
import { queryClient } from "@/lib/query";

export const Route = createFileRoute("/post")({ component: PostPage });

function PostPage() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(),
    enabled: Boolean(user),
  });

  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("IT / Software");
  const [gender, setGender] = useState("Any");
  const [headcount, setHeadcount] = useState("1");
  const [salary, setSalary] = useState("");
  const [requirements, setRequirements] = useState("");
  const [extra, setExtra] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [viber, setViber] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  if (isPending) {
    return (
      <AppShell>
        <div className="h-48 animate-pulse rounded-xl bg-surface" />
      </AppShell>
    );
  }

  if (!user) {
    return (
      <AppShell>
        <section className="rounded-xl border border-border bg-surface p-6 text-center">
          <h2 className="font-display text-xl font-semibold">Post a job</h2>
          <p className="mm mt-2 text-sm text-muted">
            အလုပ်တင်ရန် sign in လုပ်ပါ။ ပို့စ်တစ်ခုလျှင် {POST_COST} diamonds။
          </p>
          <Link
            to="/login"
            className="mt-4 inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-fg"
          >
            Sign in
          </Link>
        </section>
      </AppShell>
    );
  }

  const me = profile.data;

  async function enableEmployer() {
    const name = company.trim() || me?.companyName || me?.displayName || "My Company";
    try {
      await becomeEmployer({ data: name });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Employer profile ready");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const result = await postJob({
        data: {
          title,
          companyName: company.trim() || me?.companyName || "Company",
          gender,
          headcount,
          industry,
          location,
          salary,
          requirements,
          extra,
          address,
          phone,
          viber,
          email,
        },
      });
      toast.success(
        result.status === "pending"
          ? "ပို့စ်တင်ပြီး — admin အတည်ပြုရန် စောင့်ပါ"
          : "အလုပ်တင်ပြီးပါပြီ",
      );
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      await navigate({ to: "/jobs" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not post");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AppShell>
      <section className="rounded-xl border border-border bg-surface p-5">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold">Post a job</h2>
            <p className="mm mt-1 text-sm text-muted">
              {POST_COST} diamonds / post · လက်ကျန်{" "}
              <span className="tabular-nums text-sand">{me?.diamonds ?? "—"}</span>
            </p>
          </div>
        </div>

        {!me?.isEmployer ? (
          <div className="mb-4 rounded-lg border border-border bg-elevated p-4">
            <p className="mm text-sm text-muted">
              အလုပ်ရှင်အဖြစ် စတင်ရန် ကုမ္ပဏီအမည်ထည့်ပါ။
            </p>
            <div className="mt-3 grid gap-2">
              <Input
                placeholder="Company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <Button onClick={() => void enableEmployer()}>Become employer</Button>
            </div>
          </div>
        ) : (
          <form className="grid gap-3" onSubmit={(e) => void submit(e)}>
            <SuggestField
              label="Job title"
              value={title}
              onChange={setTitle}
              items={TITLE_SUGGEST}
              placeholder="Sales Executive"
              required
            />
            <div>
              <Label>Company</Label>
              <Input
                required
                value={company || me.companyName || ""}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <SuggestField
              label="Township / location"
              value={location}
              onChange={setLocation}
              items={YANGON_TOWNSHIPS}
              placeholder="ကမာရွတ်"
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Industry</Label>
                <select
                  className="h-11 w-full rounded-md border border-border bg-bg px-3 text-sm"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  {INDUSTRIES.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Gender</Label>
                <select
                  className="h-11 w-full rounded-md border border-border bg-bg px-3 text-sm"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  {GENDERS.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Headcount</Label>
                <Input value={headcount} onChange={(e) => setHeadcount(e.target.value)} />
              </div>
              <div>
                <Label>Salary</Label>
                <Input
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="500,000 MMK"
                />
              </div>
            </div>
            <div>
              <Label>Requirements</Label>
              <Textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder={"- Excel\n- ၁ နှစ်အတွေ့အကြုံ"}
              />
            </div>
            <div>
              <Label>More detail</Label>
              <Textarea value={extra} onChange={(e) => setExtra(e.target.value)} />
            </div>
            <div>
              <Label>Address</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
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
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={busy}>
              Publish · {POST_COST} diamonds
            </Button>
          </form>
        )}
      </section>
    </AppShell>
  );
}
