#!/usr/bin/env node
/* ============================================================
   make-case-images.js — สร้างภาพประกอบของ section "ผลงาน"

   ทำไมไม่ใช้ screenshot ของจริงใน assets/images/portfolio/:
     · E-Advce / E-MM / E-PR เป็นหน้าจอระบบภายในของการยางแห่งประเทศไทย
       (ลูกค้าของคลาวด์เมท) มีทั้งโลโก้ ชื่อกองทุน และรหัสหน่วยงาน
     · E-MM มี "ชื่อ-นามสกุลพนักงานจริง" ของบุคคลที่สาม อยู่มุมขวาบน
     · HT เป็น dashboard ที่มีตัวเลขทางธุรกิจของเนเจอร์ไบโอเทค
     · HerbCore CRM เป็นระบบภายในของเซนต์เฮิร์บ มีทั้งข้อมูลลูกค้า
       ยอดขายจริง และ credential ของ WooCommerce/DHL อยู่ในหน้าจอ
   เอาขึ้นเว็บสาธารณะตรงๆ ไม่ได้ ถ้าไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร
   จึงวาดเป็นแผนภาพสถาปัตยกรรมแทน — ปลอดภัยกว่า และสื่อ "ความยาก
   ของงาน" ได้ดีกว่าหน้าจอ CRUD ธรรมดาด้วย

   ใช้งาน (ต้องมี Chrome + puppeteer-core):
     npm i -D puppeteer-core && node tools/make-case-images.js

   ภาพที่ได้ commit ลง repo แล้ว — build ปกติไม่ต้องรันสคริปต์นี้
   ============================================================ */

"use strict";

const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer-core");

const CHROME =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_DIR = path.join(__dirname, "..", "assets", "images", "case");

/* ใช้ศัพท์เทคนิคภาษาอังกฤษล้วน จะได้ใช้ภาพชุดเดียวทั้งสองภาษา */
const CASES = [
  {
    file: "herbcore.jpg",
    tag: "St.Herb · 2026 · in progress ~70%",
    title: "HerbCore CRM — multi-shop → delivery",
    /* รวมเหลือ 5 node: 6 node กับลูกศร 5 อันจะบีบจนคำล้นที่ 1200px */
    flow: ["WooCommerce\n(multi-shop)", "Auto-sync\n(Cron)", "Orders", "Packing", "DHL booking\n+ tracking"],
    back: ["Invoice PDF", "Refund → net revenue", "Email campaign", "Audit log", "Analytics / AI API"],
    facts: ["PHP 8.2", "PostgreSQL", "Docker", "37 screens", "57 migrations"],
    accent: "#A78BFA",
  },
  {
    file: "sap-bank.jpg",
    tag: "Cloudmate · 2024",
    title: "SAP → Bank file pipeline",
    flow: ["SAP", "Generate .txt", "Encrypt\n(bank standard)", "sFTP", "Bank"],
    back: ["Bank result file", "Decrypt", "Post back to SAP"],
    facts: ["Python", "sFTP", "Scheduled batch", "Fewer manual steps"],
    accent: "#60A5FA",
  },
  {
    file: "disbursement.jpg",
    tag: "Cloudmate · 2024",
    title: "Advance & disbursement system",
    flow: ["Request", "Multi-level\napproval", "Disbursement", "Excel export"],
    back: ["Advance record", "Claim without advance", "Full audit trail"],
    facts: ["PHP", "PostgreSQL", "AJAX", "Conditional approval rules"],
    accent: "#34D399",
  },
  {
    file: "procurement.jpg",
    tag: "Cloudmate · 2024",
    title: "Quarterly supply planning",
    flow: ["Quarterly plan", "Purchase request", "Approval", "Status tracking"],
    back: ["Q1–Q4 forecast", "Per-item history", "Excel export"],
    facts: ["PHP", "PostgreSQL", "Bootstrap", "Budget control"],
    accent: "#FBBF24",
  },
  {
    file: "loyalty.jpg",
    tag: "Nature Biotec · 2020–2023",
    title: "Healthy Together loyalty platform",
    flow: ["Register", "Per-product\nQR code", "Collect points", "Redeem reward"],
    back: ["Lucky draw engine", "Back-office management", "Looker Studio dashboard"],
    facts: ["PHP", "MySQL", "Python + Pandas", "Looker Studio"],
    accent: "#F472B6",
  },
];

const html = (c) => `
<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:660px;font-family:'Prompt',sans-serif;
       background:linear-gradient(140deg,#0F1A30 0%,#1B2B4B 60%,#1E2D4A 100%);
       color:#F8FAFC;position:relative;overflow:hidden;
       display:flex;flex-direction:column;justify-content:center;padding:64px 68px}
  .grid{position:absolute;inset:0;opacity:.5;
        background-image:linear-gradient(rgba(59,130,246,.07) 1px,transparent 1px),
                         linear-gradient(90deg,rgba(59,130,246,.07) 1px,transparent 1px);
        background-size:44px 44px}
  .glow{position:absolute;width:560px;height:560px;right:-180px;bottom:-220px;border-radius:50%;
        background:radial-gradient(circle,${c.accent}33 0%,transparent 66%)}
  .inner{position:relative}
  .tag{display:inline-block;font-size:15px;font-weight:500;letter-spacing:.6px;
       color:${c.accent};background:${c.accent}1F;border:1px solid ${c.accent}4D;
       padding:7px 18px;border-radius:100px;margin-bottom:22px}
  h1{font-size:44px;font-weight:700;letter-spacing:-.8px;margin-bottom:44px;line-height:1.2}
  .flow{display:flex;align-items:stretch;gap:0;margin-bottom:34px;flex-wrap:nowrap}
  .step{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);
        border-radius:14px;padding:20px 12px;text-align:center;font-size:17px;font-weight:500;
        white-space:pre-line;display:flex;align-items:center;justify-content:center;line-height:1.35;
        min-height:92px}
  .step.first{border-color:${c.accent}66;background:${c.accent}1A}
  .step.last{border-color:${c.accent}66;background:${c.accent}1A}
  .arrow{display:flex;align-items:center;color:${c.accent};font-size:24px;padding:0 12px;flex:none}
  .back{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:38px}
  .back span{font-size:16px;font-weight:300;color:#CBD5E1;background:rgba(255,255,255,.05);
             border:1px dashed rgba(255,255,255,.20);border-radius:10px;padding:10px 18px}
  .facts{display:flex;gap:10px;flex-wrap:wrap;border-top:1px solid rgba(255,255,255,.12);padding-top:26px}
  .facts span{font-size:16px;font-weight:500;color:#E2E8F0;background:rgba(255,255,255,.08);
              border-radius:8px;padding:9px 18px}
</style></head>
<body>
  <div class="grid"></div><div class="glow"></div>
  <div class="inner">
    <div class="tag">${c.tag}</div>
    <h1>${c.title}</h1>
    <div class="flow">
      ${c.flow
        .map(
          (s, i) =>
            `<div class="step ${i === 0 ? "first" : ""} ${i === c.flow.length - 1 ? "last" : ""}">${s}</div>` +
            (i < c.flow.length - 1 ? `<div class="arrow">→</div>` : "")
        )
        .join("")}
    </div>
    <div class="back">${c.back.map((b) => `<span>${b}</span>`).join("")}</div>
    <div class="facts">${c.facts.map((f) => `<span>${f}</span>`).join("")}</div>
  </div>
</body></html>`;

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox"],
  });
  for (const c of CASES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 660, deviceScaleFactor: 1 });
    await page.setContent(html(c), { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 400));
    const out = path.join(OUT_DIR, c.file);
    await page.screenshot({ path: out, type: "jpeg", quality: 86 });
    console.log("wrote", path.relative(path.join(__dirname, ".."), out), fs.statSync(out).size, "bytes");
    await page.close();
  }
  await browser.close();
})();
