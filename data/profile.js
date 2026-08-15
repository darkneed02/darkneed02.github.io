/* ============================================================
   profile.js — ข้อมูลโครงสร้างของโปรไฟล์ (แหล่งความจริงแหล่งเดียว)

   build.js อ่านไฟล์นี้ไปสร้าง:
     · JSON-LD (ProfilePage + Person) ในทั้งสองหน้า
     · sitemap.xml
     · llms.txt      — สรุปสำหรับ AI ที่อ่าน text
     · resume.json   — มาตรฐาน JSON Resume ที่ ATS / AI matching parse ได้

   แก้ข้อมูลตัวตน/ประวัติที่นี่ที่เดียว แล้วรัน: node build.js
   (ส่วนข้อความบนหน้าเว็บอยู่ที่ component/** และ assets/js/i18n.js)

   กติกา: ห้ามใส่ตัวเลขที่ยืนยันไม่ได้ ทุกค่าต้องอ้างอิงจากเรซูเม่
   หรือเนื้อหาที่แสดงบนหน้าเว็บจริง
   ============================================================ */

"use strict";

const person = {
  name: { th: "จารุวัฒน์ อำนวยสัตย์", en: "Jaruwat Amnuaysat" },
  alternateName: { th: "ฟิล์ม", en: "Film" },
  givenName: "Jaruwat",
  familyName: "Amnuaysat",
  jobTitle: {
    th: ["Full Stack Developer", "Programmer", "Web Developer"],
    en: ["Full Stack Developer", "Programmer", "Web Developer"],
  },
  headline: {
    th: "Full Stack Developer (PHP/Laravel) — ระบบหลังบ้านองค์กร เชื่อมต่อ SAP และระบบธนาคาร",
    en: "Full Stack Developer (PHP/Laravel) — enterprise back-office systems, SAP and banking integration",
  },
  summary: {
    th: "Full Stack Developer ประสบการณ์ 6 ปี ทำงานหลักด้วย PHP/Laravel และ SQL ถนัดระบบหลังบ้านขององค์กร ตั้งแต่ระบบเบิกจ่าย ระบบสมาชิก ไปจนถึงการเชื่อมข้อมูลกับ SAP และการส่งไฟล์เข้ารหัสตามมาตรฐานธนาคาร",
    en: "Full Stack Developer with 6 years of experience, working mainly with PHP/Laravel and SQL. Specialises in enterprise back-office systems — disbursement and membership platforms, SAP data integration, and encrypted file transfers built to banking standards.",
  },
  email: "overlag02@gmail.com",
  telephone: "+66646613238",
  /* ระดับจังหวัดเท่านั้น — ไม่ใส่บ้านเลขที่ */
  address: {
    locality: { th: "อำเภอเมืองปทุมธานี", en: "Mueang Pathum Thani" },
    region: { th: "ปทุมธานี", en: "Pathum Thani" },
    country: "TH",
  },
  workLocation: {
    th: "ปทุมธานี · กรุงเทพฯ และปริมณฑล · Remote",
    en: "Pathum Thani · Bangkok metropolitan area · Remote",
  },
  image: "assets/images/brand/PICT0053.jpg",
  sameAs: [
    "https://www.linkedin.com/in/jaruwat-amnuaysat-509244207/",
    "https://github.com/darkneed02",
    "https://www.facebook.com/jaruwat.amnuaysat",
  ],
  knowsAbout: [
    "PHP",
    "Laravel",
    "REST API",
    "PostgreSQL",
    "MySQL",
    "Microsoft SQL Server",
    "JavaScript",
    "AJAX",
    "HTML",
    "CSS",
    "Bootstrap",
    "Python",
    "Pandas",
    "WordPress",
    "Git",
    "SAP data integration",
    "sFTP file encryption",
    "Workflow automation",
    "Docker",
    "WooCommerce REST API",
    "DHL Express API",
    "CRM development",
    "Looker Studio",
    "Windows Server",
    "Web application development",
    "Database design",
  ],
  languages: [
    { name: { th: "ไทย", en: "Thai" }, fluency: { th: "ภาษาแม่", en: "Native speaker" } },
    { name: { th: "อังกฤษ", en: "English" }, fluency: { th: "ระดับใช้งานได้", en: "Working proficiency" } },
  ],
};

/* เรียงจากใหม่ไปเก่า — ตรงกับลำดับบนหน้าเว็บ */
const work = [
  {
    company: { th: "บริษัท เซนต์เฮิร์บ คอสเมติกส์ อินเตอร์เนชั่นแนล จำกัด", en: "ST. Herb Cosmetics International Co., Ltd." },
    position: { th: "WebMaster", en: "WebMaster" },
    startDate: "2025-04",
    endDate: null,
    summary: {
      th: "ดูแลความเสถียรและความปลอดภัยของเว็บไซต์ ติดตาม Traffic ปรับ SEO และ UI/UX จัดทำระบบ Backup พร้อมประสานงานและเฝ้าระวัง Server และพัฒนาระบบ HerbCore CRM หลังบ้านเองทั้งระบบด้วย PHP 8.2 + PostgreSQL บน Docker เพื่อรวมออเดอร์จากร้าน WooCommerce หลายร้าน ต่อคิวแพ็กสินค้า และจองขนส่งผ่าน DHL Express API",
      en: "Maintained website stability and security, tracked traffic, improved SEO and UX, built the backup process, and coordinated server monitoring. Also building HerbCore CRM in-house — PHP 8.2 and PostgreSQL on Docker — consolidating orders from multiple WooCommerce shops into one packing queue with DHL Express API shipping.",
    },
    highlights: {
      th: [
        "ดูแลและพัฒนาเว็บไซต์",
        "ดูแลและประสานงาน Server",
        "พัฒนาระบบ HerbCore CRM รวมออเดอร์หลายร้าน (37 หน้าจอ · 35 controller · API 13 กลุ่มงาน · 57 migration · งานตั้งเวลา 4 ตัว) — อยู่ระหว่างพัฒนา เสร็จแล้วประมาณ 70%",
      ],
      en: [
        "Website maintenance and development",
        "Server maintenance and coordination",
        "HerbCore CRM — multi-shop order consolidation (37 screens · 35 controllers · 13 API groups · 57 migrations · 4 scheduled jobs), in development, roughly 70% complete",
      ],
    },
    keywords: [
      "PHP 8.2",
      "PostgreSQL",
      "Docker",
      "WooCommerce REST API",
      "DHL Express API",
      "Cron",
      "WordPress",
      "SEO",
      "Server",
    ],
  },
  {
    company: { th: "บริษัท คลาวด์เมท จำกัด", en: "Cloudmate Co., Ltd." },
    position: { th: "Programmer", en: "Programmer" },
    startDate: "2024-01",
    endDate: "2024-11",
    summary: {
      th: "พัฒนา 6 ระบบภายในองค์กรภายใน 11 เดือน ครอบคลุมระบบจัดการทัวร์และการจอง ระบบเบิกจ่าย ระบบพัสดุ การเชื่อมข้อมูลกับ SAP และการเข้ารหัสไฟล์ตามข้อกำหนดของธนาคารก่อนส่งผ่าน sFTP",
      en: "Delivered 6 internal systems in 11 months: tour booking and management, disbursement and advance payment, supply procurement, SAP data integration, and bank-standard file encryption transferred over sFTP.",
    },
    highlights: {
      th: [
        "ระบบจัดการทัวร์และการจอง",
        "ระบบวางแผนและเบิกจ่ายพัสดุ",
        "เข้ารหัสข้อมูลระบบธนาคารและส่งผ่าน sFTP",
        "ระบบเบิกจ่ายและเงินล่วงหน้า",
        "ระบบเชื่อมข้อมูลและจัดการไฟล์กับ SAP",
        "ระบบส่งไฟล์อัตโนมัติไปยังธนาคาร",
      ],
      en: [
        "Tour booking and management system",
        "Supply planning and procurement system",
        "Banking data encryption and sFTP transfer",
        "Advance and disbursement payment system",
        "SAP data connection and file management",
        "Automated bank file transfer",
      ],
    },
    keywords: ["PHP", "AJAX", "PostgreSQL", "Python", "SAP", "sFTP", "Windows Server"],
  },
  {
    company: { th: "บริษัท เนเจอร์ไบโอเทค จำกัด", en: "Nature Biotec Co., Ltd." },
    position: { th: "Full Stack Developer", en: "Full Stack Developer" },
    startDate: "2020-07",
    endDate: "2023-10",
    summary: {
      th: "พัฒนาระบบ Loyalty ‘Healthy Together’ ทั้งหน้าบ้านและหลังบ้าน รวมถึงระบบลงทะเบียน แลกของรางวัล QR Code เฉพาะสินค้า และ Lucky Draw พร้อมทำ Data Cleansing ด้วย Pandas และ Dashboard ด้วย Looker Studio",
      en: "Built the ‘Healthy Together’ loyalty platform end to end — registration, reward redemption, per-product QR codes and lucky draw — plus data cleansing with Pandas and dashboards in Looker Studio.",
    },
    highlights: {
      th: ["ระบบ Loyalty Healthy Together", "Data Report และ Dashboard", "เว็บไซต์ WordPress และดูแลความปลอดภัย"],
      en: ["Healthy Together loyalty system", "Data reporting and dashboards", "WordPress sites and security maintenance"],
    },
    keywords: ["PHP", "AJAX", "MySQL", "Bootstrap", "Python", "Pandas", "Looker Studio", "WordPress"],
  },
  {
    company: { th: "บริษัท อำพันเทคโนโลยี จำกัด", en: "Amphan Technology Co., Ltd." },
    position: { th: "นักศึกษาฝึกงาน (R&D)", en: "Intern (R&D)" },
    startDate: "2019-06",
    endDate: "2019-10",
    summary: {
      th: "ฝึกงานในตำแหน่ง R&D พัฒนาเว็บไซต์แสดงสถานะสำหรับงานโรงแรมตามที่ได้รับมอบหมาย",
      en: "R&D internship developing an assigned hotel status display website.",
    },
    highlights: { th: ["พัฒนาเว็บไซต์ในส่วน R&D"], en: ["Web development within the R&D team"] },
    keywords: ["PHP", "HTML", "CSS"],
  },
];

const education = [
  {
    institution: { th: "มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี", en: "Rajamangala University of Technology Thanyaburi" },
    studyType: { th: "ปริญญาตรี วิทยาศาสตรบัณฑิต", en: "Bachelor of Science" },
    area: { th: "เทคโนโลยีสารสนเทศ", en: "Information Technology" },
    startDate: "2016-08",
    endDate: "2020-03",
  },
];

const FS = (id) => `https://app.futureskill.co/api/certificate?courseId=${id}&userId=63471`;

const certificates = [
  { name: { th: "Mastering Fundamental Golang: Building REST API Project", en: "Mastering Fundamental Golang: Building REST API Project" }, issuer: "FutureSkill", url: FS(171) },
  { name: { th: "ปูพื้นฐานสู่สายงาน Data Engineer", en: "Foundation for Data Engineer Career" }, issuer: "FutureSkill", url: FS(612) },
  { name: { th: "เครื่องมือและโครงสร้างพื้นฐาน Data Engineering", en: "Data Engineering Tools & Infrastructure" }, issuer: "FutureSkill", url: FS(613) },
  { name: { th: "Python, Pandas & PySpark", en: "Python, Pandas & PySpark" }, issuer: "FutureSkill", url: FS(639) },
  { name: { th: "ETL Pipeline ด้วย PySpark", en: "ETL Pipeline with PySpark" }, issuer: "FutureSkill", url: FS(640) },
  { name: { th: "Serverless Data Lakes ด้วย AWS", en: "Serverless Data Lakes with AWS" }, issuer: "FutureSkill", url: FS(641) },
  { name: { th: "Data Science for Everyone", en: "Data Science for Everyone" }, issuer: "FutureSkill", url: FS(51) },
  { name: { th: "CompTIA Cloud Essentials+", en: "CompTIA Cloud Essentials+" }, issuer: "CompTIA", url: "https://drive.google.com/file/d/1M3AxoumBlYWQ-OtTKjVRB7-6teeXpJcj/view" },
];

/* กลุ่มทักษะ — ตรงกับที่แสดงใน section ทักษะบนหน้าเว็บ */
const skills = [
  { group: { th: "ภาษาและเฟรมเวิร์ก", en: "Languages & Frameworks" }, items: ["PHP", "Laravel", "JavaScript", "AJAX", "Python", "HTML", "CSS", "Bootstrap"] },
  { group: { th: "ฐานข้อมูล", en: "Databases" }, items: ["PostgreSQL", "MySQL", "Microsoft SQL Server"] },
  { group: { th: "เชื่อมต่อระบบและ Automation", en: "Integration & Automation" }, items: ["REST API", "SAP data integration", "WooCommerce REST API", "DHL Express API", "sFTP file encryption", "Batch automation"] },
  { group: { th: "เครื่องมือ", en: "Tools" }, items: ["Git", "Docker", "Postman", "WordPress", "Figma", "Looker Studio", "Windows Server"] },
  { group: { th: "กำลังศึกษา", en: "Currently learning" }, items: ["Golang"] },
];

module.exports = { person, work, education, certificates, skills };
