export const INDUSTRIES = [
  "Accounting / Audit",
  "Advertising / Media",
  "Agriculture",
  "Automotive",
  "Banking / Finance",
  "Beauty / Wellness",
  "Construction / Engineering",
  "Consulting",
  "Education",
  "Energy",
  "FMCG",
  "Food & Beverage",
  "Government / NGO",
  "Healthcare / Medical",
  "Hospitality / Tourism",
  "HR / Recruitment",
  "Insurance",
  "IT / Software",
  "IT / Telecom",
  "Legal",
  "Logistics / Transportation",
  "Manufacturing",
  "Pharmacy / Medical",
  "Real Estate",
  "Restaurant / Hotel",
  "Retail",
  "Security",
  "Trading",
  "Other",
] as const;

export const TITLE_SUGGEST = [
  "Accountant",
  "Accounting Assistant",
  "Account Executive",
  "Admin Staff",
  "Administrative Assistant",
  "Assistant Manager",
  "Bartender",
  "Business Development Executive",
  "Call Center Staff",
  "Cashier",
  "Content Creator",
  "Customer Service Officer",
  "Data Entry",
  "Digital Marketing Executive",
  "Driver",
  "Electrician",
  "Engineer",
  "Finance Officer",
  "Graphic Designer",
  "HR Assistant",
  "HR Executive",
  "IT Support",
  "Junior Accountant",
  "Junior Sales",
  "Marketing Executive",
  "Office Staff",
  "Operation Executive",
  "Pharmacy Junior Sale",
  "Receptionist",
  "Sales Executive",
  "Sales Representative",
  "Senior Accountant",
  "Social Media Executive",
  "Store Staff",
  "Warehouse Staff",
] as const;

export const YANGON_TOWNSHIPS = [
  "အလုံ",
  "ဗဟန်း",
  "ဗိုလ်တထောင်",
  "ဒဂုံ",
  "အရှေ့ဒဂုံ",
  "မြောက်ဒဂုံ",
  "တောင်ဒဂုံ",
  "ဒဂုံဆိပ်ကမ်း",
  "ဒေါပုံ",
  "လမ်းမတော်",
  "လသာ",
  "လှိုင်",
  "လှိုင်သာယာ",
  "မရမ်းကုန်း",
  "မင်္ဂလာတောင်ညွန့်",
  "မြောက်ဥက္ကလာပ",
  "တောင်ဥက္ကလာပ",
  "ပန်းဘဲတန်း",
  "ပုဇွန်တောင်",
  "စမ်းချောင်း",
  "ဆိပ်ကမ်း",
  "ရွှေပြည်သာ",
  "တာမွေ",
  "သန်လျင်",
  "သင်္ဃန်းကျွန်း",
  "သာကေတ",
  "ရန်ကင်း",
  "ကျောက်တံတား",
  "အင်းစိန်",
  "ကမာရွတ်",
  "ကျောက်မြောင်း",
  "မင်္ဂလာဒုံ",
  "ဒလ",
  "တွံတေး",
  "Hlaing",
  "Hlaing Tharyar",
  "Kamayut",
  "Sanchaung",
  "Mayangone",
  "Tamwe",
  "Insein",
  "Thanlyin",
] as const;

export const GENDERS = ["Any", "Male", "Female"] as const;

export const POST_COST = 40;
export const STARTER_DIAMONDS = 120;

export type EffectKind = "background" | "frame" | "title" | "utility";
export type EffectTier =
  | "loyalty"
  | "collector"
  | "epic"
  | "boss"
  | "legendary";

export type EffectItem = {
  id: string;
  kind: EffectKind;
  tier: EffectTier;
  name: string;
  nameMy: string;
  desc: string;
  prices: { 1: number; 3: number; 7: number };
};

export const EFFECT_TIERS: { id: EffectTier; label: string; labelMy: string }[] =
  [
    { id: "loyalty", label: "Loyalty", labelMy: "သစ္စာ" },
    { id: "collector", label: "Collector", labelMy: "စုဆောင်း" },
    { id: "epic", label: "Epic", labelMy: "Epic" },
    { id: "boss", label: "Boss", labelMy: "Boss" },
    { id: "legendary", label: "Legendary", labelMy: "ဒဏ္ဍာရီ" },
  ];

export const EFFECTS: EffectItem[] = [
  { id: "mist", kind: "background", tier: "loyalty", name: "Mist Drift", nameMy: "မြူလွင့်", desc: "Soft veil across the card", prices: { 1: 8, 3: 20, 7: 42 } },
  { id: "pearl", kind: "background", tier: "loyalty", name: "Pearl", nameMy: "ပုလဲ", desc: "Quiet pearl sheen", prices: { 1: 8, 3: 20, 7: 42 } },
  { id: "ocean", kind: "background", tier: "loyalty", name: "Ocean Pulse", nameMy: "ပင်လယ်လှိုင်း", desc: "Slow aqua wash", prices: { 1: 10, 3: 24, 7: 50 } },
  { id: "moon", kind: "background", tier: "loyalty", name: "Moonlight", nameMy: "လရောင်", desc: "Silver moon veil", prices: { 1: 10, 3: 24, 7: 50 } },
  { id: "sakura", kind: "background", tier: "loyalty", name: "Sakura", nameMy: "ဆာကူရာ", desc: "Soft petal drift", prices: { 1: 12, 3: 28, 7: 58 } },
  { id: "lotus", kind: "background", tier: "loyalty", name: "Lotus Aura", nameMy: "ကြာပန်း", desc: "Warm floral float", prices: { 1: 12, 3: 28, 7: 58 } },
  { id: "ruby", kind: "background", tier: "collector", name: "Ruby Slash", nameMy: "ပတ္တမြား", desc: "Deep garnet cut", prices: { 1: 18, 3: 44, 7: 90 } },
  { id: "emerald", kind: "background", tier: "collector", name: "Emerald", nameMy: "မြစိမ်း", desc: "Jade-leaf glow", prices: { 1: 18, 3: 44, 7: 90 } },
  { id: "jade", kind: "background", tier: "collector", name: "Jade Dynasty", nameMy: "ကျောက်စိမ်း", desc: "Myanmar jade seal", prices: { 1: 22, 3: 54, 7: 110 } },
  { id: "kanote", kind: "background", tier: "collector", name: "Kanote", nameMy: "ကနုတ်", desc: "Lacquer ornament shimmer", prices: { 1: 22, 3: 54, 7: 110 } },
  { id: "solar", kind: "background", tier: "collector", name: "Solar", nameMy: "နေရောင်", desc: "Warm sunburst", prices: { 1: 20, 3: 48, 7: 98 } },
  { id: "starlight", kind: "background", tier: "epic", name: "Starlight", nameMy: "ကြယ်ရောင်", desc: "Night-sky sparkle", prices: { 1: 28, 3: 70, 7: 145 } },
  { id: "cosmos", kind: "background", tier: "epic", name: "Cosmos", nameMy: "စကြဝဠာ", desc: "Slow nebula drift", prices: { 1: 32, 3: 80, 7: 165 } },
  { id: "thunder", kind: "background", tier: "epic", name: "Thunder", nameMy: "မိုးကြိုး", desc: "Electric flash line", prices: { 1: 30, 3: 75, 7: 155 } },
  { id: "neon", kind: "background", tier: "epic", name: "Night Market", nameMy: "ညဈေး", desc: "Yangon night-scan", prices: { 1: 30, 3: 75, 7: 155 } },
  { id: "fire", kind: "background", tier: "epic", name: "Fire Rush", nameMy: "မီးလျှံ", desc: "Ember underline", prices: { 1: 28, 3: 70, 7: 145 } },
  { id: "ice", kind: "background", tier: "epic", name: "Ice Diamond", nameMy: "ရေခဲစိန်", desc: "Cool crystal aura", prices: { 1: 28, 3: 70, 7: 145 } },
  { id: "crystal", kind: "background", tier: "boss", name: "Crystal Throne", nameMy: "ကြည်လင်ရာဇပလ္လင်", desc: "Highest crystal glow", prices: { 1: 48, 3: 120, 7: 250 } },
  { id: "royal", kind: "background", tier: "boss", name: "Royal Lacquer", nameMy: "တော်ဝင်", desc: "Deep lacquer crown", prices: { 1: 52, 3: 130, 7: 270 } },
  { id: "guardian", kind: "background", tier: "boss", name: "Guardian", nameMy: "စောင့်ရှောက်", desc: "Protective jade ring", prices: { 1: 48, 3: 120, 7: 250 } },
  { id: "dragonthrone", kind: "background", tier: "legendary", name: "Naga Throne", nameMy: "နဂါးရာဇပလ္လင်", desc: "Naga-scale prestige", prices: { 1: 80, 3: 200, 7: 420 } },
  { id: "citynetwork", kind: "background", tier: "legendary", name: "City Network", nameMy: "မြို့ကွန်ရက်", desc: "Yangon node map", prices: { 1: 80, 3: 200, 7: 420 } },
  { id: "orbring", kind: "background", tier: "legendary", name: "Orbit Ring", nameMy: "စက်ဝိုင်းလည်", desc: "JFJM neon orbit rings", prices: { 1: 90, 3: 220, 7: 460 } },
  { id: "pulsar", kind: "background", tier: "boss", name: "Pulsar Core", nameMy: "ပယ်လ်ဆာ", desc: "Breathing blue orb glow", prices: { 1: 55, 3: 140, 7: 290 } },
  { id: "warp", kind: "background", tier: "epic", name: "Warp Drive", nameMy: "ဝါ့ပ်", desc: "Light-speed streak field", prices: { 1: 34, 3: 86, 7: 175 } },
  { id: "stargate", kind: "background", tier: "legendary", name: "Star Gate", nameMy: "ကြယ်တံခါး", desc: "Horizon portal ring", prices: { 1: 88, 3: 215, 7: 450 } },
  { id: "constellation", kind: "background", tier: "epic", name: "Constellation", nameMy: "ကြယ်စု", desc: "Mapped star lines", prices: { 1: 32, 3: 80, 7: 165 } },
  { id: "meteor", kind: "background", tier: "epic", name: "Meteor Trail", nameMy: "ဥက္ကာပျံ", desc: "Gold-cyan comet dash", prices: { 1: 30, 3: 75, 7: 155 } },
  { id: "hologram", kind: "background", tier: "boss", name: "Holo Scan", nameMy: "ဟိုလိုဂရမ်", desc: "Universe HUD scanlines", prices: { 1: 50, 3: 125, 7: 260 } },
  { id: "frame-gold", kind: "frame", tier: "collector", name: "Sand Frame", nameMy: "သဲရောင်ဘောင်", desc: "Warm sand border", prices: { 1: 16, 3: 40, 7: 82 } },
  { id: "frame-jade", kind: "frame", tier: "epic", name: "Jade Frame", nameMy: "ကျောက်စိမ်းဘောင်", desc: "Jade ring border", prices: { 1: 24, 3: 60, 7: 125 } },
  { id: "frame-royal", kind: "frame", tier: "boss", name: "Royal Frame", nameMy: "တော်ဝင်ဘောင်", desc: "Lacquer-gold ring", prices: { 1: 36, 3: 90, 7: 185 } },
  { id: "frame-diamond", kind: "frame", tier: "legendary", name: "Diamond Frame", nameMy: "စိန်ဘောင်", desc: "Ice-cut outer ring", prices: { 1: 50, 3: 125, 7: 255 } },
  { id: "frame-orbit", kind: "frame", tier: "legendary", name: "Orbit Frame", nameMy: "အော်ဘစ်ဘောင်", desc: "Cyan + gold ring lock", prices: { 1: 58, 3: 145, 7: 300 } },
  { id: "frame-jfjm", kind: "frame", tier: "boss", name: "Universe Frame", nameMy: "ယူနီဗတ်စ်ဘောင်", desc: "JFJM blue orb rim", prices: { 1: 42, 3: 105, 7: 220 } },
  { id: "title-shimmer", kind: "title", tier: "epic", name: "Title Shimmer", nameMy: "ခေါင်းစဉ်လင်း", desc: "Shimmering job title", prices: { 1: 20, 3: 50, 7: 105 } },
  { id: "title-jade", kind: "title", tier: "boss", name: "Cyan Title", nameMy: "စီယန်ခေါင်းစဉ်", desc: "Ice-cyan title wash", prices: { 1: 28, 3: 70, 7: 145 } },
  { id: "title-universe", kind: "title", tier: "legendary", name: "Universe Title", nameMy: "ယူနီဗတ်စ်ခေါင်းစဉ်", desc: "Blue-white universe type", prices: { 1: 36, 3: 90, 7: 185 } },
  { id: "pin", kind: "utility", tier: "epic", name: "Pin Post", nameMy: "အပေါ်ဆုံးတင်", desc: "Stay at the top of the feed", prices: { 1: 40, 3: 105, 7: 220 } },
  { id: "featured", kind: "utility", tier: "collector", name: "Featured", nameMy: "အထူးရွေး", desc: "Featured badge on the card", prices: { 1: 18, 3: 45, 7: 95 } },
  { id: "highlight", kind: "utility", tier: "loyalty", name: "Highlight", nameMy: "အသားပေး", desc: "Warm title highlight", prices: { 1: 12, 3: 30, 7: 62 } },
];

export const EFFECT_MAP = Object.fromEntries(EFFECTS.map((e) => [e.id, e])) as Record<
  string,
  EffectItem
>;

export const CALM_MESSAGES = [
  "ဒီနေ့ အားလုံးပြီးဖို့မလိုပါဘူး။ အရေးကြီးဆုံးတစ်ခုကိုပဲ ဖြည်းဖြည်းလုပ်ပါ။",
  "အလုပ်တစ်ခုက သင့်ဘဝတစ်ခုလုံး မဟုတ်ပါ။ ရှူသွင်း၊ ရှူထုတ်၊ ရှေ့ဆက်ပါ။",
  "အခွင့်အလမ်းက နေ့တိုင်းပေါ်လာတယ်။ ဒီနေ့ တစ်ခုပဲ ဖွင့်ကြည့်ပါ။",
  "ခဏနားပြီးမှ CV ကို ပြန်ဖတ်ပါ။ စိတ်အေးမှ စာလုံးမှန်တယ်။",
];

export const COMMENT_PRESETS = [
  "စိတ်ဝင်စားပါတယ်",
  "CV ပို့ပြီးပါပြီ",
  "လျှောက်ထားပြီးပါပြီ",
  "အသေးစိတ် သိချင်ပါတယ်",
];
