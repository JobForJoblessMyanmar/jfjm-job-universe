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
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-xl flex-col px-3 pb-28 pt-3 sm:px-4">
        <header className="hud-panel mb-3 flex items-center gap-3 rounded-xl px-3 py-2">
          <img
            src="/brand/jfjm-logo.png?v=5"
            alt="JFJM"
            width={44}
            height={44}
            className="size-11 shrink-0 object-contain"
          />
          <p className="min-w-0 flex-1 truncate font-display text-sm font-semibold">
            JFJM
          </p>
          {isPending ? (
            <div className="h-9 w-20 animate-pulse rounded-md bg-elevated" />
          ) : (
            <>
              <SignedOut>
                <Link
                  to="/login"
                  className="btn-thrust inline-flex h-9 items-center rounded-md px-3 text-sm font-medium"
                >
                  Sign in
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          )}
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
