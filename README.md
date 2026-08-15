# profile-cv

เว็บ CV / Portfolio ของจารุวัฒน์ อำนวยสัตย์ — deploy ผ่าน GitHub Pages ที่ https://darkneed02.github.io/

## โครงสร้าง

```
component/
  layout.html          โครงหน้า (head / meta / script / ตำแหน่ง include)
  header/ body/ footer/   เนื้อหาแต่ละ section
assets/js/i18n.js      ข้อความบนหน้าเว็บ ไทย/อังกฤษ (ใช้ตอน build เท่านั้น)
data/profile.js        ข้อมูลโครงสร้าง (ประวัติงาน การศึกษา ใบรับรอง ทักษะ)
tools/                 สคริปต์สร้างภาพ (รันเมื่อต้องการเท่านั้น ภาพ commit ไว้แล้ว)
build.js               ต่อทุกอย่างเป็น static HTML + ไฟล์ SEO
        │
        ▼
index.html             หน้าไทย      ← generated
en/index.html          หน้าอังกฤษ   ← generated
robots.txt             อนุญาต bot สายหางาน/AI ทุกตัว + ชี้ sitemap
sitemap.xml            สองภาษา พร้อม hreflang ไขว้กัน
llms.txt               สรุปโปรไฟล์แบบ markdown สำหรับ AI
resume.json            มาตรฐาน JSON Resume (อังกฤษ) — ATS / AI matching parse ได้
resume.th.json         JSON Resume ฉบับภาษาไทย
```

**ไฟล์ที่ generate ทั้งหมดห้ามแก้ตรงๆ** — จะหายตอน build ครั้งถัดไป (ทั้ง HTML มี comment กำกับบรรทัดแรกไว้แล้ว)

## แก้อะไร ที่ไหน

| อยากแก้ | แก้ที่ |
|---|---|
| ข้อความบนหน้าเว็บ | `assets/js/i18n.js` |
| โครงสร้าง/เลย์เอาต์ของ section | `component/**` |
| ประวัติงาน การศึกษา ใบรับรอง ทักษะ (ที่ไปโผล่ใน JSON-LD / resume.json / llms.txt) | `data/profile.js` |
| โดเมน, `<title>`, description, OG | `build.js` (`BASE_URL` และ `PAGES[]`) |
| เปิดฟอร์มติดต่อ | `build.js` → `CONTACT_FORM_KEY` (ดูหัวข้อล่าง) |
| สไตล์ | `assets/css/custome.css` เท่านั้น |

แล้วรัน:

```bash
node build.js
```

ต้อง commit ทั้ง source และ output เพราะ GitHub Pages ไม่ build ให้
(ถ้า push เข้า `main` มี GitHub Action `.github/workflows/build.yml` build + commit ให้อัตโนมัติ)

## ระบบแปลภาษา

- แปลเนื้อหา: `data-i18n="key"` บน element — build จะแทนเนื้อในด้วยค่าจาก dict
- แปล attribute: `data-i18n-attr="alt:key.one;title:key.two"`
  ใช้ได้เฉพาะ tag ที่ไม่มีเนื้อหาจาก dict อยู่ข้างใน (`img`, `a`, `input`, `iframe`, `source`, `meta`, `area`, `link`) — build จะ exit 1 ถ้าใช้ผิด tag
- ค่าที่ต่างกันตามหน้า: token `{{ALT_URL}}`, `{{CANONICAL}}`, `{{JSON_LD}}` ฯลฯ — ดูรายการใน `applyTokens()`

`build.js` จะ **exit 1** ถ้าคำแปล key ไหนหาย หรือหา closing tag ไม่เจอ และเตือนถ้ามีคำแปลตกค้างที่ไม่มีใครใช้แล้ว

## ฟอร์มติดต่อ

GitHub Pages รัน PHP ไม่ได้ (`assets/mailer.php` ที่ติดมากับธีมใช้ไม่ได้ทั้งสองเส้นทาง deploy)
จึงต้องใช้ endpoint ภายนอก

1. ขอ access key ฟรีที่ https://web3forms.com (กรอกอีเมล เขาส่ง key มาให้)
2. วางใน `build.js` → `const CONTACT_FORM_KEY = "..."`
3. `node build.js`

ถ้าเว้นว่างไว้ หน้าเว็บจะแสดงปุ่ม "ส่งอีเมลถึงผม" แทน — ตั้งใจให้เป็นแบบนี้
จะได้ไม่มีฟอร์มที่กดส่งแล้วเงียบหาย

## ภาพประกอบ section ผลงาน

`assets/images/case/*.jpg` สร้างจาก `tools/make-case-images.js` (ต้องมี Chrome + puppeteer-core)
ภาพ commit ไว้แล้ว build ปกติไม่ต้องรัน

> **ไม่ได้ใช้ screenshot จริงใน `assets/images/portfolio/`** เพราะทุกชิ้นเป็นหน้าจอระบบภายใน
> (ทั้งของลูกค้าและขององค์กรเอง) มีชื่อพนักงานจริงของบุคคลที่สามอยู่ในภาพหนึ่ง และมี credential
> กับข้อมูลลูกค้าในอีกระบบ — รายละเอียดอยู่ในหัวไฟล์ `tools/make-case-images.js`

## ทำไมต้อง build เป็น static

crawler ที่ไม่รัน JavaScript — GPTBot / OAI-SearchBot (ChatGPT), ClaudeBot, PerplexityBot,
ATS ของ HR, LINE / Facebook / LinkedIn link preview — มองไม่เห็นเนื้อหาที่ฉีดด้วย `fetch().innerHTML`
ตอนนี้ทุกอย่างอยู่ใน HTML ดิบแล้ว

## รันดูในเครื่อง

```bash
python3 -m http.server 8099        # แล้วเปิด http://127.0.0.1:8099/
# หรือ
docker compose up -d               # http://localhost:8080/
```

## แผนงาน

`docs/ux-seo-plan-2026-08-15.md`
