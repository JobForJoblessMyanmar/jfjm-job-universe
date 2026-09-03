# JFJM Job Universe

Job For Jobless Myanmar — direct-hiring job feed.

## Vercel တန်းတင်ရန်

1. Neon: https://console.neon.tech → project အသစ် → **Connection string** ကူးပါ  
2. ဒီခလုတ်နှိပ်ပါ → GitHub repo ကို Vercel Import လုပ်ပါ  

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JobForJoblessMyanmar/jfjm-job-universe&env=DATABASE_URL,BETTER_AUTH_SECRET,BETTER_AUTH_URL,VITE_AUTH_ENABLED,VITE_PUBLIC_HOSTNAME&envDescription=Neon%20Postgres%20and%20Better%20Auth&project-name=jfjm-job-universe&repository-name=jfjm-job-universe)

3. Environment Variables:

| Name | Value |
|---|---|
| `DATABASE_URL` | Neon connection string (`sslmode=require`) |
| `BETTER_AUTH_SECRET` | `37b1846ea50ca240b356449f7b38d30e7edf47f7859125d41a710b2e6be7b1d9` |
| `BETTER_AUTH_URL` | ပထမ deploy ပြီးမှ `https://YOUR.vercel.app` ထည့်ပြီး Redeploy |
| `VITE_AUTH_ENABLED` | `true` |
| `VITE_PUBLIC_HOSTNAME` | `YOUR.vercel.app` (https မပါ) |

4. Deploy → URL ရရင် `BETTER_AUTH_URL` နဲ့ `VITE_PUBLIC_HOSTNAME` ကို အဲ့ URL ထားပြီး **Redeploy**.

Login = email + password. `DATABASE_URL` မထည့်ရင် production မှာ data မကျန်ပါ။

## Local

```bash
npm install
npm run dev
```
