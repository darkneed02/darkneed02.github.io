#!/usr/bin/env node
/* ============================================================
   build.js — ต่อ component/** เป็น static HTML สองภาษา

   ใช้งาน:  node build.js
   ผลลัพธ์: index.html (ไทย)  และ  en/index.html (อังกฤษ)

   ทำไมต้อง build: crawler ที่ไม่รัน JS (GPTBot, ClaudeBot,
   PerplexityBot, ATS, LINE/Facebook preview) มองไม่เห็นเนื้อหา
   ที่ฉีดด้วย fetch().innerHTML — output ของสคริปต์นี้เป็น
   HTML static 100% จึงอ่านได้ทุกตัว

   แก้เนื้อหาที่ component/** และคำแปลที่ assets/js/i18n.js
   แล้วรัน node build.js ใหม่ทุกครั้ง — ห้ามแก้ไฟล์ output ตรงๆ
   ============================================================ */

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const COMPONENT_DIR = path.join(ROOT, "component");
const LAYOUT = path.join(COMPONENT_DIR, "layout.html");
const I18N_FILE = path.join(ROOT, "assets", "js", "i18n.js");
const profile = require("./data/profile");

/* โดเมนจริงของเว็บ — ใช้กับ canonical / hreflang / sitemap / JSON-LD
   ค่าอยู่ใน data/profile.js เพราะ tools/make-resume.js ต้องใช้ค่าเดียวกัน */
const BASE_URL = profile.site.baseUrl;

/* ฟอร์มติดต่อ: GitHub Pages รัน PHP ไม่ได้ จึงต้องใช้ endpoint ภายนอก
   ขอ access key ฟรีที่ https://web3forms.com (กรอกอีเมล แล้วเขาส่ง key มาให้)
   แล้ววางตรงนี้ — ฟอร์มจะขึ้นบนหน้าเว็บทันทีที่ build ใหม่
   ถ้าเว้นว่างไว้ จะแสดงปุ่มส่งอีเมลแทน เพื่อไม่ให้มีฟอร์มที่กดแล้วไม่ทำงาน */
const CONTACT_FORM_KEY = "";

const URL_TH = BASE_URL + "/";
const URL_EN = BASE_URL + "/en/";

const PAGES = [
  {
    lang: "th",
    outFile: path.join(ROOT, "index.html"),
    assetPrefix: "", // อยู่ที่ root — path เดิมใช้ได้เลย
    canonical: URL_TH,
    altUrl: "en/", // ลิงก์ไปหน้าอีกภาษา (relative จาก root)
    altLang: "en",
    altLabel: "EN",
    altAriaLabel: "Switch to English",
    title: "Full Stack Developer (PHP/Laravel) ปทุมธานี — จารุวัฒน์ อำนวยสัตย์",
    description:
      "จารุวัฒน์ อำนวยสัตย์ (ฟิล์ม) — Full Stack Developer ประสบการณ์ 6 ปี ถนัด PHP/Laravel, PostgreSQL, REST API และระบบหลังบ้านองค์กร เชื่อมต่อ SAP และระบบธนาคาร อยู่ปทุมธานี พร้อมทำงาน Remote",
    ogLocale: "th_TH",
    ogImage: "assets/images/og-cover-th.jpg",
    ogImageAlt: "จารุวัฒน์ อำนวยสัตย์ — Full Stack Developer (PHP/Laravel)",
    /* ไฟล์ Resume แยกภาษา — generate ด้วย tools/make-resume.js
       resumeDownload คือชื่อไฟล์ตอนที่ HR กดเซฟลงเครื่อง (ตั้งผ่าน
       attribute download) ใช้ ASCII ล้วนเพื่อให้ชื่อไฟล์ไม่เพี้ยนข้ามระบบ */
    resumePdf: "assets/pdf/resume.pdf",
    resumeDownload: "Jaruwat-Amnuaysat-Full-Stack-Developer-TH.pdf",
  },
  {
    lang: "en",
    outFile: path.join(ROOT, "en", "index.html"),
    assetPrefix: "../", // อยู่ใน /en/ — ต้องถอยขึ้นหนึ่งชั้น
    canonical: URL_EN,
    altUrl: "../",
    altLang: "th",
    altLabel: "TH",
    altAriaLabel: "เปลี่ยนเป็นภาษาไทย",
    title: "Jaruwat Amnuaysat — Full Stack Developer (PHP/Laravel), Pathum Thani Thailand",
    description:
      "Jaruwat Amnuaysat (Film) — Full Stack Developer with 6 years of experience in PHP/Laravel, PostgreSQL and REST API, specialising in enterprise back-office systems with SAP and banking integration. Based in Pathum Thani, Thailand — open to remote.",
    ogLocale: "en_US",
    ogImage: "assets/images/og-cover-en.jpg",
    ogImageAlt: "Jaruwat Amnuaysat — Full Stack Developer (PHP/Laravel)",
    resumePdf: "assets/pdf/resume-en.pdf",
    resumeDownload: "Jaruwat-Amnuaysat-Full-Stack-Developer.pdf",
  },
];

const BANNER = (lang) =>
  `<!--\n  ไฟล์นี้สร้างอัตโนมัติโดย build.js — ห้ามแก้ตรงนี้\n  แก้ที่ component/** และ assets/js/i18n.js แล้วรัน: node build.js\n  language: ${lang}\n-->\n`;

/* ============================================================
   โหลด dictionary จาก i18n.js (ไฟล์เดียวกับที่เคยใช้ตอน runtime)
   ============================================================ */
function loadDictionaries() {
  const src = fs.readFileSync(I18N_FILE, "utf8");
  const sandbox = { window: {}, document: { querySelectorAll: () => [] }, localStorage: {} };
  sandbox.window.document = sandbox.document;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: "i18n.js" });
  const dicts = sandbox.window.cvI18n;
  if (!dicts || !dicts.th || !dicts.en) {
    throw new Error("อ่าน window.cvI18n จาก i18n.js ไม่ได้");
  }
  return dicts;
}

/* ============================================================
   include — แทน <!-- @include path --> ด้วยเนื้อไฟล์
   ============================================================ */
const INCLUDE_RE = /<!--\s*@include\s+([^\s]+?)\s*-->/g;

function resolveIncludes(html, depth = 0) {
  if (depth > 5) throw new Error("@include ซ้อนกันลึกเกินไป (อาจวนลูป)");
  let found = false;
  const out = html.replace(INCLUDE_RE, (_, rel) => {
    found = true;
    const file = path.join(COMPONENT_DIR, rel);
    if (!fs.existsSync(file)) throw new Error(`ไม่พบไฟล์ include: ${rel}`);
    return fs.readFileSync(file, "utf8").trim();
  });
  return found ? resolveIncludes(out, depth + 1) : out;
}

/* ============================================================
   หา closing tag ที่คู่กัน โดยนับความลึกของ tag ชื่อเดียวกัน
   คืนค่า index ของ "<" ใน </tag> ที่คู่กัน หรือ -1 ถ้าหาไม่เจอ
   ============================================================ */
function findMatchingClose(html, tag, fromIndex) {
  const re = new RegExp(`<(/?)${tag}\\b([^>]*)>`, "gi");
  re.lastIndex = fromIndex;
  let depth = 0;
  let m;
  while ((m = re.exec(html))) {
    const isClose = m[1] === "/";
    const selfClosing = /\/\s*$/.test(m[2]);
    if (isClose) {
      if (depth === 0) return m.index;
      depth--;
    } else if (!selfClosing) {
      depth++;
    }
  }
  return -1;
}

/* ============================================================
   applyDict — แทนเนื้อหาของ element ที่มี data-i18n ด้วยคำแปล
   ใช้กติกาเดียวกับ applyLanguage() ตอน runtime:
   ถ้าไม่มี key ใน dict ให้คงเนื้อหาเดิมจาก component ไว้
   ============================================================ */
const I18N_OPEN_RE = /<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*?\bdata-i18n\s*=\s*"([^"]+)"[^>]*?)>/g;

function applyDict(html, dict, report) {
  let out = "";
  let cursor = 0;
  let m;
  I18N_OPEN_RE.lastIndex = 0;
  while ((m = I18N_OPEN_RE.exec(html))) {
    const [openTag, tag, , key] = m;
    const innerStart = m.index + openTag.length;
    const closeIndex = findMatchingClose(html, tag, innerStart);
    if (closeIndex === -1) {
      report.unclosed.push(`${key} (<${tag}>)`);
      continue;
    }
    const original = html.slice(innerStart, closeIndex);
    if (original.includes("data-i18n")) report.nested.push(key);

    report.used.add(key);
    const value = dict[key];
    if (value === undefined) report.missing.push(key);

    out += html.slice(cursor, innerStart) + (value !== undefined ? value : original);
    cursor = closeIndex;
    I18N_OPEN_RE.lastIndex = closeIndex;
  }
  return out + html.slice(cursor);
}

/* ============================================================
   applyDictAttr — แปล attribute ผ่าน data-i18n-attr
   รูปแบบ: data-i18n-attr="alt:key.one;title:key.two"
   (ตอน runtime เดิมแปลได้แค่เนื้อหา ไม่เคยแปล attribute)
   ============================================================ */
const I18N_ATTR_RE = /<[a-zA-Z][a-zA-Z0-9]*\b[^>]*\bdata-i18n-attr="([^"]+)"[^>]*>/g;

/* ข้อจำกัด: ห้ามใส่ data-i18n กับ data-i18n-attr บน element เดียวกัน
   เพราะ applyDict จะแทนเนื้อในด้วยค่าจาก dict ซึ่งอาจมี ">" ปนอยู่
   แล้ว regex ของ applyDictAttr ที่จับ open tag ด้วย [^>]* จะจบผิดที่ */
function applyDictAttr(html, dict, report) {
  const tagRe = /<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*\bdata-i18n-attr="[^"]*"[^>]*)>/g;
  let m;
  while ((m = tagRe.exec(html))) {
    if (/\bdata-i18n\s*=/.test(m[2])) {
      report.unsafeAttrTag.push(`<${m[1]}> (มีทั้ง data-i18n และ data-i18n-attr)`);
    }
  }
  return html.replace(I18N_ATTR_RE, (openTag, mapping) => {
    let out = openTag;
    for (const pair of mapping.split(";")) {
      const [attr, key] = pair.split(":").map((x) => x && x.trim());
      if (!attr || !key) continue;
      report.used.add(key);
      const value = dict[key];
      if (value === undefined) {
        report.missing.push(key);
        continue;
      }
      const attrRe = new RegExp(`\\b${attr}="[^"]*"`);
      if (attrRe.test(out)) out = out.replace(attrRe, `${attr}="${escapeHtml(value)}"`);
      else out = out.replace(/>$/, ` ${attr}="${escapeHtml(value)}">`);
    }
    return out;
  });
}

/* ============================================================
   rewriteAssetPaths — เติม prefix ให้ path แบบ relative
   ผูกกับชื่อ attribute เพื่อไม่ให้ไปโดน https:// หรือ #anchor
   ============================================================ */
function rewriteAssetPaths(html, prefix) {
  if (!prefix) return html;
  return html.replace(
    /\b(href|src|data-background)="(assets\/)/g,
    (_, attr, p) => `${attr}="${prefix}${p}`
  );
}

/* ============================================================
   token — ค่าเฉพาะหน้า
   ============================================================ */
function applyTokens(html, page, dict) {
  const tokens = {
    AGE_SUFFIX: dict["about.bio.age.suffix"] || " ปี",
    LANG: page.lang,
    TITLE: escapeHtml(page.title),
    DESCRIPTION: escapeHtml(page.description),
    OG_DESCRIPTION: escapeHtml(page.description),
    OG_LOCALE: page.ogLocale,
    OG_LOCALE_ALT: PAGES.find((p) => p.lang !== page.lang).ogLocale,
    /* og:image ต้องเป็น absolute URL เสมอ — และการเป็น absolute
       ยังกัน rewriteAssetPaths ไม่ให้ไปเติม ../ ให้ด้วย */
    OG_IMAGE: BASE_URL + "/" + page.ogImage,
    OG_IMAGE_ALT: escapeHtml(page.ogImageAlt),
    /* path แบบ relative — rewriteAssetPaths จะเติม ../ ให้เองสำหรับหน้า /en/ */
    RESUME_PDF: page.resumePdf,
    RESUME_DOWNLOAD: escapeHtml(page.resumeDownload),
    CONTACT_FORM_KEY: escapeHtml(CONTACT_FORM_KEY),
    JSON_LD: [jsonLdBlock(buildJsonLd(page)), buildFaqJsonLd(dict, page) && jsonLdBlock(buildFaqJsonLd(dict, page))]
      .filter(Boolean)
      .join("\n    "),
    CANONICAL: page.canonical,
    BASE_URL: BASE_URL,
    URL_TH: URL_TH,
    URL_EN: URL_EN,
    ALT_URL: page.altUrl,
    ALT_LANG: page.altLang,
    ALT_LABEL: page.altLabel,
    ALT_ARIA_LABEL: page.altAriaLabel,
  };
  return html.replace(/\{\{([A-Z_]+)\}\}/g, (full, name) => {
    if (!(name in tokens)) throw new Error(`ไม่รู้จัก token: ${full}`);
    return tokens[name];
  });
}

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* เลือกค่าตามภาษา — รองรับทั้ง {th,en} และค่าธรรมดา */
const L = (v, lang) => (v && typeof v === "object" && !Array.isArray(v) && v[lang] !== undefined ? v[lang] : v);
const abs = (p) => BASE_URL + "/" + String(p).replace(/^\//, "");

/* ============================================================
   JSON-LD — ProfilePage ครอบ Person
   นี่คือส่วนที่บอก AI ว่า "เราคือใคร หางานตำแหน่งอะไร ทำอะไรเป็น"
   ============================================================ */
function buildJsonLd(page) {
  const lang = page.lang;
  const p = profile.person;
  const current = profile.work.find((w) => !w.endDate);

  const personNode = {
    "@type": "Person",
    "@id": BASE_URL + "/#person",
    name: L(p.name, lang),
    alternateName: L(p.alternateName, lang),
    givenName: p.givenName,
    familyName: p.familyName,
    jobTitle: L(p.jobTitle, lang),
    description: L(p.summary, lang),
    url: page.canonical,
    image: abs(p.image),
    email: "mailto:" + p.email,
    telephone: p.telephone,
    address: {
      "@type": "PostalAddress",
      addressLocality: L(p.address.locality, lang),
      addressRegion: L(p.address.region, lang),
      addressCountry: p.address.country,
    },
    sameAs: p.sameAs,
    knowsAbout: p.knowsAbout,
    knowsLanguage: p.languages.map((l) => ({ "@type": "Language", name: L(l.name, lang) })),
    alumniOf: profile.education.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: L(e.institution, lang),
    })),
    worksFor: current ? { "@type": "Organization", name: L(current.company, lang) } : undefined,
    hasOccupation: {
      "@type": "Occupation",
      name: L(p.jobTitle, lang)[0],
      description: L(p.headline, lang),
      occupationLocation: [
        { "@type": "AdministrativeArea", name: L(p.address.region, lang) },
        { "@type": "AdministrativeArea", name: lang === "th" ? "กรุงเทพมหานคร" : "Bangkok" },
      ],
      skills: p.knowsAbout.join(", "),
    },
    hasCredential: profile.certificates.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: L(c.name, lang),
      credentialCategory: "certificate",
      url: c.url,
      recognizedBy: { "@type": "Organization", name: c.issuer },
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": page.canonical + "#profilepage",
    url: page.canonical,
    inLanguage: lang,
    name: page.title,
    description: page.description,
    mainEntity: personNode,
  };

  return JSON.stringify(graph, null, 2);
}

/* ============================================================
   FAQ — เนื้อหาเดียวกันถูกใช้ทั้งใน markup และ FAQPage schema
   ดึงจาก i18n เพื่อไม่ให้คำตอบบนหน้ากับใน schema หลุดจากกัน
   ============================================================ */
const FAQ_KEYS = ["work", "stack", "location", "experience", "start"];

function faqPairs(dict) {
  return FAQ_KEYS.map((k) => ({
    q: dict[`faq.${k}.q`],
    a: dict[`faq.${k}.a`],
  })).filter((x) => x.q && x.a);
}

function buildFaqJsonLd(dict, page) {
  const pairs = faqPairs(dict);
  if (!pairs.length) return null;
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": page.canonical + "#faq",
      inLanguage: page.lang,
      mainEntity: pairs.map((x) => ({
        "@type": "Question",
        name: stripTags(x.q),
        acceptedAnswer: { "@type": "Answer", text: stripTags(x.a) },
      })),
    },
    null,
    2
  );
}

function stripTags(s) {
  return String(s)
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* JSON-LD ต้องไม่มี "</script>" หลุดออกไปปิด tag ก่อนเวลา */
function jsonLdBlock(json) {
  return `<script type="application/ld+json">\n${json.replace(/</g, "\\u003c")}\n    </script>`;
}

/* ============================================================
   ฟอร์มติดต่อ — ถ้ายังไม่ได้ตั้ง access key ให้ใช้ปุ่มส่งอีเมลแทน
   ดีกว่าโชว์ฟอร์มที่กดส่งแล้วไม่มีอะไรเกิดขึ้น
   ============================================================ */
function buildContactBlock() {
  const file = CONTACT_FORM_KEY
    ? "body/contact-form.html"
    : "body/contact-cta.html";
  return fs.readFileSync(path.join(COMPONENT_DIR, file), "utf8").trim();
}

/* ============================================================
   robots.txt — ระบุ bot สายหางาน/AI ให้ชัด
   ถ้าบล็อกบอทพวกนี้ = แพลตฟอร์มนั้นอ้างอิงเราไม่ได้เลย
   ============================================================ */
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "Amazonbot",
  "meta-externalagent",
  "LinkedInBot",
  "Twitterbot",
  "facebookexternalhit",
];

function buildRobots() {
  const lines = [
    "# อนุญาต crawler ทุกตัว — โปรไฟล์นี้ตั้งใจให้ HR และ AI ค้นเจอ",
    "User-agent: *",
    "Allow: /",
    "",
    "# ระบุ bot ที่เกี่ยวกับการหางาน / AI search ให้ชัดเจน",
  ];
  for (const bot of AI_BOTS) lines.push(`User-agent: ${bot}`, "Allow: /", "");
  lines.push(`Sitemap: ${BASE_URL}/sitemap.xml`, "");
  return lines.join("\n");
}

/* ============================================================
   sitemap.xml — ทั้งสองภาษา พร้อม hreflang ไขว้กัน
   ไม่ใส่ <lastmod> เพราะจะทำให้ build ไม่ deterministic
   ============================================================ */
function buildSitemap() {
  const alt = [
    `    <xhtml:link rel="alternate" hreflang="th" href="${URL_TH}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${URL_EN}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${URL_TH}"/>`,
  ].join("\n");

  const urls = PAGES.map(
    (p) =>
      `  <url>\n    <loc>${p.canonical}</loc>\n${alt}\n    <priority>${
        p.lang === "th" ? "1.0" : "0.9"
      }</priority>\n  </url>`
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

/* ============================================================
   llms.txt — สรุปโปรไฟล์แบบ markdown ล้วน สำหรับ AI ที่อ่าน text
   ============================================================ */
function period(w, lang) {
  const fmt = (d) => {
    if (!d) return lang === "th" ? "ปัจจุบัน" : "Present";
    const [y, m] = d.split("-");
    return `${m}/${y}`;
  };
  return `${fmt(w.startDate)} – ${fmt(w.endDate)}`;
}

function buildLlmsTxt() {
  const p = profile.person;
  const out = [];
  out.push(`# ${p.name.en} (${p.name.th})`);
  out.push("");
  out.push(`> ${L(p.headline, "en")}`);
  out.push("");
  out.push("Personal CV and portfolio. Content is available in Thai at " + URL_TH + " and English at " + URL_EN + ".");
  out.push("");

  out.push("## Currently looking for");
  out.push("");
  out.push(`- Target roles: ${p.jobTitle.en.join(", ")}`);
  out.push(`- Location: ${L(p.workLocation, "en")}`);
  out.push(`- Contact: ${p.email} · ${p.telephone}`);
  out.push(`- Links: ${p.sameAs.join(" · ")}`);
  out.push("");

  out.push("## Summary");
  out.push("");
  out.push(L(p.summary, "en"));
  out.push("");

  out.push("## Skills");
  out.push("");
  for (const s of profile.skills) out.push(`- **${L(s.group, "en")}**: ${s.items.join(", ")}`);
  out.push("");

  out.push("## Work experience");
  out.push("");
  for (const w of profile.work) {
    out.push(`### ${L(w.position, "en")} — ${L(w.company, "en")}`);
    out.push(`${period(w, "en")}`);
    out.push("");
    out.push(L(w.summary, "en"));
    out.push("");
    for (const h of L(w.highlights, "en")) out.push(`- ${h}`);
    out.push("");
    out.push(`Tech: ${w.keywords.join(", ")}`);
    out.push("");
  }

  out.push("## Education");
  out.push("");
  for (const e of profile.education) {
    out.push(
      `- ${L(e.studyType, "en")} in ${L(e.area, "en")}, ${L(e.institution, "en")} (${e.startDate} – ${e.endDate})`
    );
  }
  out.push("");

  out.push("## Certifications");
  out.push("");
  for (const c of profile.certificates) out.push(`- [${L(c.name, "en")}](${c.url}) — ${c.issuer}`);
  out.push("");

  out.push("## ข้อมูลภาษาไทย");
  out.push("");
  out.push(`ชื่อ: ${p.name.th} (${p.alternateName.th})`);
  out.push(`ตำแหน่งที่สนใจ: ${p.jobTitle.th.join(", ")}`);
  out.push(`พื้นที่ทำงาน: ${L(p.workLocation, "th")}`);
  out.push("");
  out.push(L(p.summary, "th"));
  out.push("");
  for (const w of profile.work) {
    out.push(`- ${L(w.position, "th")} — ${L(w.company, "th")} (${period(w, "th")}): ${L(w.summary, "th")}`);
  }
  out.push("");
  return out.join("\n");
}

/* ============================================================
   resume.json — มาตรฐาน JSON Resume (jsonresume.org)
   ATS และเครื่องมือ AI matching หลายตัว parse ไฟล์นี้ได้ตรงๆ
   ============================================================ */
function buildResumeJson(lang) {
  const p = profile.person;
  return JSON.stringify(
    {
      $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
      basics: {
        name: L(p.name, lang),
        label: L(p.jobTitle, lang)[0],
        image: abs(p.image),
        email: p.email,
        phone: p.telephone,
        url: lang === "th" ? URL_TH : URL_EN,
        summary: L(p.summary, lang),
        location: {
          city: L(p.address.locality, lang),
          region: L(p.address.region, lang),
          countryCode: p.address.country,
        },
        profiles: [
          { network: "LinkedIn", url: p.sameAs[0], username: "jaruwat-amnuaysat" },
          { network: "GitHub", url: p.sameAs[1], username: "darkneed02" },
        ],
      },
      work: profile.work.map((w) => ({
        name: L(w.company, lang),
        position: L(w.position, lang),
        startDate: w.startDate,
        ...(w.endDate ? { endDate: w.endDate } : {}),
        summary: L(w.summary, lang),
        highlights: L(w.highlights, lang),
        keywords: w.keywords,
      })),
      education: profile.education.map((e) => ({
        institution: L(e.institution, lang),
        studyType: L(e.studyType, lang),
        area: L(e.area, lang),
        startDate: e.startDate,
        endDate: e.endDate,
      })),
      certificates: profile.certificates.map((c) => ({
        name: L(c.name, lang),
        issuer: c.issuer,
        url: c.url,
      })),
      skills: profile.skills.map((s) => ({ name: L(s.group, lang), keywords: s.items })),
      languages: p.languages.map((l) => ({ language: L(l.name, lang), fluency: L(l.fluency, lang) })),
      meta: {
        canonical: lang === "th" ? URL_TH : URL_EN,
        language: lang,
        note: "generated by build.js — แก้ที่ data/profile.js",
      },
    },
    null,
    2
  ) + "\n";
}

/* ============================================================
   main
   ============================================================ */
function main() {
  const dicts = loadDictionaries();
  const layout = fs.readFileSync(LAYOUT, "utf8");
  /* ต้องแทนบล็อกฟอร์มก่อน applyDict ไม่งั้น data-i18n ข้างในจะไม่ถูกแปล */
  const merged = resolveIncludes(layout).replace("{{CONTACT_FORM}}", buildContactBlock());

  const reports = {};
  for (const page of PAGES) {
    const report = { used: new Set(), missing: [], nested: [], unclosed: [], unsafeAttrTag: [] };

    let html = applyDict(merged, dicts[page.lang], report);
    html = applyDictAttr(html, dicts[page.lang], report);
    html = applyTokens(html, page, dicts[page.lang]);
    html = rewriteAssetPaths(html, page.assetPrefix);

    html = BANNER(page.lang) + html;
    if (!html.endsWith("\n")) html += "\n";

    fs.mkdirSync(path.dirname(page.outFile), { recursive: true });
    fs.writeFileSync(page.outFile, html, "utf8");

    reports[page.lang] = { report, bytes: Buffer.byteLength(html), out: page.outFile };
  }

  /* ---------- ไฟล์สำหรับ crawler / AI / ATS ---------- */
  const extras = [
    ["robots.txt", buildRobots()],
    ["sitemap.xml", buildSitemap()],
    ["llms.txt", buildLlmsTxt()],
    ["resume.json", buildResumeJson("en")],
    ["resume.th.json", buildResumeJson("th")],
  ];
  for (const [name, content] of extras) {
    fs.writeFileSync(path.join(ROOT, name), content, "utf8");
    console.log(`✓ ${name.padEnd(15)} ${String(Buffer.byteLength(content)).padStart(7)} bytes`);
  }

  /* ---------- รายงานผล + ตรวจ key ที่หายไป ---------- */
  let hasProblem = false;

  /* ตรวจว่าไฟล์ Resume PDF ยังตรงกับ data/profile.js อยู่ไหม
     build.js ไม่ได้สร้าง PDF ให้ (ต้องใช้ Chrome) และ GitHub Action ก็รันแค่ build.js
     ถ้าไม่เตือนตรงนี้ การแก้ profile.js แล้ว push จะทำให้ PDF ค้างอยู่เวอร์ชันเก่า
     แบบเงียบๆ ซึ่งคือต้นเหตุของปัญหาเดิมทั้งหมด (ดู docs/ux-seo-plan §15.2) */
  {
    const profileMtime = fs.statSync(path.join(ROOT, "data", "profile.js")).mtimeMs;
    const stale = [];
    for (const page of PAGES) {
      const pdf = path.join(ROOT, page.resumePdf);
      if (!fs.existsSync(pdf)) stale.push(`${page.resumePdf} (ยังไม่มีไฟล์)`);
      else if (fs.statSync(pdf).mtimeMs < profileMtime) stale.push(page.resumePdf);
    }
    if (stale.length) {
      console.warn(
        `\n! Resume PDF เก่ากว่า data/profile.js: ${stale.join(", ")}\n` +
          `  รัน "node tools/make-resume.js" เพื่อสร้างใหม่ ไม่งั้นไฟล์ที่ HR โหลดไปจะไม่ตรงกับเว็บ\n`
      );
    }
  }
  for (const page of PAGES) {
    const { report, bytes, out } = reports[page.lang];
    console.log(
      `✓ ${path.relative(ROOT, out).padEnd(15)} ${String(bytes).padStart(7)} bytes  ` +
        `· ${report.used.size} i18n keys`
    );
    if (report.missing.length) {
      hasProblem = true;
      console.error(
        `  ✗ [${page.lang}] ไม่มีคำแปลของ ${report.missing.length} key: ${[...new Set(report.missing)].join(", ")}`
      );
    }
    if (report.nested.length) {
      console.warn(`  ! [${page.lang}] data-i18n ซ้อนกันที่: ${[...new Set(report.nested)].join(", ")}`);
    }
    if (report.unclosed.length) {
      hasProblem = true;
      console.error(`  ✗ [${page.lang}] หา closing tag ไม่เจอที่: ${report.unclosed.join(", ")}`);
    }
    if (report.unsafeAttrTag.length) {
      hasProblem = true;
      console.error(
        `  ✗ [${page.lang}] ใช้ data-i18n-attr ผิดวิธีที่: ${[...new Set(report.unsafeAttrTag)].join(", ")}`
      );
    }
  }

  /* key ที่มีใน dict แต่ไม่มีใน markup แล้ว (คำแปลตกค้าง)
     ยกเว้น key ที่ถูกใช้ผ่าน token แทน data-i18n */
  const TOKEN_KEYS = ["about.bio.age.suffix"];
  /* คีย์ของบล็อกที่ขึ้นกับ config (ฟอร์มติดต่อ) — ไม่ถูกใช้เมื่อยังไม่ตั้ง key ถือว่าปกติ */
  const CONDITIONAL_PREFIX = ["form.", "contact.cta."];
  const usedTh = reports.th.report.used;
  const orphan = Object.keys(dicts.th).filter(
    (k) => !usedTh.has(k) && !TOKEN_KEYS.includes(k) && !CONDITIONAL_PREFIX.some((p) => k.startsWith(p))
  );
  if (orphan.length) {
    console.warn(`  ! คำแปลที่ไม่มี data-i18n ใช้แล้ว ${orphan.length} key: ${orphan.join(", ")}`);
  }

  /* key ที่ th มี แต่ en ไม่มี */
  const missingEn = Object.keys(dicts.th).filter((k) => !(k in dicts.en));
  if (missingEn.length) {
    console.warn(`  ! key ที่มีใน th แต่ไม่มีใน en ${missingEn.length} key: ${missingEn.join(", ")}`);
  }

  if (hasProblem) {
    console.error("\nbuild เสร็จแต่มีปัญหาข้างบน — ตรวจก่อน commit");
    process.exitCode = 1;
  }
}

main();
