create table if not exists profiles (
  user_id text primary key,
  display_name text not null,
  is_admin boolean not null default false,
  is_employer boolean not null default false,
  company_name text,
  phone text,
  viber text,
  email text,
  cv_name text,
  headline text,
  township text,
  diamonds integer not null default 120,
  created_at timestamptz not null default now()
);

create table if not exists jobs (
  id text primary key,
  user_id text not null,
  title text not null,
  company_name text not null,
  gender text,
  headcount text,
  industry text,
  location text not null,
  salary text,
  requirements text,
  extra text,
  address text,
  phone text,
  viber text,
  email text,
  status text not null default 'pending',
  pinned boolean not null default false,
  featured boolean not null default false,
  highlight boolean not null default false,
  effect_bg text,
  effect_frame text,
  effect_title text,
  pin_until timestamptz,
  featured_until timestamptz,
  highlight_until timestamptz,
  bg_until timestamptz,
  frame_until timestamptz,
  title_until timestamptz,
  likes integer not null default 0,
  comments_count integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists jobs_status_created_idx on jobs (status, created_at desc);
create index if not exists jobs_user_id_idx on jobs (user_id);

create table if not exists job_likes (
  user_id text not null,
  job_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, job_id)
);

create table if not exists job_saves (
  user_id text not null,
  job_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, job_id)
);

create table if not exists job_comments (
  id serial primary key,
  job_id text not null,
  user_id text not null,
  author_name text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists job_comments_job_idx on job_comments (job_id, created_at);

create table if not exists applications (
  id serial primary key,
  job_id text not null,
  user_id text not null,
  note text,
  created_at timestamptz not null default now(),
  unique (job_id, user_id)
);

create table if not exists topup_requests (
  id serial primary key,
  user_id text not null,
  diamonds integer not null,
  mmk integer not null,
  note text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists diamond_ledger (
  id serial primary key,
  user_id text not null,
  delta integer not null,
  reason text not null,
  created_at timestamptz not null default now()
);

insert into jobs (
  id, user_id, title, company_name, gender, headcount, industry, location, salary,
  requirements, extra, address, phone, viber, email, status, featured, likes, comments_count
) values
(
  'seed-job-01', 'seed-employer',
  'Junior Accountant', 'Irrawaddy Ledger Co.',
  'Any', '2', 'Accounting / Audit', 'စမ်းချောင်း',
  '450,000 – 650,000 MMK',
  E'- B.Acc သို့မဟုတ် ဆက်စပ်ဘွဲ့\n- Excel ကျွမ်းကျင်\n- အင်္ဂလိပ်စာ အခြေခံ',
  'ရုံးချိန် တနင်္လာ–သောကြာ ၉:၀၀–၁၇:၃၀။ နားနေရက် တနင်္ဂနွေ။',
  'Sanchaung, Yangon', '09 250 111 001', '09250111001', 'hr@irrawaddy-ledger.example',
  'approved', true, 18, 2
),
(
  'seed-job-02', 'seed-employer',
  'IT Support', 'Shwe Cloud Systems',
  'Any', '1', 'IT / Software', 'ကမာရွတ်',
  '500,000 – 800,000 MMK',
  E'- Windows / network troubleshooting\n- Printer, LAN, email support\n- ၁ နှစ်အတွေ့အကြုံ ဦးစားပေး',
  'Office-based။ On-call တစ်ပတ်လျှင် တစ်ကြိမ်။',
  'Kamayut Township', '09 250 111 002', '09250111002', 'jobs@shwecloud.example',
  'approved', false, 24, 3
),
(
  'seed-job-03', 'seed-employer',
  'Sales Executive', 'Thanlyin Trade House',
  'Any', '3', 'Trading', 'သန်လျင်',
  '400,000 + commission',
  E'- စကားပြောကောင်းသူ\n- Motorbike ရှိသူ ဦးစားပေး\n- FMCG အတွေ့အကြုံရှိက ပိုကောင်း',
  'ကော်မရှင် အပတ်စဉ် ပေးချေ။',
  'Thanlyin', '09 250 111 003', '09250111003', 'sales@tth.example',
  'approved', false, 11, 1
),
(
  'seed-job-04', 'seed-employer',
  'Graphic Designer', 'Padauk Studio',
  'Any', '1', 'Advertising / Media', 'ဗဟန်း',
  '550,000 – 900,000 MMK',
  E'- Photoshop / Illustrator / Canva\n- Social post + print layout\n- Portfolio လင့်ခ် ပေးပို့ရန်',
  'Hybrid — အပတ်စဉ် ရုံး ၃ ရက်။',
  'Bahan', '09 250 111 004', '09250111004', 'hello@padauk.studio',
  'approved', true, 31, 4
),
(
  'seed-job-05', 'seed-employer',
  'HR Assistant', 'Golden Teak Hospitality',
  'Female', '1', 'HR / Recruitment', 'ဒဂုံ',
  '400,000 – 550,000 MMK',
  E'- CV စစ်ဆေး၊ အင်တာဗျူး စီစဉ်နိုင်သူ\n- Excel + Viber communication\n- Hotel/HR အတွေ့အကြုံ ရှိက ပိုမို',
  'ဟိုတယ်ဝန်ထမ်း စည်းမျဉ်းအတိုင်း ယူနီဖောင်း ပေးသည်။',
  'Dagon', '09 250 111 005', '09250111005', 'hr@goldenteak.example',
  'approved', false, 9, 0
),
(
  'seed-job-06', 'seed-employer',
  'Warehouse Staff', 'Ayeyarwady Logistics',
  'Male', '6', 'Logistics / Transportation', 'လှိုင်သာယာ',
  '380,000 – 480,000 MMK',
  E'- ကုန်တင်ချနိုင်သူ\n- အချိန်မှန်သူ\n- အထောက်အထား ပြည့်စုံရန်',
  'နေ့/ည အဆိုင်း ရှိသည်။ ထမင်းထည့်ပေး။',
  'Hlaing Tharyar Industrial Zone', '09 250 111 006', '09250111006', 'ops@ayelogistics.example',
  'approved', false, 7, 1
),
(
  'seed-job-07', 'seed-employer',
  'Customer Service Officer', 'Mya Sein Clinic',
  'Any', '2', 'Healthcare / Medical', 'တာမွေ',
  '420,000 – 580,000 MMK',
  E'- လူနာကြိုဆို၊ ချိန်းဆို စီမံ\n- မြန်မာစာ ရေးတတ်ဖတ်တတ်\n- ညင်သာစွာ ပြောဆိုနိုင်သူ',
  'အချိန် ၈:၀၀–၁၆:၀၀။ တနင်္ဂနွေ ပိတ်။',
  'Tamwe', '09 250 111 007', '09250111007', 'front@myasein.clinic',
  'approved', false, 14, 2
),
(
  'seed-job-08', 'seed-employer',
  'Digital Marketing Executive', 'Inle Basket',
  'Any', '1', 'Advertising / Media', 'ရန်ကင်း',
  '600,000 – 950,000 MMK',
  E'- Facebook / TikTok ads\n- Content calendar စီမံနိုင်\n- Analytics ဖတ်တတ်သူ',
  'Remote ၂ ရက်။ Brand သည် local food D2C။',
  'Yankin', '09 250 111 008', '09250111008', 'grow@inlebasket.example',
  'approved', true, 22, 3
),
(
  'seed-job-09', 'seed-employer',
  'Bartender', 'Strand Hour Bar',
  'Any', '2', 'Restaurant / Hotel', 'ကျောက်တံတား',
  '380,000 + tips',
  E'- Cocktail အခြေခံ\n- ညဆိုင်း လုပ်နိုင်\n- English greeting တတ်သူ',
  'ည ၅:၀၀–၁၂:၀၀။ Tips ခွဲဝေပေး။',
  'Kyauktada', '09 250 111 009', '09250111009', 'bar@strandhour.example',
  'approved', false, 16, 1
),
(
  'seed-job-10', 'seed-employer',
  'English Teacher', 'Lotus Evening School',
  'Any', '3', 'Education', 'လှိုင်',
  '25,000 MMK / session',
  E'- IELTS 6.5+ သို့မဟုတ် ဘွဲ့ရ\n- ဆယ်ကျော်သက် သင်ကြားဖူးသူ\n- ညနေ ၅:၃၀–၇:၃၀ ရနိုင်သူ',
  'အပတ်စဉ် တနင်္လာ၊ ဗုဒ္ဓဟူး၊ သောကြာ။',
  'Hlaing', '09 250 111 010', '09250111010', 'teach@lotusevening.example',
  'approved', false, 19, 2
)
on conflict (id) do nothing;

insert into job_comments (job_id, user_id, author_name, body) values
  ('seed-job-01', 'seed-user-a', 'သဇင်', 'CV ပို့ပြီးပါပြီ'),
  ('seed-job-01', 'seed-user-b', 'ကိုကို', 'အင်တာဗျူးချိန်း သိချင်ပါတယ်'),
  ('seed-job-02', 'seed-user-a', 'အိမ့်သူ', 'စိတ်ဝင်စားပါတယ်'),
  ('seed-job-02', 'seed-user-c', 'မင်းမင်း', 'On-call က ဘယ်လောက်ကြာလဲ'),
  ('seed-job-02', 'seed-user-b', 'စုစု', 'လျှောက်ထားပြီးပါပြီ'),
  ('seed-job-04', 'seed-user-a', 'ဖြူဖြူ', 'Portfolio ပို့ပြီးပါပြီ'),
  ('seed-job-04', 'seed-user-c', 'အောင်အောင်', 'Hybrid ရက်တွေ အတိအကျ သိချင်'),
  ('seed-job-08', 'seed-user-a', 'နှင်းနှင်း', 'TikTok ads အတွေ့အကြုံ ၂ နှစ်ရှိပါတယ်')
on conflict do nothing;
