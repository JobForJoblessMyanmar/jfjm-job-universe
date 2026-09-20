insert into jobs (
  id, user_id, title, company_name, gender, headcount, industry, location, salary,
  requirements, extra, address, phone, viber, email, status, featured, likes, comments_count,
  created_at
) values
(
  'jfjm-2026-09-20-01', 'seed-employer',
  'Video Editor', 'Pyone & Say Co., Ltd.',
  'Any', '2', 'Advertising / Media', 'သာကေတ',
  '400,000 - 700,000 MMK',
  $r1$➠ Video Editing အတွေ့အကြုံ အနည်းဆုံး (1) နှစ်ရှိရမည်။
➠ CapCut, Adobe Premiere Pro သို့မဟုတ် သက်ဆိုင်ရာ Editing Software တစ်မျိုးမျိုး ကျွမ်းကျင်ရမည်။
➠ Fashion, Product နှင့် Social Media Video Editing အတွေ့အကြုံရှိသူ ဦးစားပေးမည်။
➠ TikTok နှင့် Facebook Reels Trend များကို နားလည်ရမည်။
➠ Creative Idea ရှိပြီး အသေးစိတ်ဂရုစိုက်တတ်ရမည်။
➠ Deadline အတိုင်း တာဝန်ယူပြီး အလုပ်အပ်နိုင်ရမည်။
➠ Team နှင့် ပူးပေါင်းဆောင်ရွက်နိုင်ပြီး Feedback အပေါ် ပြင်ဆင်နိုင်ရမည်။
➠ Portfolio သို့မဟုတ် ယခင်တည်းဖြတ်ထားသော Video နမူနာများ ပြသနိုင်ရမည်။$r1$,
  $e1$Work Type ➠ (3) Days In-house + (3) Days WFH + (1) Day Holiday
WFH ➠ လုပ်ငန်းအတွေ့အကြုံရှိပြီး သတ်မှတ်ချိန်အတွင်း အလုပ်အပ်နိုင်သူများအား စဉ်းစားပေးမည်။
CV ➠ CV၊ မျှော်မှန်းလစာနှင့် Video Editing Portfolio/Link
Email Subject ➠ Video Editor Application – အမည်$e1$,
  'No. 137, Myanmar Gone Yi Street, Thaketa Industrial Zone, Thaketa Township, Yangon',
  '095013432', '095013432', 'shwesinmin.lace2016@gmail.com',
  'approved', true, 12, 0, timestamptz '2026-09-20 09:00+06:30'
),
(
  'jfjm-2026-09-20-02', 'seed-employer',
  'Sales & Marketing', 'Kaung Thant Pharmaceutical Trading',
  'Any', '5', 'Pharmacy / Medical', 'သင်္ဃန်းကျွန်း',
  'Basic Salary 550,000 MMK +++',
  $r2$➠ တက္ကသိုလ်မှ ဘွဲ့တစ်ခုခုရရှိပြီးသူ (သို့) ကျောင်းကိစ္စကင်းရှင်းသူ (သို့) အထက်တန်းအောင်မြင်ပြီးသူ ဖြစ်ရမည်။
➠ ပေါင်းသင်းဆက်ဆံရေးပြေပြစ်၍ အသင်းအဖွဲ့နှင့် ပူးပေါင်းဆောင်ရွက်တတ်သူ ဖြစ်ရမည်။
➠ စိတ်ရှည်သည်းခံနိုင်ပြီး Customer Service ကောင်းကောင်းပေးနိုင်ရမည်။
➠ ရိုးသားကြိုးစား၍ အကျင့်စာရိတ္တကောင်းမွန်ရမည်။
➠ Sales & Marketing နယ်ပယ်တွင် အတွေ့အကြုံ (1) နှစ်နှင့်အထက် ရှိရမည်။$r2$,
  $e2$Working Hours ➠ 8:30 AM - 5:00 PM
Off Days ➠ Sunday & Public Holidays$e2$,
  'သင်္ဃန်းကျွန်းမြို့နယ်၊ ကြီးပွားရေးရပ်ကွက်၊ မြယမုံကမ်းသာယာအိမ်ရာ',
  '09795524692', '09795524692', null,
  'approved', true, 9, 0, timestamptz '2026-09-20 09:10+06:30'
),
(
  'jfjm-2026-09-20-03', 'seed-employer',
  'Senior System Engineer', 'Wcom',
  'Any', '3', 'IT / Telecom', 'လှိုင်',
  '1,400,000 - 1,800,000 MMK',
  $r3$➠ Senior Level လုပ်ငန်းအတွေ့အကြုံနှင့် ကျွမ်းကျင်မှုပေါ်မူတည်၍ ညှိနှိုင်းနိုင်ပါသည်။
➠ CV Form ပေးပို့ရာတွင် လျှောက်ထားလိုသော ရာထူးအမည်ကို ဖော်ပြပေးရန်။$r3$,
  $e3$Working Hours ➠ 8:30 AM - 5:30 PM
Off Days ➠ Saturday, Sunday and Holidays$e3$,
  'No. (67), Insein Road, Hlaing Township, Yangon',
  '09969908349', '09969908349', 'hr@wcombroadband.com',
  'approved', true, 15, 0, timestamptz '2026-09-20 09:20+06:30'
),
(
  'jfjm-2026-09-20-04', 'seed-employer',
  'Call Center Agent', 'Wcom Broadband',
  'Any', '5', 'IT / Telecom', 'လှိုင်',
  null,
  $r4$➠ Customer Service ပိုင်းတွင် အတွေ့အကြုံရှိသူ ဦးစားပေးမည်။
➠ ရုံးချိန်ဖြင့်လည်းကောင်း၊ တာဝန်ချိန်ဆင်းဆောင်ရွက်ရန်။
➠ ISP Industry ပိုင်းတွင် အတွေ့အကြုံရှိသူ အားဦးစားပေးပါသည်။$r4$,
  null,
  'No. 67, Insein Road, Hlaing Township, Yangon',
  '09969908349', '09969908349', 'hr@wcombroadband.com',
  'approved', false, 6, 0, timestamptz '2026-09-20 09:30+06:30'
),
(
  'jfjm-2026-09-20-05', 'seed-employer',
  'Warehouse Assistant', 'Wcom Broadband',
  'Male', '3', 'Logistics / Transportation', 'လှိုင်',
  '350,000 - 400,000 MMK + OT',
  $r5$➠ Warehouse ပိုင်းနှင့်ပတ်သက်သည့် လုပ်ငန်းအတွေ့အကြုံရှိရမည်။
➠ စနေ၊ တနင်္ဂနွေ နှင့် အစိုးရရုံးပိတ်ရက်များ ပိတ်သည်။$r5$,
  $e5$Working Hours ➠ 8:30 AM - 5:30 PM
Off Days ➠ Saturday, Sunday & Public Holidays$e5$,
  'No. 67, Insein Road, Hlaing Township, Yangon',
  '09969908349', '09949220303', 'hr@wcombroadband.com',
  'approved', false, 4, 0, timestamptz '2026-09-20 09:40+06:30'
)
on conflict (id) do nothing;
