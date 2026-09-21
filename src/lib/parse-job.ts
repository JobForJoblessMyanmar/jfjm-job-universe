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

export function jfjmHeadline(job: {
  title: string;
  gender?: string | null;
  headcount?: string | null;
  location?: string | null;
}): string {
  const gender = job.gender && job.gender !== "Any" ? ` - ${job.gender}` : "";
  const posts = job.headcount ? ` (${job.headcount}) Posts` : "";
  const loc = job.location ? ` (${job.location})` : "";
  return `${job.title}${gender}${posts}${loc}`;
}

export function composeJfjmPost(draft: JobDraft): string {
  if (draft.extra.includes("#JFJM") && draft.extra.includes("Requirements")) {
    return draft.extra.trim();
  }
  const lines: string[] = [];
  lines.push(
    `${draft.companyName} မှ တိုက်ရိုက်ခေါ်ယူထားသော အလုပ်ခေါ်စာဖြစ်ပါသည်။ #JFJM`,
  );
  lines.push("");
  if (draft.salary) lines.push(`Salary ➠ ${draft.salary}`);
  if (draft.extra) {
    lines.push("");
    lines.push(draft.extra.trim());
  }
  if (draft.requirements) {
    lines.push("");
    lines.push("Requirements");
    lines.push(draft.requirements.trim());
  }
  if (draft.address) {
    lines.push("");
    lines.push(`Location ➠ ${draft.address}`);
  }
  const cv: string[] = [];
  if (draft.email) cv.push(`➠ Email : ${draft.email}`);
  if (draft.viber) cv.push(`➠ Viber : ${draft.viber}`);
  if (draft.phone && draft.phone !== draft.viber) {
    cv.push(`➠ Phone : ${draft.phone}`);
  }
  if (cv.length) {
    lines.push("");
    lines.push("CV တင်ရန်");
    lines.push(...cv);
  }
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export const JOB_TEMPLATES: { id: string; label: string; draft: JobDraft }[] = [
  {
    id: "video-editor",
    label: "Video Editor",
    draft: {
      title: "Video Editor",
      companyName: "Pyone & Say Co., Ltd.",
      location: "သာကေတ",
      salary:
        "400,000 - 700,000 MMK (အတွေ့အကြုံ၊ Editing Skill နှင့် Portfolio ပေါ်မူတည်၍ ညှိနှိုင်းနိုင်ပါသည်။)",
      headcount: "2",
      gender: "Any",
      industry: "Advertising / Media",
      requirements:
        "➠ Video Editing အတွေ့အကြုံ အနည်းဆုံး (1) နှစ်ရှိရမည်။\n➠ CapCut, Adobe Premiere Pro သို့မဟုတ် သက်ဆိုင်ရာ Editing Software တစ်မျိုးမျိုး ကျွမ်းကျင်ရမည်။\n➠ Fashion, Product နှင့် Social Media Video Editing အတွေ့အကြုံရှိသူ ဦးစားပေးမည်။\n➠ TikTok နှင့် Facebook Reels Trend များကို နားလည်ရမည်။\n➠ Creative Idea ရှိပြီး အသေးစိတ်ဂရုစိုက်တတ်ရမည်။\n➠ Deadline အတိုင်း တာဝန်ယူပြီး အလုပ်အပ်နိုင်ရမည်။\n➠ Team နှင့် ပူးပေါင်းဆောင်ရွက်နိုင်ပြီး Feedback အပေါ် ပြင်ဆင်နိုင်ရမည်။\n➠ Portfolio သို့မဟုတ် ယခင်တည်းဖြတ်ထားသော Video နမူနာများ ပြသနိုင်ရမည်။",
      extra:
        "Pyone & Say Co., Ltd. (Fashion & Local Brands) မှ စက်တင်ဘာ ၂၀ ရက်နေ့တွင် တိုက်ရိုက်ခေါ်ယူထားသော အလုပ်ခေါ်စာဖြစ်ပါသည်။ #JFJM\n\nSalary ➠ 400,000 - 700,000 MMK (အတွေ့အကြုံ၊ Editing Skill နှင့် Portfolio ပေါ်မူတည်၍ ညှိနှိုင်းနိုင်ပါသည်။)\n\nWork Type ➠ (3) Days In-house + (3) Days WFH + (1) Day Holiday\n\nWFH ➠ လုပ်ငန်းအတွေ့အကြုံရှိပြီး သတ်မှတ်ချိန်အတွင်း အလုပ်အပ်နိုင်သူများအား စဉ်းစားပေးမည်။\n\nRequirements\n➠ Video Editing အတွေ့အကြုံ အနည်းဆုံး (1) နှစ်ရှိရမည်။\n➠ CapCut, Adobe Premiere Pro သို့မဟုတ် သက်ဆိုင်ရာ Editing Software တစ်မျိုးမျိုး ကျွမ်းကျင်ရမည်။\n➠ Fashion, Product နှင့် Social Media Video Editing အတွေ့အကြုံရှိသူ ဦးစားပေးမည်။\n➠ TikTok နှင့် Facebook Reels Trend များကို နားလည်ရမည်။\n➠ Creative Idea ရှိပြီး အသေးစိတ်ဂရုစိုက်တတ်ရမည်။\n➠ Deadline အတိုင်း တာဝန်ယူပြီး အလုပ်အပ်နိုင်ရမည်။\n➠ Team နှင့် ပူးပေါင်းဆောင်ရွက်နိုင်ပြီး Feedback အပေါ် ပြင်ဆင်နိုင်ရမည်။\n➠ Portfolio သို့မဟုတ် ယခင်တည်းဖြတ်ထားသော Video နမူနာများ ပြသနိုင်ရမည်။\n\nLocation ➠ No. 137, Myanmar Gone Yi Street, Thaketa Industrial Zone, Thaketa Township, Yangon\n\nCV တင်ရန်\n➠ Email : shwesinmin.lace2016@gmail.com\n➠ Viber : 09 501 3432 (Viber Only)\n➠ CV၊ မျှော်မှန်းလစာနှင့် Video Editing Portfolio/Link တို့ကို ပေးပို့လျှောက်ထားနိုင်ပါသည်။\n➠ Email Subject တွင် “Video Editor Application – အမည်” ဟု ရေးသားပေးရန်။",
      address:
        "No. 137, Myanmar Gone Yi Street, Thaketa Industrial Zone, Thaketa Township, Yangon",
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
      gender: "Male/Female",
      industry: "Pharmacy / Medical",
      requirements:
        "➠ တက္ကသိုလ်မှ ဘွဲ့တစ်ခုခုရရှိပြီးသူ (သို့) ကျောင်းကိစ္စကင်းရှင်းသူ (သို့) အထက်တန်းအောင်မြင်ပြီးသူ ဖြစ်ရမည်။\n➠ ပေါင်းသင်းဆက်ဆံရေးပြေပြစ်၍ အသင်းအဖွဲ့နှင့် ပူးပေါင်းဆောင်ရွက်တတ်သူ ဖြစ်ရမည်။\n➠ စိတ်ရှည်သည်းခံနိုင်ပြီး Customer Service ကောင်းကောင်းပေးနိုင်ရမည်။\n➠ ရိုးသားကြိုးစား၍ အကျင့်စာရိတ္တကောင်းမွန်ရမည်။\n➠ Sales & Marketing နယ်ပယ်တွင် အတွေ့အကြုံ (1) နှစ်နှင့်အထက် ရှိရမည်။",
      extra:
        "Kaung Thant Pharmaceutical Trading မှ စက်တင်ဘာ ၂၀ ရက်နေ့တွင် တိုက်ရိုက်ခေါ်ယူထားသော အလုပ်ခေါ်စာဖြစ်ပါသည်။ #JFJM\n\nSalary & Benefits ➠ Basic Salary 550,000 MMK +++\n\nRequirements\n➠ တက္ကသိုလ်မှ ဘွဲ့တစ်ခုခုရရှိပြီးသူ (သို့) ကျောင်းကိစ္စကင်းရှင်းသူ (သို့) အထက်တန်းအောင်မြင်ပြီးသူ ဖြစ်ရမည်။\n➠ ပေါင်းသင်းဆက်ဆံရေးပြေပြစ်၍ အသင်းအဖွဲ့နှင့် ပူးပေါင်းဆောင်ရွက်တတ်သူ ဖြစ်ရမည်။\n➠ စိတ်ရှည်သည်းခံနိုင်ပြီး Customer Service ကောင်းကောင်းပေးနိုင်ရမည်။\n➠ ရိုးသားကြိုးစား၍ အကျင့်စာရိတ္တကောင်းမွန်ရမည်။\n➠ Sales & Marketing နယ်ပယ်တွင် အတွေ့အကြုံ (1) နှစ်နှင့်အထက် ရှိရမည်။\n\nWorking Hours ➠ 8:30 AM - 5:00 PM\n\nOff Days ➠ Sunday & Public Holidays\n\nLocation ➠ သင်္ဃန်းကျွန်းမြို့နယ်၊ ကြီးပွားရေးရပ်ကွက်၊ မြယမုံကမ်းသာယာအိမ်ရာ\n\nCV တင်ရန်\n➠ Viber / Telegram : 09795524692",
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
      salary:
        "1,400,000 - 1,800,000 MMK (Senior Level လုပ်ငန်းအတွေ့အကြုံနှင့် ကျွမ်းကျင်မှုပေါ်မူတည်၍ ညှိနှိုင်းနိုင်ပါသည်။)",
      headcount: "3",
      gender: "Any",
      industry: "IT / Telecom",
      requirements:
        "➠ CV Form ပေးပို့ရာတွင် လျှောက်ထားလိုသော ရာထူးအမည်ကို ဖော်ပြပေးရန် လိုအပ်ပါသည်။",
      extra:
        "Wcom မှ စက်တင်ဘာ ၂၀ ရက်နေ့တွင် တိုက်ရိုက်ခေါ်ယူထားသော အလုပ်ခေါ်စာဖြစ်ပါသည်။ #JFJM\n\nSalary ➠ 1,400,000 - 1,800,000 MMK (Senior Level လုပ်ငန်းအတွေ့အကြုံနှင့် ကျွမ်းကျင်မှုပေါ်မူတည်၍ ညှိနှိုင်းနိုင်ပါသည်။)\n\nWorking Hours ➠ 8:30 AM - 5:30 PM\n\nOff Days ➠ Saturday, Sunday and Holidays\n\nLocation ➠ No. (67), Insein Road, Hlaing Township, Yangon\n\nCV တင်ရန်\n➠ Email : hr@wcombroadband.com\n➠ Viber : 09-969908349\n➠ CV Form ပေးပို့ရာတွင် လျှောက်ထားလိုသော ရာထူးအမည်ကို ဖော်ပြပေးရန် လိုအပ်ပါသည်။",
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
      gender: "Male/Female",
      industry: "IT / Telecom",
      requirements:
        "➠ Customer Service ပိုင်းတွင် အတွေ့အကြုံရှိသူ ဦးစားပေးမည်။\n➠ ရုံးချိန်ဖြင့်လည်းကောင်း၊ တာဝန်ချိန်ဆင်းဆောင်ရွက်ရန်။\n➠ ISP Industry ပိုင်းတွင် အတွေ့အကြုံရှိသူ အားဦးစားပေးပါသည်။",
      extra:
        "Wcom Broadband (ISP Industry) မှ စက်တင်ဘာ ၂၀ ရက်နေ့တွင် တိုက်ရိုက်ခေါ်ယူထားသော အလုပ်ခေါ်စာဖြစ်ပါသည်။ #JFJM\n\nRequirements\n➠ Customer Service ပိုင်းတွင် အတွေ့အကြုံရှိသူ ဦးစားပေးမည်။\n➠ ရုံးချိန်ဖြင့်လည်းကောင်း၊ တာဝန်ချိန်ဆင်းဆောင်ရွက်ရန်။\n➠ ISP Industry ပိုင်းတွင် အတွေ့အကြုံရှိသူ အားဦးစားပေးပါသည်။\n\nLocation ➠ No. 67, Insein Road, Hlaing Township, Yangon\n\nCV တင်ရန်\n➠ Email : hr@wcombroadband.com\n➠ Viber : 09-969908349",
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
      extra:
        "Wcom Broadband မှ စက်တင်ဘာ ၂၀ ရက်နေ့တွင် တိုက်ရိုက်ခေါ်ယူထားသော အလုပ်ခေါ်စာဖြစ်ပါသည်။ #JFJM\n\nSalary & Benefits ➠ 350,000 - 400,000 MMK + OT\n\nRequirements\n➠ Warehouse ပိုင်းနှင့်ပတ်သက်သည့် လုပ်ငန်းအတွေ့အကြုံရှိရမည်။\n➠ စနေ၊ တနင်္ဂနွေ နှင့် အစိုးရရုံးပိတ်ရက်များ ပိတ်သည်။\n\nWorking Hours ➠ 8:30 AM - 5:30 PM\n\nOff Days ➠ Saturday, Sunday & Public Holidays\n\nLocation ➠ No. 67, Insein Road, Hlaing Township, Yangon\n\nCV တင်ရန်\n➠ Email : hr@wcombroadband.com\n➠ Viber : 09-969908349 / 09-949220303",
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
    /\n\s*(LOCATION|CV|SALARY|WORKING|OFF DAYS|WORK TYPE|EMAIL|VIBER|PHONE)/i,
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
  if (/Male\/Female/i.test(titleLine)) gender = "Male/Female";
  else if (/\bMale\b/i.test(titleLine) && !/Female/i.test(titleLine)) gender = "Male";
  else if (/\bFemale\b/i.test(titleLine) && !/Male/i.test(titleLine)) gender = "Female";

  const salary = grab(text, /Salary(?:\s*&\s*Benefits)?[^\n]*[➠:>]\s*(.+)/i);
  const address = grab(text, /Location[^\n]*[➠:>]\s*(.+)/i);
  const email = grab(text, /Email[^\n:]*[:]\s*(\S+@\S+)/i);
  const viberRaw = grab(text, /Viber[^\n:]*[:]\s*([0-9+\s\-\/]+)/i);
  const viber = viberRaw.replace(/[^\d]/g, "").slice(0, 15);
  const requirements = blockAfter(text, /Requirements\s*\n/i);

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
    extra: text,
    address,
    phone: viber,
    viber,
    email,
  };
}
