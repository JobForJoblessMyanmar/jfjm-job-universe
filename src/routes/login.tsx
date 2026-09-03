import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  if (!isPending && user) {
    void navigate({ to: "/me" });
  }

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "up") {
        const { error } = await authClient.signUp.email({
          name: name.trim() || email.split("@")[0] || "Member",
          email: email.trim(),
          password,
        });
        if (error) throw new Error(error.message);
      } else {
        const { error } = await authClient.signIn.email({
          email: email.trim(),
          password,
        });
        if (error) throw new Error(error.message);
      }
      toast.success("Signed in");
      await navigate({ to: "/me" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AppShell>
      <section className="rounded-xl border border-border bg-surface p-5">
        <h2 className="font-display text-xl font-semibold">Sign in</h2>
        <p className="mm mt-1 text-sm text-muted">
          Job Seeker နဲ့ Employer အတွက် အကောင့်တစ်ခုတည်း။ Email နဲ့ ဝင်ပါ။
        </p>

        <form className="mt-5 grid gap-3" onSubmit={(e) => void onEmail(e)}>
          {mode === "up" ? (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="သင့်နာမည်"
              />
            </div>
          ) : null}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={busy}>
            {mode === "up" ? "Create account" : "Sign in with email"}
          </Button>
        </form>

        <button
          type="button"
          className="mt-4 text-sm text-accent"
          onClick={() => setMode((m) => (m === "in" ? "up" : "in"))}
        >
          {mode === "in" ? "Need an account? Create one" : "Have an account? Sign in"}
        </button>

        <p className="mt-6 text-center text-xs text-faint">
          <Link to="/" className="underline-offset-2 hover:underline">
            Back to feed
          </Link>
        </p>
      </section>
    </AppShell>
  );
}
