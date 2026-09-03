import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { optionalAuthMiddleware } from "@/lib/auth/optional";
import { getSql } from "@/lib/db";
import {
  EFFECT_MAP,
  POST_COST,
  STARTER_DIAMONDS,
} from "@/lib/catalog";
import type { JobCard, JobComment, Profile, TopupRequest } from "@/lib/types";

type JobRow = {
  id: string;
  user_id: string;
  title: string;
  company_name: string;
  gender: string | null;
  headcount: string | null;
  industry: string | null;
  location: string;
  salary: string | null;
  requirements: string | null;
  extra: string | null;
  address: string | null;
  phone: string | null;
  viber: string | null;
  email: string | null;
  status: string;
  pinned: boolean;
  featured: boolean;
  highlight: boolean;
  effect_bg: string | null;
  effect_frame: string | null;
  effect_title: string | null;
  pin_until: string | null;
  featured_until: string | null;
  highlight_until: string | null;
  bg_until: string | null;
  frame_until: string | null;
  title_until: string | null;
  likes: number;
  comments_count: number;
  created_at: string;
};

function stillActive(until: string | null): boolean {
  if (!until) return false;
  return new Date(until).getTime() > Date.now();
}

function mapJob(
  row: JobRow,
  flags: { liked: boolean; saved: boolean; applied: boolean },
): JobCard {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    companyName: row.company_name,
    gender: row.gender,
    headcount: row.headcount,
    industry: row.industry,
    location: row.location,
    salary: row.salary,
    requirements: row.requirements,
    extra: row.extra,
    address: row.address,
    phone: row.phone,
    viber: row.viber,
    email: row.email,
    status: row.status as JobCard["status"],
    pinned: stillActive(row.pin_until),
    featured: stillActive(row.featured_until) || row.featured,
    highlight: stillActive(row.highlight_until),
    effectBg: stillActive(row.bg_until) ? row.effect_bg : null,
    effectFrame: stillActive(row.frame_until) ? row.effect_frame : null,
    effectTitle: stillActive(row.title_until) ? row.effect_title : null,
    likes: Number(row.likes) || 0,
    commentsCount: Number(row.comments_count) || 0,
    createdAt: row.created_at,
    liked: flags.liked,
    saved: flags.saved,
    applied: flags.applied,
  };
}

async function loadFlags(userId: string | null, jobIds: string[]) {
  const empty = {
    liked: new Set<string>(),
    saved: new Set<string>(),
    applied: new Set<string>(),
  };
  if (!userId || jobIds.length === 0) return empty;
  const sql = await getSql();
  const liked = await sql<{ job_id: string }>`
    select job_id from job_likes where user_id = ${userId}
  `;
  const saved = await sql<{ job_id: string }>`
    select job_id from job_saves where user_id = ${userId}
  `;
  const applied = await sql<{ job_id: string }>`
    select job_id from applications where user_id = ${userId}
  `;
  return {
    liked: new Set(liked.map((r) => r.job_id)),
    saved: new Set(saved.map((r) => r.job_id)),
    applied: new Set(applied.map((r) => r.job_id)),
  };
}

function withFlags(rows: JobRow[], flags: Awaited<ReturnType<typeof loadFlags>>): JobCard[] {
  return rows.map((row) =>
    mapJob(row, {
      liked: flags.liked.has(row.id),
      saved: flags.saved.has(row.id),
      applied: flags.applied.has(row.id),
    }),
  );
}

async function ensureProfileRow(
  userId: string,
  fallback: { name?: string | null; email?: string | null },
): Promise<Profile> {
  const sql = await getSql();
  const existing = await sql<{
    user_id: string;
    display_name: string;
    is_admin: boolean;
    is_employer: boolean;
    company_name: string | null;
    phone: string | null;
    viber: string | null;
    email: string | null;
    cv_name: string | null;
    headline: string | null;
    township: string | null;
    diamonds: number;
  }>`select * from profiles where user_id = ${userId}`;
  if (existing[0]) {
    const r = existing[0];
    return {
      userId: r.user_id,
      displayName: r.display_name,
      isAdmin: Boolean(r.is_admin),
      isEmployer: Boolean(r.is_employer),
      companyName: r.company_name,
      phone: r.phone,
      viber: r.viber,
      email: r.email,
      cvName: r.cv_name,
      headline: r.headline,
      township: r.township,
      diamonds: Number(r.diamonds) || 0,
    };
  }
  const name = fallback.name?.trim() || fallback.email?.split("@")[0] || "Member";
  await sql`
    insert into profiles (user_id, display_name, email, diamonds)
    values (${userId}, ${name}, ${fallback.email ?? null}, ${STARTER_DIAMONDS})
  `;
  return {
    userId,
    displayName: name,
    isAdmin: false,
    isEmployer: false,
    companyName: null,
    phone: null,
    viber: null,
    email: fallback.email ?? null,
    cvName: null,
    headline: null,
    township: null,
    diamonds: STARTER_DIAMONDS,
  };
}

async function requireAdmin(userId: string) {
  const profile = await ensureProfileRow(userId, {});
  if (!profile.isAdmin) throw new Error("Admin only");
  return profile;
}

export const listJobs = createServerFn({ method: "GET" })
  .middleware([optionalAuthMiddleware])
  .validator(
    (input: { q?: string; industry?: string; tab?: "feed" | "saved" | "mine" }) =>
      input,
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const q = data.q?.trim().toLowerCase() ?? "";
    const industry = data.industry?.trim() ?? "";
    const tab = data.tab ?? "feed";
    const userId = context.userId;

    let rows: JobRow[];
    if (tab === "saved") {
      if (!userId) return [];
      rows = await sql<JobRow>`
        select j.* from jobs j
        join job_saves s on s.job_id = j.id
        where s.user_id = ${userId} and j.status = 'approved'
        order by j.created_at desc
      `;
    } else if (tab === "mine") {
      if (!userId) return [];
      rows = await sql<JobRow>`
        select * from jobs where user_id = ${userId}
        order by created_at desc
      `;
    } else {
      rows = await sql<JobRow>`
        select * from jobs where status = 'approved'
        order by created_at desc
      `;
    }

    const filtered = rows.filter((row) => {
      if (industry && industry !== "All" && row.industry !== industry) return false;
      if (!q) return true;
      const hay = [
        row.title,
        row.company_name,
        row.location,
        row.salary,
        row.industry,
        row.extra,
        row.requirements,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });

    filtered.sort((a, b) => {
      const ap = stillActive(a.pin_until) ? 1 : 0;
      const bp = stillActive(b.pin_until) ? 1 : 0;
      if (ap !== bp) return bp - ap;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    const flags = await loadFlags(userId, filtered.map((r) => r.id));
    return withFlags(filtered, flags);
  });

export const getJob = createServerFn({ method: "GET" })
  .middleware([optionalAuthMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    const rows = await sql<JobRow>`select * from jobs where id = ${id}`;
    const row = rows[0];
    if (!row) return null;
    if (row.status !== "approved" && context.userId !== row.user_id) {
      const me = context.userId
        ? await ensureProfileRow(context.userId, {})
        : null;
      if (!me?.isAdmin) return null;
    }
    const flags = await loadFlags(context.userId, [row.id]);
    return mapJob(row, {
      liked: flags.liked.has(row.id),
      saved: flags.saved.has(row.id),
      applied: flags.applied.has(row.id),
    });
  });

export const listComments = createServerFn({ method: "GET" })
  .middleware([optionalAuthMiddleware])
  .validator((jobId: string) => jobId)
  .handler(async ({ context, data: jobId }) => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      job_id: string;
      user_id: string;
      author_name: string;
      body: string;
      created_at: string;
    }>`
      select * from job_comments where job_id = ${jobId}
      order by created_at asc
    `;
    return rows.map(
      (r): JobComment => ({
        id: r.id,
        jobId: r.job_id,
        authorName: r.author_name,
        body: r.body,
        createdAt: r.created_at,
        mine: context.userId === r.user_id,
      }),
    );
  });

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { getSessionUser } = await import("@/lib/auth/verify.server");
    const session = await getSessionUser();
    return ensureProfileRow(context.userId, {
      name: null,
      email: session?.email ?? null,
    });
  });

const profileInput = z.object({
  displayName: z.string().min(1).max(80),
  phone: z.string().max(30).optional().nullable(),
  viber: z.string().max(30).optional().nullable(),
  email: z.string().max(120).optional().nullable(),
  cvName: z.string().max(160).optional().nullable(),
  headline: z.string().max(160).optional().nullable(),
  township: z.string().max(80).optional().nullable(),
  companyName: z.string().max(120).optional().nullable(),
});

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: z.infer<typeof profileInput>) => profileInput.parse(input))
  .handler(async ({ context, data }) => {
    await ensureProfileRow(context.userId, { name: data.displayName });
    const sql = await getSql();
    await sql`
      update profiles set
        display_name = ${data.displayName.trim()},
        phone = ${data.phone?.trim() || null},
        viber = ${data.viber?.trim() || null},
        email = ${data.email?.trim() || null},
        cv_name = ${data.cvName?.trim() || null},
        headline = ${data.headline?.trim() || null},
        township = ${data.township?.trim() || null},
        company_name = ${data.companyName?.trim() || null}
      where user_id = ${context.userId}
    `;
    return ensureProfileRow(context.userId, {});
  });

export const becomeEmployer = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((companyName: string) => companyName.trim())
  .handler(async ({ context, data: companyName }) => {
    if (!companyName) throw new Error("Company name required");
    const sql = await getSql();
    await ensureProfileRow(context.userId, { name: companyName });
    await sql`
      update profiles
      set is_employer = true, company_name = ${companyName}
      where user_id = ${context.userId}
    `;
    return ensureProfileRow(context.userId, {});
  });

export const claimAdminIfNone = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureProfileRow(context.userId, {});
    const admins = await sql<{ n: number }>`
      select count(*)::int as n from profiles where is_admin = true
    `;
    if ((admins[0]?.n ?? 0) > 0) {
      throw new Error("Admin already exists");
    }
    await sql`update profiles set is_admin = true where user_id = ${context.userId}`;
    return ensureProfileRow(context.userId, {});
  });

const jobInput = z.object({
  title: z.string().min(2).max(120),
  companyName: z.string().min(2).max(120),
  gender: z.string().max(20).optional().nullable(),
  headcount: z.string().max(20).optional().nullable(),
  industry: z.string().max(80).optional().nullable(),
  location: z.string().min(1).max(80),
  salary: z.string().max(80).optional().nullable(),
  requirements: z.string().max(2000).optional().nullable(),
  extra: z.string().max(2000).optional().nullable(),
  address: z.string().max(200).optional().nullable(),
  phone: z.string().max(30).optional().nullable(),
  viber: z.string().max(30).optional().nullable(),
  email: z.string().max(120).optional().nullable(),
});

export const postJob = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: z.infer<typeof jobInput>) => jobInput.parse(input))
  .handler(async ({ context, data }) => {
    const profile = await ensureProfileRow(context.userId, {});
    if (!profile.isEmployer) throw new Error("Employer profile required");
    if (profile.diamonds < POST_COST) {
      throw new Error(`Need ${POST_COST} diamonds to post`);
    }
    const sql = await getSql();
    const id = `job_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    const adminCount = await sql<{ n: number }>`
      select count(*)::int as n from profiles where is_admin = true
    `;
    const status = (adminCount[0]?.n ?? 0) > 0 ? "pending" : "approved";
    await sql`
      insert into jobs (
        id, user_id, title, company_name, gender, headcount, industry, location,
        salary, requirements, extra, address, phone, viber, email, status
      ) values (
        ${id}, ${context.userId}, ${data.title.trim()}, ${data.companyName.trim()},
        ${data.gender || null}, ${data.headcount || null}, ${data.industry || null},
        ${data.location.trim()}, ${data.salary || null}, ${data.requirements || null},
        ${data.extra || null}, ${data.address || null}, ${data.phone || null},
        ${data.viber || null}, ${data.email || null}, ${status}
      )
    `;
    await sql`
      update profiles set diamonds = diamonds - ${POST_COST}
      where user_id = ${context.userId}
    `;
    await sql`
      insert into diamond_ledger (user_id, delta, reason)
      values (${context.userId}, ${-POST_COST}, ${"post:" + id})
    `;
    return { id, status };
  });

export const deleteMyJob = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    const profile = await ensureProfileRow(context.userId, {});
    if (profile.isAdmin) {
      await sql`delete from jobs where id = ${id}`;
    } else {
      await sql`delete from jobs where id = ${id} and user_id = ${context.userId}`;
    }
    return { ok: true };
  });

export const toggleLike = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((jobId: string) => jobId)
  .handler(async ({ context, data: jobId }) => {
    const sql = await getSql();
    const existing = await sql<{ job_id: string }>`
      select job_id from job_likes where user_id = ${context.userId} and job_id = ${jobId}
    `;
    if (existing[0]) {
      await sql`delete from job_likes where user_id = ${context.userId} and job_id = ${jobId}`;
      await sql`update jobs set likes = greatest(likes - 1, 0) where id = ${jobId}`;
      return { liked: false };
    }
    await sql`insert into job_likes (user_id, job_id) values (${context.userId}, ${jobId})`;
    await sql`update jobs set likes = likes + 1 where id = ${jobId}`;
    return { liked: true };
  });

export const toggleSave = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((jobId: string) => jobId)
  .handler(async ({ context, data: jobId }) => {
    const sql = await getSql();
    const existing = await sql<{ job_id: string }>`
      select job_id from job_saves where user_id = ${context.userId} and job_id = ${jobId}
    `;
    if (existing[0]) {
      await sql`delete from job_saves where user_id = ${context.userId} and job_id = ${jobId}`;
      return { saved: false };
    }
    await sql`insert into job_saves (user_id, job_id) values (${context.userId}, ${jobId})`;
    return { saved: true };
  });

export const addComment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { jobId: string; body: string }) => {
    const body = input.body.trim();
    if (!body || body.length > 400) throw new Error("Comment required");
    return { jobId: input.jobId, body };
  })
  .handler(async ({ context, data }) => {
    const profile = await ensureProfileRow(context.userId, {});
    const sql = await getSql();
    await sql`
      insert into job_comments (job_id, user_id, author_name, body)
      values (${data.jobId}, ${context.userId}, ${profile.displayName}, ${data.body})
    `;
    await sql`update jobs set comments_count = comments_count + 1 where id = ${data.jobId}`;
    return { ok: true };
  });

export const applyToJob = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { jobId: string; note?: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await ensureProfileRow(context.userId, {});
    await sql`
      insert into applications (job_id, user_id, note)
      values (${data.jobId}, ${context.userId}, ${data.note?.trim() || null})
      on conflict (job_id, user_id) do nothing
    `;
    return { ok: true };
  });

export const buyEffect = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { jobId: string; effectId: string; days: 1 | 3 | 7 }) => input)
  .handler(async ({ context, data }) => {
    const effect = EFFECT_MAP[data.effectId];
    if (!effect) throw new Error("Unknown effect");
    const days = data.days;
    const cost = effect.prices[days];
    const profile = await ensureProfileRow(context.userId, {});
    if (profile.diamonds < cost) throw new Error("Not enough diamonds");
    const sql = await getSql();
    const jobs = await sql<JobRow>`
      select * from jobs where id = ${data.jobId} and user_id = ${context.userId}
    `;
    const job = jobs[0];
    if (!job) throw new Error("You can only style your own posts");
    const until = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
    if (effect.kind === "background") {
      await sql`update jobs set effect_bg = ${effect.id}, bg_until = ${until} where id = ${job.id}`;
    } else if (effect.kind === "frame") {
      await sql`update jobs set effect_frame = ${effect.id}, frame_until = ${until} where id = ${job.id}`;
    } else if (effect.kind === "title") {
      await sql`update jobs set effect_title = ${effect.id}, title_until = ${until} where id = ${job.id}`;
    } else if (effect.id === "pin") {
      await sql`update jobs set pinned = true, pin_until = ${until} where id = ${job.id}`;
    } else if (effect.id === "featured") {
      await sql`update jobs set featured = true, featured_until = ${until} where id = ${job.id}`;
    } else if (effect.id === "highlight") {
      await sql`update jobs set highlight = true, highlight_until = ${until} where id = ${job.id}`;
    }
    await sql`
      update profiles set diamonds = diamonds - ${cost}
      where user_id = ${context.userId}
    `;
    await sql`
      insert into diamond_ledger (user_id, delta, reason)
      values (${context.userId}, ${-cost}, ${`effect:${effect.id}:${days}d`})
    `;
    return { ok: true, spent: cost, until };
  });

export const requestTopup = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { diamonds: number; note?: string }) => input)
  .handler(async ({ context, data }) => {
    const allowed = [50, 120, 300];
    if (!allowed.includes(data.diamonds)) throw new Error("Invalid package");
    const mmk = data.diamonds * 100;
    const sql = await getSql();
    await ensureProfileRow(context.userId, {});
    await sql`
      insert into topup_requests (user_id, diamonds, mmk, note)
      values (${context.userId}, ${data.diamonds}, ${mmk}, ${data.note?.trim() || null})
    `;
    return { ok: true, mmk };
  });

export const listPendingJobs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const rows = await sql<JobRow>`
      select * from jobs where status = 'pending' order by created_at asc
    `;
    return withFlags(rows, {
      liked: new Set(),
      saved: new Set(),
      applied: new Set(),
    });
  });

export const moderateJob = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id: string; action: "approve" | "reject" }) => input)
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const status = data.action === "approve" ? "approved" : "rejected";
    await sql`update jobs set status = ${status} where id = ${data.id}`;
    return { ok: true };
  });

export const listTopups = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      user_id: string;
      diamonds: number;
      mmk: number;
      note: string | null;
      status: string;
      created_at: string;
      display_name: string | null;
    }>`
      select t.*, p.display_name
      from topup_requests t
      left join profiles p on p.user_id = t.user_id
      order by t.created_at desc
      limit 50
    `;
    return rows.map(
      (r): TopupRequest => ({
        id: r.id,
        userId: r.user_id,
        displayName: r.display_name ?? "Member",
        diamonds: r.diamonds,
        mmk: r.mmk,
        note: r.note,
        status: r.status,
        createdAt: r.created_at,
        }),
    );
  });

export const moderateTopup = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id: number; action: "approve" | "reject" }) => input)
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      user_id: string;
      diamonds: number;
      status: string;
    }>`select id, user_id, diamonds, status from topup_requests where id = ${data.id}`;
    const row = rows[0];
    if (!row) throw new Error("Not found");
    if (row.status !== "pending") throw new Error("Already reviewed");
    if (data.action === "approve") {
      await sql`update topup_requests set status = 'approved' where id = ${row.id}`;
      await sql`
        update profiles set diamonds = diamonds + ${row.diamonds}
        where user_id = ${row.user_id}
      `;
      await sql`
        insert into diamond_ledger (user_id, delta, reason)
        values (${row.user_id}, ${row.diamonds}, ${"topup:" + row.id})
      `;
    } else {
      await sql`update topup_requests set status = 'rejected' where id = ${row.id}`;
    }
    return { ok: true };
  });

export const countAdmins = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<{ n: number }>`
    select count(*)::int as n from profiles where is_admin = true
  `;
  return rows[0]?.n ?? 0;
});
