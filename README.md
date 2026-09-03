# JFJM Job Universe

Job For Jobless Myanmar — direct-hiring job feed.

သာမန် Vite + TanStack Start app။ Grok sandbox မလိုပါ။

## Local

```bash
npm install
npm run dev
```

http://localhost:3000

`DATABASE_URL` မထားရင် embedded Postgres (PGLite) သုံးမယ်။ Seed jobs ၁၀ ခု အလိုအလျောက် ပါလာမယ်။

## Vercel

1. ဒီဖိုလ်ဒါကို GitHub တင်ပါ။
2. [Neon](https://console.neon.tech) မှာ Postgres ဖွင့်ပြီး `DATABASE_URL` ယူပါ။
3. [Vercel](https://vercel.com) → Import GitHub repo.
4. Build command: `npm run build`
5. Env:

```
DATABASE_URL=postgresql://... ?sslmode=require
BETTER_AUTH_SECRET=<openssl rand -hex 32>
BETTER_AUTH_URL=https://YOUR-PROJECT.vercel.app
VITE_AUTH_ENABLED=true
VITE_PUBLIC_HOSTNAME=YOUR-PROJECT.vercel.app
```

Login က **email + password** ပဲ။ Google/X မပါ။
