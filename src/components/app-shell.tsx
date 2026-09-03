import { Link, useRouterState } from "@tanstack/react-router";
import { Briefcase, House, Plus, Sparkles, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home", icon: House },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/post", label: "Post", icon: Plus, launch: true },
  { to: "/effects", label: "FX", icon: Sparkles },
  { to: "/me", label: "Me", icon: UserRound },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isPending } = useCurrentUserState();

  return (
    <div className="relative min-h-dvh">
      <div className="star-far" aria-hidden />
      <div className="star-near" aria-hidden />
      <div className="planet-horizon" aria-hidden />
      <div className="meteor-line" aria-hidden />
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-xl flex-col px-3 pb-28 pt-4 sm:px-4">
        <header className="hud-panel mb-4 rounded-xl px-4 py-5 text-center">
          <div className="logo-orbit">
            <img
              src="/brand/jfjm-logo.png?v=4"
              alt="Job For Jobless Myanmar"
              width={160}
              height={160}
            />
          </div>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.22em] text-jade">
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
              <div className="h-11 w-28 animate-pulse rounded-md bg-elevated" />
            ) : (
              <>
                <SignedOut>
                  <Link
                    to="/login"
                    className="btn-thrust inline-flex h-11 items-center rounded-md px-5 text-sm font-medium"
                  >
                    Sign in
                  </Link>
                </SignedOut>
                <SignedIn>
                  <div className="btn-hud rounded-md px-2 py-1">
                    <UserButton />
                  </div>
                </SignedIn>
              </>
            )}
          </div>
        </header>
        {children}
      </div>
      <nav aria-label="Primary" className="dock">
        {NAV.map((item) => {
          const active =
            item.to === "/"
              ? pathname === "/"
              : pathname === item.to || pathname.startsWith(`${item.to}/`);
          const Icon = item.icon;
          const launch = "launch" in item && item.launch;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "dock-item",
                launch && "dock-launch",
                !launch && active && "dock-item-on",
              )}
            >
              <Icon className="size-5" strokeWidth={active || launch ? 2.3 : 1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
