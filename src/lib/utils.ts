import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "ယခုလေးတင်";
  if (min < 60) return `${min} မိနစ်`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} နာရီ`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} ရက်`;
  return new Date(iso).toLocaleDateString("my-MM", {
    month: "short",
    day: "numeric",
  });
}

export function prefixFirstRank(query: string, items: string[], limit = 8): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return items.slice(0, limit);
  const starts: string[] = [];
  const contains: string[] = [];
  for (const item of items) {
    const lower = item.toLowerCase();
    if (lower.startsWith(q)) starts.push(item);
    else if (lower.includes(q)) contains.push(item);
  }
  return [...starts, ...contains].slice(0, limit);
}

export function validMyanmarPhone(value: string): boolean {
  const digits = value.replace(/[\s-]/g, "");
  return /^(09|\+?959)\d{7,9}$/.test(digits);
}

export function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
