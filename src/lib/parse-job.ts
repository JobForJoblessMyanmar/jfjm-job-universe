export type JobDraft = {
  title: string;
  companyName: string;
  location: string;
  salary: string;
  headcount: string;
  gender: string;
  industry: string;
  requirements: string;
  extra: string;
  address: string;
  phone: string;
  viber: string;
  email: string;
};

export const JOB_TEMPLATES: { id: string; label: string; draft: JobDraft }[] = [
  {
    id: "video-editor",
    label: "Video Editor",
    draft: {
      title: "Video Editor",
      companyName: "Pyone & Say Co., Ltd.",
      location: "သာကေတ",
      salary: "400,000 - 700,000 MMK",
      headcount: "2",
      gender: "Any",
      industry: "Advertising / Media",
      requirements:
        "➠ Video Editing အတွေ့အကြုံ အနည်းဆုံး (1) နှစ်ရှိရမည်။\n➠ CapCut, Adobe Premiere Pro သို့မဟုတ် သက်ဆိုင်ရာ Editing Software တစ်မျိုးမျိုး ကျွမ်းကျင်ရမည်။\n➠ Fashion, Product နှင့် Social Media Video Editing အတွေ့အကြုံရှိသူ ဦးစားပေးမည်။\n➠ TikTok နှင့် Facebook Reels Trend များကို နားလည်ရမည်။\n➠ Creative Idea ရှိပြီး အသေးစိတ်ဂရုစိုက်တတ်ရမည်။\n➠ Deadline အတိုင်း တာဝန်ယူပြီး အလုပ်အပ်နိုင်ရမည်။\n➠ Team နှင့် ပူးပေါင်းဆောင်ရွက်နိုင်ပြီး Feedback အပေါ် ပြင်ဆင်နိုင်ရမည်။\n➠ Portfolio သို့မဟုတ် ယခင်တည်းဖြတ်ထားသော Video နမူနာများ ပြသနိုင်ရမည်။",
      extra:
        "Work Type ➠ (3) Days In-house + (3) Days WFH + (1) Day Holiday\nWFH ➠ လုပ်ငန်းအတွေ့အကြုံရှိပြီး သတ်မှတ်ချိန်အတွင်း အလုပ်အပ်နိုင်သူများအား စဉ်းစားပေးမည်။\nCV ➠ CV၊ မျှော်မှန်းလစာနှင့် Video Editing Portfolio/Link\nEmail Subject ➠ Video Editor Application – အမည်",
      address: "No. 137, Myanmar Gone Yi Street, Thaketa Industrial Zone, Thaketa Township, Yangon",
      phone: "095013432",
      viber: "095013432",
      email: "shwesinmin.lace2016@gmail.com",
    },
  },
  {
    id: "sales-marketing",
    label: "Sales & Marketing",
    draft: {
      title: "Sales & Marketing",
      companyName: "Kaung Thant Pharmaceutical Trading",
      location: "သင်္ဃန်းကျွန်း",
      salary: "Basic Salary 550,000 MMK +++",
      headcount: "5",
      gender: "Any",
      industry: "Pharmacy / Medical",
      requirements:
        "➠ တက္ကသိုလ်မှ ဘွဲ့တစ်ခုခုရရှိပြီးသူ (သို့) ကျောင်းကိစ္စကင်းရှင်းသူ (သို့) အထက်တန်းအောင်မြင်ပြီးသူ ဖြစ်ရမည်။\n➠ ပေါင်းသင်းဆက်ဆံရေးပြေပြစ်၍ အသင်းအဖွဲ့နှင့် ပူးပေါင်းဆောင်ရွက်တတ်သူ ဖြစ်ရမည်။\n➠ စိတ်ရှည်သည်းခံနိုင်ပြီး Customer Service ကောင်းကောင်းပေးနိုင်ရမည်။\n➠ ရိုးသားကြိုးစား၍ အကျင့်စာရိတ္တကောင်းမွန်ရမည်။\n➠ Sales & Marketing နယ်ပယ်တွင် အတွေ့အကြုံ (1) နှစ်နှင့်အထက် ရှိရမည်။",
      extra: "Working Hours ➠ 8:30 AM - 5:00 PM\nOff Days ➠ Sunday & Public Holidays",
      address: "သင်္ဃန်းကျွန်းမြို့နယ်၊ ကြီးပွားရေးရပ်ကွက်၊ မြယမုံကမ်းသာယာအိမ်ရာ",
      phone: "09795524692",
      viber: "09795524692",
      email: "",
    },
  },
  {
    id: "system-engineer",
    label: "System Engineer",
    draft: {
      title: "Senior System Engineer",
      companyName: "Wcom",
      location: "လှိုင်",
      salary: "1,400,000 - 1,800,000 MMK",
      headcount: "3",
      gender: "Any",
      industry: "IT / Telecom",
      requirements:
        "➠ Senior Level လုပ်ငန်းအတွေ့အကြုံနှင့် ကျွမ်းကျင်မှုပေါ်မူတည်၍ ညှိနှိုင်းနိုင်ပါသည်။\n➠ CV Form ပေးပို့ရာတွင် လျှောက်ထားလိုသော ရာထူးအမည်ကို ဖော်ပြပေးရန်။",
      extra: "Working Hours ➠ 8:30 AM - 5:30 PM\nOff Days ➠ Saturday, Sunday and Holidays",
      address: "No. (67), Insein Road, Hlaing Township, Yangon",
      phone: "09969908349",
      viber: "09969908349",
      email: "hr@wcombroadband.com",
    },
  },
  {
    id: "call-center",
    label: "Call Center",
    draft: {
      title: "Call Center Agent",
      companyName: "Wcom Broadband",
      location: "လှိုင်",
      salary: "",
      headcount: "5",
      gender: "Any",
      industry: "IT / Telecom",
      requirements:
        "➠ Customer Service ပိုင်းတွင် အတွေ့အကြုံရှိသူ ဦးစားပေးမည်။\n➠ ရုံးချိန်ဖြင့်လည်းကောင်း၊ တာဝန်ချိန်ဆင်းဆောင်ရွက်ရန်။\n➠ ISP Industry ပိုင်းတွင် အတွေ့အကြုံရှိသူ အားဦးစားပေးပါသည်။",
      extra: "",
      address: "No. 67, Insein Road, Hlaing Township, Yangon",
      phone: "09969908349",
      viber: "09969908349",
      email: "hr@wcombroadband.com",
    },
  },
  {
    id: "warehouse",
    label: "Warehouse",
    draft: {
      title: "Warehouse Assistant",
      companyName: "Wcom Broadband",
      location: "လှိုင်",
      salary: "350,000 - 400,000 MMK + OT",
      headcount: "3",
      gender: "Male",
      industry: "Logistics / Transportation",
      requirements:
        "➠ Warehouse ပိုင်းနှင့်ပတ်သက်သည့် လုပ်ငန်းအတွေ့အကြုံရှိရမည်။\n➠ စနေ၊ တနင်္ဂနွေ နှင့် အစိုးရရုံးပိတ်ရက်များ ပိတ်သည်။",
      extra: "Working Hours ➠ 8:30 AM - 5:30 PM\nOff Days ➠ Saturday, Sunday & Public Holidays",
      address: "No. 67, Insein Road, Hlaing Township, Yangon",
      phone: "09969908349",
      viber: "09949220303",
      email: "hr@wcombroadband.com",
    },
  },
];

function grab(text: string, re: RegExp): string {
  const m = text.match(re);
  return (m?.[1] || "").replace(/\s+/g, " ").trim();
}

function blockAfter(text: string, heading: RegExp): string {
  const m = text.match(heading);
  if (!m || m.index === undefined) return "";
  const rest = text.slice(m.index + m[0].length);
  const stop = rest.search(
    /\n\s*(LOCATION|𝐂𝐕|CV|SALARY|WORKING|OFF DAYS|WORK TYPE|EMAIL|VIBER|PHONE)/i,
  );
  const chunk = (stop === -1 ? rest : rest.slice(0, stop)).trim();
  return chunk
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n");
}

export function parseJfjmPost(raw: string): JobDraft {
  const text = raw.normalize("NFKC").replace(/\u200b/g, "").trim();
  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const titleLine = lines[0] || "";
  const title = titleLine
    .replace(/\s*[-–—]\s*.*$/, "")
    .replace(/\s*\(.*$/, "")
    .trim();
  const headcount = grab(titleLine, /\((\d+)\)\s*Posts?/i) || "1";
  const locFromTitle = grab(titleLine, /\(([^)]+)\)\s*$/);
  const companyLine = lines.find((l) => /မှ /.test(l) && /ခေါ်/.test(l)) || "";
  const companyName = companyLine
    .replace(/\s*မှ[\s\S]*$/, "")
    .replace(/[()]/g, "")
    .trim();

  let gender = "Any";
  if (/Male\/Female|Male\/Female/i.test(titleLine)) gender = "Any";
  else if (/\bMale\b/i.test(titleLine) && !/Female/i.test(titleLine)) gender = "Male";
  else if (/\bFemale\b/i.test(titleLine) && !/Male/i.test(titleLine)) gender = "Female";

  const salary = grab(text, /Salary(?:\s*&\s*Benefits)?[^\n]*[➠:>]\s*(.+)/i);
  const address = grab(text, /Location[^\n]*[➠:>]\s*(.+)/i);
  const email = grab(text, /Email[^\n:]*[:]\s*(\S+@\S+)/i);
  const viberRaw = grab(text, /Viber[^\n:]*[:]\s*([0-9+\s\-\/]+)/i);
  const viber = viberRaw.replace(/[^\d]/g, "").slice(0, 15);
  const phone = viber;
  const requirements = blockAfter(text, /Requirements\s*\n/i);
  const extraParts = [
    grab(text, /Work Type[^\n]*[➠:>]\s*(.+)/i) &&
      `Work Type ➠ ${grab(text, /Work Type[^\n]*[➠:>]\s*(.+)/i)}`,
    grab(text, /WFH[^\n]*[➠:>]\s*(.+)/i) &&
      `WFH ➠ ${grab(text, /WFH[^\n]*[➠:>]\s*(.+)/i)}`,
    grab(text, /Working Hours[^\n]*[➠:>]\s*(.+)/i) &&
      `Working Hours ➠ ${grab(text, /Working Hours[^\n]*[➠:>]\s*(.+)/i)}`,
    grab(text, /Off Days[^\n]*[➠:>]\s*(.+)/i) &&
      `Off Days ➠ ${grab(text, /Off Days[^\n]*[➠:>]\s*(.+)/i)}`,
  ].filter(Boolean);

  const industryGuess = /video|editor|fashion|media/i.test(text)
    ? "Advertising / Media"
    : /pharma|pharmacy|medical/i.test(text)
      ? "Pharmacy / Medical"
      : /warehouse/i.test(text)
        ? "Logistics / Transportation"
        : /system engineer|isp|broadband|call center|wcom/i.test(text)
          ? "IT / Telecom"
          : "Other";

  return {
    title: title || "Untitled role",
    companyName: companyName || "Company",
    location: locFromTitle || "ရန်ကုန်",
    salary,
    headcount,
    gender,
    industry: industryGuess,
    requirements,
    extra: extraParts.join("\n"),
    address,
    phone,
    viber,
    email,
  };
}
