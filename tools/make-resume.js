#!/usr/bin/env node
/* ============================================================
   make-resume.js — สร้างไฟล์ Resume PDF จาก data/profile.js

   ทำไมต้องมีสคริปต์นี้:
     ไฟล์ assets/pdf/resume.pdf เดิมถูกทำด้วยมือเมื่อ ม.ค. 2568
     แล้วไม่เคยอัปเดตอีกเลย ผลคือ (ดู docs/ux-seo-plan §15.2):
       · งานล่าสุดในไฟล์คือ พ.ย. 2567 — เซนต์เฮิร์บไม่มีอยู่เลย
         HR ที่โหลดไปอ่านจะเห็นเป็นช่องว่างการทำงาน ~21 เดือน
       · ไม่มีคำว่า Laravel ทั้งที่เว็บพาดหัวด้วย PHP/Laravel
       · ยังมีเกรดเฉลี่ย ศาสนา น้ำหนัก ส่วนสูง วันเกิด สถานภาพสมรส
         ซึ่งเฟส 0 ตัดออกจากเว็บไปแล้ว
       · หน้า /en/ ก็แจกไฟล์ภาษาไทยใบเดียวกันนี้

     สคริปต์นี้ generate PDF จาก data/profile.js ซึ่งเป็นแหล่งความจริง
     เดียวกับที่เว็บ, JSON-LD, llms.txt และ resume.json ใช้
     → แก้ข้อมูลที่เดียว แล้วทุกอย่างตรงกันตลอดไป ไม่หลุดจากกันอีก

   กติกาเนื้อหา (สืบทอดจาก data/profile.js):
     ใส่ได้เฉพาะสิ่งที่อยู่ใน profile.js เท่านั้น
     ห้ามเติมตัวเลขหรือข้อความที่ยืนยันจากเว็บไม่ได้

   ออกแบบให้ ATS อ่านออก:
     · คอลัมน์เดียวตลอด — layout หลายคอลัมน์ทำให้ลำดับข้อความที่
       ดูดออกมาสลับกันมั่ว
     · ตัวอักษรจริงทั้งหมด ไม่มีข้อความที่เป็นรูป ไม่มี icon font
       (icon font ดูดออกมาเป็นตัวอักษรขยะ)
     · หัวข้อ section เป็นคำมาตรฐานที่ parser รู้จัก
     · ฝังฟอนต์ไทยไว้ในไฟล์ PDF เพื่อให้สระ/วรรณยุกต์ไม่เพี้ยน
       บนเครื่องที่ไม่มีฟอนต์ Prompt

   ใช้งาน (ต้องมี Google Chrome + ต่อเน็ตครั้งแรกเพื่อดึงฟอนต์):
     node tools/make-resume.js

   ได้ออกมา 2 ไฟล์:
     assets/pdf/resume.pdf      — ฉบับภาษาไทย (ทับไฟล์เดิมโดยตั้งใจ
                                  เพื่อไม่ให้ลิงก์เก่าที่เคยแชร์ไป
                                  ยังเสิร์ฟไฟล์ที่ล้าสมัยอยู่)
     assets/pdf/resume-en.pdf   — ฉบับภาษาอังกฤษ

   ไฟล์ที่ได้ commit ลง repo — build ปกติ (node build.js) ไม่ต้องรันสคริปต์นี้
   รันใหม่เมื่อแก้ data/profile.js เท่านั้น
   ============================================================ */

"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const profile = require(path.join(ROOT, "data", "profile.js"));

const SITE_URL = profile.site.baseUrl;

/* "+66646613238" → "064-661-3238"
   เก็บใน profile.js เป็นรูปแบบสากล (E.164) เพราะ JSON-LD/schema.org ต้องการแบบนั้น
   แต่บนเรซูเม่แสดงเป็นรูปแบบที่คนไทยอ่านและกดโทรออกได้ทันที */
function displayPhone(e164) {
  const digits = String(e164).replace(/\D/g, "").replace(/^66/, "0");
  return digits.length === 10 ? `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}` : e164;
}

/* ---------- หา Chrome ---------- */
const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
  process.env.CHROME_PATH,
].filter(Boolean);

function findChrome() {
  for (const c of CHROME_CANDIDATES) if (fs.existsSync(c)) return c;
  throw new Error(
    "ไม่พบ Google Chrome — ติดตั้ง Chrome หรือกำหนด CHROME_PATH=/path/to/chrome"
  );
}

/* ---------- helper ภาษา ---------- */
const L = (v, lang) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] : v);

const TH_MONTHS = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* "2025-04" → "เม.ย. 2568" / "Apr 2025"  (ไทยใช้ พ.ศ. ให้ตรงกับหน้าเว็บ) */
function fmtDate(iso, lang) {
  if (!iso) return lang === "th" ? "ปัจจุบัน" : "Present";
  const [y, m] = iso.split("-").map(Number);
  return lang === "th"
    ? `${TH_MONTHS[m - 1]} ${y + 543}`
    : `${EN_MONTHS[m - 1]} ${y}`;
}

const period = (job, lang) => `${fmtDate(job.startDate, lang)} – ${fmtDate(job.endDate, lang)}`;

/* ระยะเวลาทำงาน เช่น "1 ปี 5 เดือน" — นับจากวันที่ใน profile.js */
function duration(job, lang) {
  const [sy, sm] = job.startDate.split("-").map(Number);
  const end = job.endDate ? job.endDate.split("-").map(Number) : null;
  const now = new Date();
  const [ey, em] = end || [now.getFullYear(), now.getMonth() + 1];
  let months = (ey - sy) * 12 + (em - sm) + 1;
  const y = Math.floor(months / 12);
  const mo = months % 12;
  if (lang === "th") {
    return [y ? `${y} ปี` : null, mo ? `${mo} เดือน` : null].filter(Boolean).join(" ");
  }
  return [y ? `${y} yr${y > 1 ? "s" : ""}` : null, mo ? `${mo} mo` : null].filter(Boolean).join(" ");
}

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/* ---------- ฟอนต์: ดึง Prompt จาก Google แล้วฝังเป็น base64 ----------
   ฝังแทนการลิงก์ เพราะ (1) PDF ต้องมีฟอนต์อยู่ในไฟล์ ไม่งั้นสระ/วรรณยุกต์
   ไทยจะเพี้ยนบนเครื่องที่ไม่มี Prompt (2) ผลลัพธ์เหมือนเดิมทุกครั้งที่รัน */
const FONT_CACHE = path.join(__dirname, ".font-cache");

async function fetchPromptFont() {
  fs.mkdirSync(FONT_CACHE, { recursive: true });
  const cached = path.join(FONT_CACHE, "prompt.json");
  if (fs.existsSync(cached)) {
    console.log("· ใช้ฟอนต์จาก cache (tools/.font-cache)");
    return JSON.parse(fs.readFileSync(cached, "utf8"));
  }

  console.log("· ดึงฟอนต์ Prompt จาก Google Fonts …");
  const cssUrl =
    "https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700&display=swap";
  // UA ของเบราว์เซอร์ เพื่อให้ Google ส่ง woff2 กลับมา (ไม่งั้นได้ ttf ที่ใหญ่กว่ามาก)
  const UA =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

  const css = await (await fetch(cssUrl, { headers: { "User-Agent": UA } })).text();

  /* ดึงเฉพาะ subset thai + latin — ตัด vietnamese/cyrillic ที่ไม่ได้ใช้ทิ้ง
     เพื่อไม่ให้ไฟล์ PDF ใหญ่เกินจำเป็น

     ระวัง: Google เขียนชื่อ subset เป็นคอมเมนต์ *ก่อน* บล็อก @font-face
       /* thai *​/
       @font-face { ... }
     ถ้า split ด้วย "@font-face" คอมเมนต์จะไปติดท้ายบล็อกก่อนหน้า
     ทำให้จับคู่ subset ผิดไปหนึ่งตำแหน่ง (เคยพลาดมาแล้ว — ผลคือไม่ได้
     ฟอนต์ไทยเลย แล้วตัวอักษรไทยใน PDF ไปตกเป็นฟอนต์ Thonburi ของ macOS
     ซึ่งแปลว่าผลลัพธ์ขึ้นกับเครื่องที่รัน) จึงต้อง match คอมเมนต์
     คู่กับบล็อกที่ตามมาในนัดเดียว */
  const WANT = ["thai", "latin", "latin-ext"];
  const faces = [];
  const re = /\/\*\s*([a-z-]+)\s*\*\/\s*@font-face\s*\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(css))) {
    const [, subset, body] = m;
    if (!WANT.includes(subset)) continue;
    const url = (body.match(/url\((https:[^)]+\.woff2)\)/) || [])[1];
    const weight = (body.match(/font-weight:\s*(\d+)/) || [])[1] || "400";
    const range = (body.match(/unicode-range:\s*([^;]+);/) || [])[1] || "";
    if (!url) continue;
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    faces.push({ subset, weight, range, b64: buf.toString("base64") });
  }

  /* ตรวจว่าได้ฟอนต์ไทยครบทุกน้ำหนักจริง ไม่งั้น PDF ภาษาไทยจะเพี้ยน
     แบบเงียบๆ โดยไม่มี error ให้เห็น */
  const thai = faces.filter((f) => f.subset === "thai").map((f) => f.weight);
  const missing = ["400", "500", "600", "700"].filter((w) => !thai.includes(w));
  if (missing.length) {
    throw new Error(
      `ไม่ได้ฟอนต์ไทยครบ — ขาดน้ำหนัก ${missing.join(", ")} ` +
        `(ได้มา ${faces.length} face: ${[...new Set(faces.map((f) => f.subset))].join(", ")})`
    );
  }

  fs.writeFileSync(cached, JSON.stringify(faces), "utf8");
  console.log(`  ได้ ${faces.length} font-face (thai + latin)`);
  return faces;
}

const fontFaceCss = (faces) =>
  faces
    .map(
      (f) => `@font-face{font-family:'Prompt';font-style:normal;font-weight:${f.weight};
font-display:block;src:url(data:font/woff2;base64,${f.b64}) format('woff2');
unicode-range:${f.range};}`
    )
    .join("\n");

/* ---------- ข้อความประจำภาษา ---------- */
const T = {
  th: {
    summary: "สรุปโดยย่อ",
    skills: "ทักษะ",
    work: "ประสบการณ์การทำงาน",
    edu: "การศึกษา",
    certs: "ใบรับรอง",
    langs: "ภาษา",
    website: "เว็บไซต์",
    verify: "ตรวจสอบใบรับรองได้ที่เว็บไซต์",
    present: "ปัจจุบัน",
  },
  en: {
    summary: "Summary",
    skills: "Skills",
    work: "Work Experience",
    edu: "Education",
    certs: "Certifications",
    langs: "Languages",
    website: "Website",
    verify: "All certificates are verifiable via the website",
    present: "Present",
  },
};

/* ---------- สร้าง HTML ---------- */
function buildHtml(lang, faces) {
  const p = profile.person;
  const t = T[lang];
  const name = L(p.name, lang);
  const title = L(p.jobTitle, lang)[0];
  const loc = `${L(p.address.locality, lang)}, ${L(p.address.region, lang)}`;
  const siteUrl = lang === "th" ? SITE_URL + "/" : SITE_URL + "/en/";

  /* แถวติดต่อ — ตัวอักษรจริงล้วน คั่นด้วย · ให้ ATS ตัดคำได้ */
  const contact = [
    p.email,
    displayPhone(p.telephone),
    loc,
    L(p.workLocation, lang).split("·").pop().trim(),
  ];

  const links = [
    { label: t.website, url: siteUrl },
    { label: "LinkedIn", url: p.sameAs[0] },
    { label: "GitHub", url: p.sameAs[1] },
  ];

  const skillRows = profile.skills
    .map(
      (s) => `<div class="srow">
        <div class="sk">${esc(L(s.group, lang))}</div>
        <div class="sv">${esc(s.items.join(" · "))}</div>
      </div>`
    )
    .join("");

  const jobs = profile.work
    .map((job) => {
      const hs = L(job.highlights, lang)
        .map((h) => `<li>${esc(h)}</li>`)
        .join("");
      return `<article class="entry">
        <div class="ehead">
          <div>
            <div class="epos">${esc(L(job.position, lang))}</div>
            <div class="eorg">${esc(L(job.company, lang))}</div>
          </div>
          <div class="emeta">
            <div class="eperiod">${esc(period(job, lang))}</div>
            <div class="edur">${esc(duration(job, lang))}</div>
          </div>
        </div>
        <p class="esum">${esc(L(job.summary, lang))}</p>
        <ul class="ehl">${hs}</ul>
        <div class="ekw">${esc(job.keywords.join(" · "))}</div>
      </article>`;
    })
    .join("");

  const edu = profile.education
    .map(
      (e) => `<article class="entry">
      <div class="ehead">
        <div>
          <div class="epos">${esc(L(e.studyType, lang))} — ${esc(L(e.area, lang))}</div>
          <div class="eorg">${esc(L(e.institution, lang))}</div>
        </div>
        <div class="emeta">
          <div class="eperiod">${esc(fmtDate(e.startDate, lang))} – ${esc(fmtDate(e.endDate, lang))}</div>
        </div>
      </div>
    </article>`
    )
    .join("");

  /* ใบรับรอง: จัดกลุ่มตามผู้ออก ให้อ่านสั้นและไม่กินพื้นที่ */
  const byIssuer = {};
  for (const c of profile.certificates) {
    (byIssuer[c.issuer] = byIssuer[c.issuer] || []).push(L(c.name, lang));
  }
  const certs = Object.entries(byIssuer)
    .map(
      ([issuer, names]) => `<div class="srow">
        <div class="sk">${esc(issuer)}</div>
        <div class="sv">${names.map(esc).join(" · ")}</div>
      </div>`
    )
    .join("");

  const langs = profile.person.languages
    .map((l) => `${L(l.name, lang)} (${L(l.fluency, lang)})`)
    .join(" · ");

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8" />
<title>${esc(name)} — ${esc(title)}</title>
<style>
${fontFaceCss(faces)}

@page { size: A4; margin: 13mm 14mm 12mm; }

* { box-sizing: border-box; margin: 0; padding: 0; }

html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

body {
  font-family: 'Prompt', sans-serif;
  font-size: 9.6pt;
  line-height: 1.5;
  color: #1E293B;
}

/* ---------- หัวกระดาษ ---------- */
.name    { font-size: 20pt; font-weight: 700; letter-spacing: -.2px; line-height: 1.15; }
.title   { font-size: 11.5pt; font-weight: 600; color: #2563EB; margin-top: 1px; }
.contact { font-size: 8.8pt; color: #334155; margin-top: 6px; }
.links   { font-size: 8.8pt; margin-top: 2px; }
.links a { color: #2563EB; text-decoration: none; }

header { border-bottom: 1.6pt solid #1B2B4B; padding-bottom: 8px; margin-bottom: 11px; }

/* ---------- section ---------- */
section { margin-bottom: 11px; }

h2 {
  font-size: 9.4pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .8px;
  color: #1B2B4B;
  border-bottom: .8pt solid #CBD5E1;
  padding-bottom: 2.5px;
  margin-bottom: 7px;
}

.lead { font-size: 9.6pt; color: #334155; }

/* ---------- แถวคีย์–ค่า (ทักษะ / ใบรับรอง) ----------
   ใช้ table layout แทน grid: ATS ดูดข้อความจาก table ได้ตามลำดับ
   ส่วน CSS grid บาง parser อ่านสลับคอลัมน์ */
.srow { display: table; width: 100%; margin-bottom: 3.5px; }
.sk {
  /* 40mm — พอดีกับหัวข้อกลุ่มที่ยาวที่สุดทั้งสองภาษา
     ("เชื่อมต่อระบบและ Automation" / "Integration & Automation")
     ถ้าแคบกว่านี้หัวข้อจะตัดบรรทัดแล้วอ่านสะดุด */
  display: table-cell; width: 40mm; vertical-align: top;
  font-weight: 600; color: #1B2B4B; padding-right: 5px;
}
.sv { display: table-cell; vertical-align: top; color: #334155; }

/* ---------- รายการประสบการณ์ ---------- */
.entry { margin-bottom: 9px; break-inside: avoid; page-break-inside: avoid; }
.entry:last-child { margin-bottom: 0; }

.ehead { display: table; width: 100%; margin-bottom: 2.5px; }
.ehead > div { display: table-cell; vertical-align: top; }
.emeta { text-align: right; white-space: nowrap; width: 42mm; }

.epos    { font-size: 10.6pt; font-weight: 600; line-height: 1.3; }
.eorg    { font-size: 9.4pt; color: #475569; }
.eperiod { font-size: 8.8pt; font-weight: 500; color: #1B2B4B; }
.edur    { font-size: 8.4pt; color: #64748B; }

.esum { color: #334155; margin-bottom: 3px; }

.ehl { margin: 0 0 3px 14px; }
.ehl li { margin-bottom: 1.5px; color: #334155; }

.ekw { font-size: 8.6pt; color: #5A6880; }

.foot { font-size: 8.4pt; color: #64748B; margin-top: 3px; }
</style>
</head>
<body>

<header>
  <div class="name">${esc(name)}</div>
  <div class="title">${esc(title)}</div>
  <div class="contact">${contact.map(esc).join("  ·  ")}</div>
  <div class="links">${links
    .map((l) => `${esc(l.label)}: <a href="${esc(l.url)}">${esc(l.url)}</a>`)
    .join("  ·  ")}</div>
</header>

<section>
  <h2>${esc(t.summary)}</h2>
  <p class="lead">${esc(L(p.summary, lang))}</p>
</section>

<section>
  <h2>${esc(t.skills)}</h2>
  ${skillRows}
</section>

<section>
  <h2>${esc(t.work)}</h2>
  ${jobs}
</section>

<section>
  <h2>${esc(t.edu)}</h2>
  ${edu}
</section>

<section>
  <h2>${esc(t.certs)}</h2>
  ${certs}
  <div class="foot">${esc(t.verify)}: ${esc(siteUrl)}</div>
</section>

<section>
  <h2>${esc(t.langs)}</h2>
  <p class="lead">${esc(langs)}</p>
</section>

</body>
</html>`;
}

/* ---------- render HTML → PDF ด้วย Chrome ---------- */
function renderPdf(chrome, htmlFile, outFile) {
  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), "resume-chrome-"));
  if (fs.existsSync(outFile)) fs.rmSync(outFile);
  try {
    execFileSync(
      chrome,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-extensions",
        "--disable-background-networking",
        "--disable-sync",
        `--user-data-dir=${profileDir}`,
        "--no-pdf-header-footer",
        // ฟอนต์ฝังเป็น base64 อยู่ในไฟล์แล้ว แต่เผื่อเวลา layout/paint ให้เสร็จก่อนพิมพ์
        "--virtual-time-budget=8000",
        `--print-to-pdf=${outFile}`,
        "file://" + htmlFile,
      ],
      { stdio: "pipe", timeout: 90000 }
    );
  } catch (err) {
    /* Chrome headless บน macOS มักจบด้วย exit code ที่ไม่ใช่ 0 และพ่น
       "Trying to load the allocator multiple times" ออกมา ทั้งที่เขียนไฟล์
       สำเร็จแล้ว จึงตัดสินผลจาก "ไฟล์ที่ได้" ไม่ใช่จาก exit code */
    if (!fs.existsSync(outFile)) {
      const stderr = err.stderr ? err.stderr.toString() : String(err.message || err);
      throw new Error(`Chrome สร้าง PDF ไม่สำเร็จ:\n${stderr.slice(0, 600)}`);
    }
  } finally {
    fs.rmSync(profileDir, { recursive: true, force: true });
  }

  /* ตรวจว่าเป็น PDF จริง ไม่ใช่ไฟล์ที่เขียนค้างครึ่งทาง */
  const head = Buffer.alloc(5);
  const fd = fs.openSync(outFile, "r");
  fs.readSync(fd, head, 0, 5, 0);
  fs.closeSync(fd);
  if (head.toString() !== "%PDF-") throw new Error(`${outFile} ไม่ใช่ไฟล์ PDF ที่สมบูรณ์`);
}

/* ---------- main ---------- */
(async function main() {
  const chrome = findChrome();
  console.log(`· Chrome: ${chrome}`);

  const faces = await fetchPromptFont();

  const outDir = path.join(ROOT, "assets", "pdf");
  fs.mkdirSync(outDir, { recursive: true });

  const targets = [
    { lang: "th", out: path.join(outDir, "resume.pdf") },
    { lang: "en", out: path.join(outDir, "resume-en.pdf") },
  ];

  for (const target of targets) {
    const html = buildHtml(target.lang, faces);
    const htmlFile = path.join(os.tmpdir(), `resume-${target.lang}.html`);
    fs.writeFileSync(htmlFile, html, "utf8");
    renderPdf(chrome, htmlFile, target.out);
    const kb = (fs.statSync(target.out).size / 1024).toFixed(0);
    console.log(`✓ ${path.relative(ROOT, target.out).padEnd(24)} ${kb} KB`);
  }

  console.log("\nตรวจผลด้วย:");
  console.log("  pdffonts assets/pdf/resume.pdf     # ฟอนต์ไทยต้องขึ้น emb=yes");
  console.log("  pdftotext assets/pdf/resume.pdf -  # ต้องมีเซนต์เฮิร์บ / Laravel / 2568");
})();
