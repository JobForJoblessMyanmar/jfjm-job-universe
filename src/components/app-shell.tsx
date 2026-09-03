import { Link, useRouterState } from "@tanstack/react-router";
import { Briefcase, House, Plus, Sparkles, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home", icon: House },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/post", label: "Post", icon: Plus },
  { to: "/effects", label: "Effects", icon: Sparkles },
  { to: "/me", label: "Me", icon: UserRound },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isPending } = useCurrentUserState();

  return (
    <div className="relative min-h-dvh">
      <div className="star-veil" aria-hidden />
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-xl flex-col px-3 pb-28 pt-4 sm:px-4">
        <header className="mb-4 rounded-xl border border-border bg-surface/90 px-4 py-5 text-center">
          <img
            src="/brand/jfjm-logo.svg"
            alt="Job For Jobless Myanmar"
            width={160}
            height={160}
            className="mx-auto size-36 object-contain"
          />
          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
            Job For Jobless Myanmar
          </p>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-fg">
            JFJM Job Universe
          </h1>
          <p className="mm mt-1 text-sm text-muted">
            ကုမ္ပဏီတိုက်ရိုက် အလုပ်ခေါ်စာများ
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            {isPending ? (
              <div className="h-9 w-28 animate-pulse rounded-md bg-elevated" />
            ) : (
              <>
                <SignedOut>
                  <Link
                    to="/login"
                    className="inline-flex h-10 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg"
                  >
                    Sign in
                  </Link>
                </SignedOut>
                <SignedIn>
                  <div className="rounded-md border border-border bg-elevated px-2 py-1">
                    <UserButton />
                  </div>
                </SignedIn>
              </>
            )}
          </div>
        </header>
        {children}
      </div>
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-xl items-stretch justify-between px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-1.5">
          {NAV.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-h-12 min-w-14 flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium",
                  active ? "text-accent" : "text-faint hover:text-muted",
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
