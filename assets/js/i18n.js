/* ============================================================
   CV i18n — Thai / English translations

   หมายเหตุ: ไฟล์นี้ "ไม่ได้ถูกโหลดในเบราว์เซอร์แล้ว"
   build.js อ่านไฟล์นี้ตอน build เพื่อสร้างสองหน้า static
   คือ index.html (ไทย) และ en/index.html (อังกฤษ)
   การสลับภาษาตอนนี้ใช้ลิงก์จริงระหว่างสองหน้า ไม่ใช่ JS

   แก้คำแปลที่นี่ แล้วรัน: node build.js
   ฟังก์ชัน applyLanguage / toggleLang / initI18n ด้านล่าง
   เก็บไว้เผื่ออ้างอิง — ไม่มีหน้าไหนเรียกใช้แล้ว
   ============================================================ */

window.cvI18n = {
  th: {
    /* ---- Navigation ---- */
    'nav.home':            'หน้าแรก',
    'nav.about':           'เกี่ยวกับ',
    'nav.skills':          'ทักษะ',
    'nav.experience':      'ประสบการณ์',
    'nav.certifications':  'ใบรับรอง',
    'nav.faq':             'คำถามที่พบบ่อย',
    'nav.contact':         'ติดต่อ',

    /* ---- Offcanvas ---- */
    'offcanvas.about.title':   'เกี่ยวกับฉัน',
    'offcanvas.about.text':    'สวัสดีครับ กระผม จารุวัฒน์ อำนวยสัตย์ (ฟิล์ม)<br>Full Stack Developer (PHP/Laravel) ถนัดระบบหลังบ้านองค์กร การเชื่อมต่อระบบ และ Automation',
    'offcanvas.contact.title': 'ข้อมูลติดต่อ',
    'offcanvas.address':       'อ.เมืองปทุมธานี จ.ปทุมธานี',
    'offcanvas.social.title':  'ติดตาม',

    /* ---- Banner ---- */
    'banner.badge':                   'Available for Work &amp; Freelance',
    'banner.title':                   'จารุวัฒน์ อำนวยสัตย์<br><span class="rs-banner-role">Full Stack Developer</span>',
    'banner.description':             'ประสบการณ์ 6 ปี · ปทุมธานี / พร้อมทำงาน Remote<br>ถนัดระบบหลังบ้านองค์กร · เชื่อมต่อ SAP และระบบธนาคาร · Automation',
    'banner.metric.exp.title':        'ประสบการณ์',
    'banner.metric.exp.value':        '6 ปี',
    'banner.metric.projects.title':   'โปรเจกต์',
    'banner.metric.companies.title':  'บริษัท',
    'banner.cta.resume':              'ดาวน์โหลด Resume',
    'banner.cta.contact':             'ติดต่อผม',

    /* ---- About ---- */
    'about.subtitle':        'เกี่ยวกับฉัน',
    'about.title':           'ถนัดระบบหลังบ้านองค์กร<br><span class="rs-text-primary">ที่ต้องเชื่อมหลายระบบเข้าด้วยกัน</span>',
    'about.designation':     'Full Stack Developer (PHP/Laravel)',
    'about.description':     'สวัสดีครับ ผมชื่อ ฟิล์ม เป็น Full Stack Developer ประสบการณ์ 6 ปี ทำงานหลักด้วย PHP/Laravel และ SQL งานที่ถนัดที่สุดคือระบบหลังบ้านขององค์กร ตั้งแต่ระบบเบิกจ่าย ระบบสมาชิก ไปจนถึงการเชื่อมข้อมูลกับ SAP และการส่งไฟล์เข้ารหัสตามมาตรฐานธนาคาร ชอบเขียนโค้ดที่สะอาด อ่านง่าย และดูแลต่อได้ในระยะยาว',
    'about.feature.1':       'เชี่ยวชาญ PHP/Laravel, REST API, Database และ Automation',
    'about.feature.2':       'โฟกัสคุณภาพโค้ดที่อ่านง่ายและดูแลต่อได้ในระยะยาว',
    'about.feature.3':       'สื่อสารชัดเจน วางแผนเป็นระบบ ส่งมอบงานตรงเวลา',
    'about.feature.4':       'พร้อมเรียนรู้เทคโนโลยีใหม่เพื่อเพิ่มประสิทธิภาพงาน',
    'about.bio.age':         'อายุ',
    'about.bio.age.suffix':  ' ปี',
    'about.bio.gender':      'เพศ',
    'about.bio.gender.val':  'ชาย',
    'about.bio.phone':       'โทรศัพท์',
    'about.bio.email':       'อีเมล',
    'about.btn.contact':     'ติดต่อฉัน',
    'about.btn.resume':      'ดาวน์โหลด Resume',

    /* ---- Skills ---- */
    'skills.subtitle':      'ความเชี่ยวชาญ',
    'skills.title':         'ทักษะและเครื่องมือ',
    'skills.primary.note':  'ทักษะหลักที่ใช้งานจริงเป็นประจำ',
    'skills.laravel.meta':  'ระบบหลังบ้านที่ใช้งานจริงใน Production',
    'skills.learning.label': 'กำลังศึกษา',
    'skills.strong.note':   'ทักษะที่ใช้งานร่วมกับงานหลักสม่ำเสมอ',

    /* ---- Shared labels ---- */
    'label.tech.stack':    'เทคโนโลยีที่ใช้',
    'label.status':        'สถานะ',

    /* ---- Experience ---- */
    'exp.subtitle': 'ประสบการณ์',
    /* ---- Experience stats (นับจากงานที่ระบุไว้จริง) ---- */
    'exp.stherb.stat.a':    '3 งานหลัก',
    'exp.stherb.stat.b':    'HerbCore CRM ~70%',
    'exp.cm.stat.a':        '6 ระบบ',
    'exp.cm.stat.b':        '11 เดือน',
    'exp.nat.stat.a':       '3 ระบบหลัก',
    'exp.nat.stat.b':       '3 ปี 4 เดือน',
    'exp.amphan.stat.a':    'ฝึกงาน 5 เดือน',

    'exp.title':    'ประสบการณ์การทำงาน',

    /* St.Herb */
    'exp.stherb.period':         'เม.ย. 2568 – ปัจจุบัน',
    'exp.stherb.web.title':      'ดูแลและพัฒนาเว็บไซต์',
    'exp.stherb.web.desc':       '<p><strong>หน้าที่:</strong> ออกแบบและพัฒนาเว็บไซต์ของบริษัทใหม่ทั้งสองเว็บ โดยเขียนธีมขึ้นเองทั้งชุด พร้อมดูแลความเสถียร/ความปลอดภัย ติดตาม Traffic ปรับ SEO และจัดทำระบบ Backup</p><p><strong>ผลลัพธ์:</strong> ทั้งสองเว็บใช้งานจริงแล้ว แต่ละเว็บมีบุคลิกและลำดับการอ่านที่ออกแบบมาตามกลุ่มผู้ซื้อของตัวเอง เว็บเสถียรขึ้นและการมองเห็นดีขึ้น</p>',
    'exp.stherb.server.title':   'ดูแลและประสานงาน Server',
    'exp.stherb.server.desc':    '<p><strong>หน้าที่:</strong> ประสานงานและเฝ้าระวังความเสถียรของ Server พร้อมแก้ปัญหาเบื้องต้น</p><p><strong>ผลลัพธ์:</strong> บริการไม่สะดุดและลดเวลาหยุดชะงักของระบบ</p>',
    'exp.stherb.crm.title':     'พัฒนาระบบ HerbCore CRM',
    'exp.stherb.crm.desc':      '<p><strong>หน้าที่:</strong> พัฒนาระบบ CRM หลังบ้านเองทั้งระบบ รวมออเดอร์จากร้าน WooCommerce หลายร้านมาไว้ที่เดียว ตั้งแต่ดึงออเดอร์อัตโนมัติตามรอบ คิวแพ็กที่ตัดสต็อกเอง การคืนเงินแบบยอดสุทธิ จองขนส่ง DHL Express อีเมลการตลาดและอีเมลขาเข้า ไปจนถึงหน้าวิเคราะห์ยอดขาย สิทธิ์ผู้ใช้ และ Audit Log</p><p><strong>ขนาดงาน:</strong> 37 หน้าจอ · 35 controller · API 13 กลุ่มงาน · 57 migration · งานเบื้องหลังตั้งเวลา 4 ตัว</p><p><strong>สถานะ:</strong> พัฒนาไปแล้วประมาณ 70% — ส่วนจองขนส่ง DHL ผ่านการทดสอบ Sandbox แบบ end-to-end แล้ว รอสิทธิ์บัญชี Production</p>',

    /* Cloudmate */
    'exp.cm.period':        'ม.ค. – พ.ย. 2567',
    'exp.cm.tour.title':    'ระบบจัดการทัวร์และการจอง',
    'exp.cm.tour.desc':     '<p><strong>หน้าที่:</strong> พัฒนาแพลตฟอร์มจัดการทัวร์และระบบจองทัวร์</p><p><strong>ผลลัพธ์:</strong> ทีมงานจัดการข้อมูลเป็นระบบ ลดงานซ้ำซ้อน ทำงานได้เร็วขึ้น</p>',
    'exp.cm.mm.title':      'ระบบวางแผนและเบิกจ่ายพัสดุ',
    'exp.cm.mm.desc':       '<p><strong>หน้าที่:</strong> วางแผนเบิกพัสดุรายไตรมาส ออกแบบขั้นตอนอนุมัติ และส่งออกข้อมูลเป็น Excel</p><p><strong>ผลลัพธ์:</strong> ควบคุมงบประมาณชัดเจน ตรวจสอบย้อนหลังง่าย</p>',
    'exp.cm.enc.title':     'เข้ารหัสข้อมูลระบบธนาคาร',
    'exp.cm.enc.desc':      '<p><strong>หน้าที่:</strong> สร้างไฟล์จาก SAP และเข้ารหัสตามข้อกำหนดธนาคารก่อนส่งผ่าน sFTP รวมถึงดึงไฟล์ผลลัพธ์การชำระเงินจาก sFTP ของธนาคารมาเข้ารหัสและบันทึกเข้า SAP</p><p><strong>ผลลัพธ์:</strong> การส่งข้อมูลปลอดภัยและผ่านมาตรฐานของธนาคาร</p>',
    'exp.cm.adv.title':     'ระบบเบิกจ่ายและเงินล่วงหน้า',
    'exp.cm.adv.desc':      '<p><strong>หน้าที่:</strong> บันทึกรายการเงินล่วงหน้า, เบิกจ่ายโดยไม่ต้องอ้างอิงรายการล่วงหน้า, อนุมัติตามเงื่อนไขและลำดับที่กำหนด, ส่งออกข้อมูลเป็น Excel</p><p><strong>ผลลัพธ์:</strong> ระบบการเงินโปร่งใส ตรวจสอบย้อนหลังได้ง่าย</p>',
    'exp.cm.data.title':    'ระบบเชื่อมข้อมูลและจัดการไฟล์',
    'exp.cm.data.desc':     '<p><strong>หน้าที่:</strong> ดึงข้อมูลจากแหล่งภายนอกเข้าฐานข้อมูล หรือสร้างไฟล์ .txt สำหรับ SAP, ใช้ bat files เพื่อดึงข้อมูลแบบ real-time</p><p><strong>ผลลัพธ์:</strong> ข้อมูลระหว่างระบบสอดคล้องกัน ลดการทำงานซ้ำซ้อน</p>',
    'exp.cm.auto.title':    'ระบบส่งไฟล์อัตโนมัติ',
    'exp.cm.auto.desc':     '<p><strong>หน้าที่:</strong> พัฒนาโปรแกรมช่วยส่งข้อมูลการชำระเงินไปธนาคารผ่าน FTP พร้อมลบไฟล์ที่ส่งแล้ว และเข้ารหัสไฟล์ตามข้อกำหนดธนาคาร</p><p><strong>ผลลัพธ์:</strong> ลดขั้นตอนการทำงานด้วยมือ เพิ่มความปลอดภัยในการส่งข้อมูล</p>',
    'exp.cm.server.title':  'ดูแลและประสานงาน Server',
    'exp.cm.server.desc':   '<p><strong>หน้าที่:</strong> แก้ปัญหา Server เบื้องต้น, จัดซื้อโดเมนและเชื่อมต่อกับ Server ผ่าน DNS, จัดซื้อ SSL สำหรับ HTTPS, ตั้งค่า Server ตามข้อกำหนดซอฟต์แวร์สำหรับ Deploy ระบบ</p><p><strong>ผลลัพธ์:</strong> ระบบ Deploy ได้สำเร็จ การเชื่อมต่อปลอดภัยด้วย HTTPS</p>',

    /* Nature Biotec */
    'exp.nat.period':       'ก.ค. 2563 – ต.ค. 2566',
    'exp.nat.ht.title':     'เว็บไซต์ Healthy Together',
    'exp.nat.ht.desc':      '<p><strong>หน้าที่:</strong> พัฒนาระบบลงทะเบียน/แลกของรางวัล, หลังบ้านจัดการข้อมูลลูกค้า, สิทธิ์ประโยชน์ และประวัติการแลกรางวัล</p><p><strong>หน้าที่เพิ่มเติม:</strong> สร้าง QR Code ถาวรตามที่ได้รับมอบหมาย, พัฒนาฟอร์มลงทะเบียนสินค้า Clean Edge, ฟอร์ม Claiming และ QR Code เฉพาะแต่ละ Product Code, พัฒนาระบบ Lucky Draw สำหรับบันทึก ลงทะเบียน และจัดการข้อมูลกิจกรรม</p><p><strong>ผลลัพธ์:</strong> ลูกค้าใช้งานสะดวกขึ้น ทีมงานจัดการรายการได้เร็ว</p>',
    'exp.nat.report.title': 'Data Report &amp; Dashboard',
    'exp.nat.report.desc':  '<p><strong>หน้าที่:</strong> Data Cleansing และสร้างรายงาน เชื่อมข้อมูลเข้า Dashboard</p><p><strong>ผลลัพธ์:</strong> ผู้บริหารเห็นภาพรวมได้เร็ว ทีมการตลาดสื่อสารตรงจังหวะ</p>',
    'exp.nat.wp.title':     'WordPress Website',
    'exp.nat.wp.desc':      '<p><strong>หน้าที่:</strong> ออกแบบเว็บไซต์ จดทะเบียนโดเมน ตั้งค่าระบบ และดูแลความปลอดภัย</p><p><strong>ผลลัพธ์:</strong> เว็บน่าเชื่อถือ ใช้งานเร็ว และลดความเสี่ยงช่องโหว่</p>',

    /* Amphan */
    'exp.amphan.period':      'มิ.ย. – ต.ค. 2562',
    'exp.amphan.web.title':   'พัฒนาเว็บไซต์ในส่วน R&amp;D',
    'exp.amphan.web.desc':    '<p><strong>หน้าที่:</strong> ฝึกงานในตำแหน่ง R&amp;D โดยพัฒนาเว็บไซต์ตามที่ได้รับมอบหมาย</p><p><strong>ผลลัพธ์:</strong> ได้รับประสบการณ์การพัฒนาเว็บไซต์จริงในสภาพแวดล้อมการทำงานระดับองค์กร</p>',

    /* ---- Qualification ---- */
    'qual.subtitle':          'ประวัติการศึกษา',
    'qual.title':             'การศึกษา',
    'qual.lower.title':       'มัธยมศึกษาตอนต้น',
    'qual.lower.period':      'ม.1 – ม.3',
    'qual.lower.school':      'โรงเรียนสวนกุหลาบวิทยาลัย นครศรีธรรมราช',
    'qual.lower.meta':        '',
    'qual.upper.title':       'มัธยมศึกษาตอนปลาย',
    'qual.upper.period':      'เมษายน 2556 – ธันวาคม 2558',
    'qual.upper.school':      'โรงเรียนสวนกุหลาบวิทยาลัย นครศรีธรรมราช',
    'qual.upper.meta':        'สายวิทย์–คณิต',
    'qual.bachelor.title':    'ปริญญาตรี',
    'qual.bachelor.period':   'สิงหาคม 2559 – มีนาคม 2563',
    'qual.bachelor.school':   'มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี',
    'qual.bachelor.meta':     'สาขาเทคโนโลยีสารสนเทศ<br>คณะวิทยาศาสตร์และเทคโนโลยี',

    /* ---- Certifications ---- */
    'cert.subtitle':          'ใบรับรอง',
    'cert.desc':              '8 ใบรับรอง พร้อมลิงก์ตรวจสอบหลักฐานได้ทุกใบ',
    'cert.backend.subtitle':  'งานพัฒนา REST API และระบบฝั่งเซิร์ฟเวอร์',
    'cert.data.subtitle':     'เส้นทางด้าน Data Science และ Data Engineering',
    'cert.cloud.subtitle':    'พื้นฐานระบบคลาวด์และการจัดการโครงสร้างพื้นฐาน',
    'cert.view':              'ดูใบรับรอง',
    'cert.de.course':         'Data Engineer Track (5 ใบรับรอง)',
    'cert.de.cert1':          'ปูพื้นฐานสู่สายงาน Data Engineer',
    'cert.de.cert2':          'เครื่องมือและโครงสร้างพื้นฐาน Data Engineering',
    'cert.de.cert3':          'Python, Pandas &amp; PySpark',
    'cert.de.cert4':          'ETL Pipeline ด้วย PySpark',
    'cert.de.cert5':          'Serverless Data Lakes ด้วย AWS',

    /* ---- Company names ---- */
    'company.stherb':   'บริษัท เซนต์เฮิร์บ คอสเมติกส์ อินเตอร์เนชั่นแนล จำกัด',
    'company.cm':       'บริษัท คลาวด์เมท จำกัด',
    'company.nat':      'บริษัท เนเจอร์ไบโอเทค จำกัด',
    'company.amphan':   'บริษัท อำพันเทคโนโลยี จำกัด',

    /* ---- Footer ---- */
    'footer.brand.desc':     'Full Stack Developer (PHP/Laravel)<br>ระบบหลังบ้านองค์กร · เชื่อมต่อระบบ · Automation',
    'footer.nav.title':      'เมนูหลัก',
    'footer.nav.home':       'หน้าแรก',
    'footer.nav.about':      'เกี่ยวกับ',
    'footer.nav.skills':     'ทักษะ',
    'footer.nav.experience': 'ประสบการณ์',
    'footer.nav.cert':       'ใบรับรอง',
    'footer.nav.contact':    'ติดต่อ',
    'footer.contact.title':  'ข้อมูลติดต่อ',
    'footer.address':        'อ.เมืองปทุมธานี จ.ปทุมธานี<br>(พร้อมเดินทาง กรุงเทพฯ–ปริมณฑล / Remote)',
    'footer.download':       'ดาวน์โหลด Resume (PDF)',
    'footer.location':       'Full Stack Developer · ปทุมธานี, ไทย',




    /* ---- Contact form / CTA ---- */
    'contact.cta.text': 'ส่งรายละเอียดงานหรือคำถามมาทางอีเมลได้เลย ตอบกลับทุกฉบับ',
    'contact.cta.btn':  'ส่งอีเมลถึงผม',
    'form.name':    'ชื่อของคุณ',
    'form.email':   'อีเมลสำหรับติดต่อกลับ',
    'form.message': 'ข้อความ',
    'form.submit':  '<i class="ri-send-plane-line"></i> ส่งข้อความ',
    'form.sending': 'กำลังส่ง...',
    'form.ok':      'ส่งข้อความเรียบร้อยแล้ว ขอบคุณครับ จะติดต่อกลับโดยเร็วที่สุด',
    'form.fail':    'ส่งไม่สำเร็จ ลองใหม่อีกครั้ง หรืออีเมลมาที่ <a href="mailto:overlag02@gmail.com">overlag02@gmail.com</a> ได้เลย',

    /* ---- Work / Case studies ---- */
    'work.subtitle': 'ผลงาน',
    'work.title':    'ตัวอย่างงานที่ทำ',
    'work.intro':    'เลือกมา 5 ระบบที่สะท้อนงานที่ถนัดที่สุด — แต่ละชิ้นเล่าเป็นโจทย์ สิ่งที่ทำ และผลลัพธ์',
    'work.note':     'หมายเหตุ: ภาพประกอบเป็นแผนภาพการทำงานที่วาดขึ้นใหม่ ไม่ใช่ภาพหน้าจอระบบจริง เนื่องจากทุกชิ้นเป็นระบบภายในขององค์กร',
    'label.problem': 'โจทย์',
    'label.doing':   'สิ่งที่ทำ',
    'label.result':  'ผลลัพธ์',

    'work.crm.tag':     'เซนต์เฮิร์บ · 2569',
    'work.crm.badge':   'กำลังพัฒนา · ~70%',
    'work.crm.name':    'HerbCore CRM — รวมออเดอร์หลายร้านค้าออนไลน์ ตั้งแต่รับออเดอร์ถึงจัดส่ง',
    'work.crm.alt':     'แผนภาพระบบ HerbCore CRM ตั้งแต่ดึงออเดอร์จากหลายร้านไปจนถึงการจัดส่ง',
    'work.crm.problem': 'ธุรกิจขายผ่านเว็บ WooCommerce หลายร้านพร้อมกัน ออเดอร์ ลูกค้า และสต็อกกระจายอยู่คนละหลังร้าน ต้องคัดลอกมารวมด้วยมือทุกวัน ส่วนยอดขายที่รายงานออกมายังไม่ได้หักคืนเงิน ตัวเลขที่ใช้ตัดสินใจจึงไม่ตรงกับเงินที่ได้รับจริง',
    'work.crm.doing':   'พัฒนาเองทั้งระบบด้วย PHP 8.2 + PostgreSQL บน Docker รวม 37 หน้าจอ 35 controller API 13 กลุ่มงาน 57 migration และงานเบื้องหลังตั้งเวลา 4 ตัว ดึงออเดอร์จากทุกร้านผ่าน WooCommerce REST API ตามรอบอัตโนมัติ ต่อเข้าคิวแพ็กที่ตัดสต็อกเอง เชื่อม DHL Express API เพื่อขอราคา สร้าง Shipment และเก็บ Label กับเลข Tracking ไว้กับออเดอร์ พร้อมระบบอีเมลการตลาด อีเมลขาเข้า สิทธิ์ผู้ใช้ และหน้าวิเคราะห์ยอดขาย',
    'work.crm.result':  'ออเดอร์จากทุกร้านเข้ามารวมเองโดยไม่ต้องคัดลอกมือ พนักงานคลังทำงานจากคิวเดียวและสถานะไม่ถูก sync ทับ ส่วนการคืนเงินเก็บเป็นรายการแยกที่หักออกจากยอดทุกจุดโดยอัตโนมัติ ตัวเลขในระบบจึงเป็นยอดสุทธิเสมอโดยไม่ต้องแก้ออเดอร์ย้อนหลัง',
    'work.crm.status':  'อยู่ระหว่างพัฒนา เสร็จแล้วประมาณ 70% ส่วนจองขนส่ง DHL ผ่านชุดทดสอบและทดสอบ Sandbox แบบ end-to-end แล้ว รอสิทธิ์บัญชี Production จึงจะเปิดใช้จริงได้',

    'work.sap.tag':     'คลาวด์เมท · 2567',
    'work.sap.name':    'ระบบเชื่อมข้อมูล SAP และส่งไฟล์เข้ารหัสให้ธนาคาร',
    'work.sap.alt':     'แผนภาพการทำงานของระบบส่งไฟล์จาก SAP ไปยังธนาคาร',
    'work.sap.problem': 'การส่งข้อมูลการชำระเงินให้ธนาคารต้องทำเป็นรอบ ต้องสร้างไฟล์จาก SAP เข้ารหัสตามข้อกำหนดของธนาคาร แล้วส่งผ่าน sFTP ทุกขั้นตอนทำมือ ผิดพลาดได้ง่ายและกินเวลา',
    'work.sap.doing':   'เขียนโปรแกรม Python ดึงข้อมูลจาก SAP สร้างไฟล์ตามรูปแบบที่ธนาคารกำหนด เข้ารหัสตามมาตรฐาน ส่งผ่าน sFTP แล้วลบไฟล์ที่ส่งแล้ว พร้อมขาดึงไฟล์ผลการชำระเงินกลับมาถอดรหัสและบันทึกเข้า SAP',
    'work.sap.result':  'การส่งข้อมูลผ่านมาตรฐานความปลอดภัยของธนาคาร ลดขั้นตอนที่ต้องทำมือ และข้อมูลสองระบบตรงกันโดยไม่ต้องกระทบยอดเอง',

    'work.adv.tag':     'คลาวด์เมท · 2567',
    'work.adv.name':    'ระบบเบิกจ่ายและเงินทดรองจ่าย',
    'work.adv.alt':     'แผนภาพระบบเบิกจ่ายและเงินทดรองจ่าย',
    'work.adv.problem': 'การเบิกจ่ายมีหลายเส้นทาง ทั้งแบบอ้างอิงเงินทดรองจ่ายและแบบไม่อ้างอิง แต่ละแบบมีลำดับผู้อนุมัติและเงื่อนไขต่างกัน และต้องตรวจสอบย้อนหลังได้',
    'work.adv.doing':   'พัฒนาระบบบันทึกรายการเงินล่วงหน้าและการเบิกจ่าย ออกแบบขั้นตอนอนุมัติที่กำหนดเงื่อนไขและลำดับได้ พร้อมส่งออกข้อมูลเป็น Excel สำหรับงานบัญชี',
    'work.adv.result':  'ทุกรายการมีร่องรอยการอนุมัติครบ ตรวจสอบย้อนหลังได้ง่าย และฝ่ายบัญชีดึงข้อมูลไปใช้ต่อได้ทันที',

    'work.mm.tag':     'คลาวด์เมท · 2567',
    'work.mm.name':    'ระบบวางแผนและเบิกจ่ายพัสดุรายไตรมาส',
    'work.mm.alt':     'แผนภาพระบบวางแผนและเบิกจ่ายพัสดุรายไตรมาส',
    'work.mm.problem': 'การเบิกพัสดุกระจายอยู่หลายหน่วยงาน ไม่มีภาพรวมว่าแต่ละไตรมาสวางแผนไว้เท่าไรและเบิกไปแล้วเท่าไร ทำให้คุมงบประมาณยาก',
    'work.mm.doing':   'พัฒนาระบบวางแผนเบิกพัสดุรายไตรมาส ออกแบบขั้นตอนขออนุมัติและติดตามสถานะรายการ พร้อมเก็บประวัติการเบิกและส่งออกเป็น Excel',
    'work.mm.result':  'เห็นภาพรวมการใช้พัสดุทั้งปี คุมงบประมาณได้ชัดเจนขึ้น และลดงานเอกสารที่ต้องทำซ้ำ',

    'work.ht.tag':     'เนเจอร์ไบโอเทค · 2563–2566',
    'work.ht.name':    'Healthy Together — ระบบสะสมแต้มและแลกของรางวัล',
    'work.ht.alt':     'แผนภาพระบบสะสมแต้มและแลกของรางวัล Healthy Together',
    'work.ht.problem': 'ต้องการระบบให้ลูกค้าลงทะเบียนสินค้าและสะสมโค้ดเพื่อแลกของรางวัล พร้อมหลังบ้านที่ทีมการตลาดจัดการเองได้ และรายงานที่ผู้บริหารดูภาพรวมได้',
    'work.ht.doing':   'พัฒนาทั้งหน้าบ้านและหลังบ้าน ตั้งแต่ฟอร์มลงทะเบียน การสร้าง QR Code เฉพาะแต่ละรหัสสินค้า ระบบสะสมและแลกของรางวัล ระบบ Lucky Draw ไปจนถึงการทำ Data Cleansing ด้วย Pandas และ Dashboard บน Looker Studio',
    'work.ht.result':  'ทีมการตลาดจัดการกิจกรรมได้เองโดยไม่ต้องรอทีมพัฒนา และผู้บริหารเห็นภาพรวมการลงทะเบียนและการแลกของรางวัลจาก Dashboard ได้ทันที',

    'nav.work':      'ผลงาน',

    /* ---- FAQ (ใช้ทั้งบนหน้าเว็บและใน FAQPage schema) ---- */
    'faq.subtitle':    'คำถามที่พบบ่อย',
    'faq.title':       'คำถามจากผู้ว่าจ้าง',
    'faq.work.q':      'รับงานประเภทไหนบ้าง',
    'faq.work.a':      'รับงานประจำตำแหน่ง Full Stack Developer, Programmer และ Web Developer รวมถึงงาน Freelance ที่เกี่ยวกับ Web Application, REST API, ระบบหลังบ้านองค์กร และงาน Automation เชื่อมต่อข้อมูลระหว่างระบบ',
    'faq.stack.q':     'ถนัด tech stack อะไรบ้าง',
    'faq.stack.a':     'ทำงานหลักด้วย PHP และ Laravel คู่กับฐานข้อมูล PostgreSQL, MySQL และ SQL Server ฝั่งหน้าเว็บใช้ JavaScript, AJAX, HTML/CSS และ Bootstrap ส่วนงาน Automation และจัดการข้อมูลใช้ Python กับ Pandas',
    'faq.location.q':  'ทำงาน remote หรือ onsite ที่ไหนได้บ้าง',
    'faq.location.a':  'อยู่อำเภอเมืองปทุมธานี จังหวัดปทุมธานี เดินทางเข้าทำงาน onsite ในกรุงเทพฯ และปริมณฑลได้ และทำงานแบบ remote หรือ hybrid ได้เช่นกัน',
    'faq.experience.q':'มีประสบการณ์กี่ปี ทำอะไรมาบ้าง',
    'faq.experience.a':'ทำงานสายพัฒนาระบบมา 6 ปี ผ่านบริษัท 3 แห่ง งานที่ผ่านมามีระบบ Loyalty และแลกของรางวัล ระบบจัดการทัวร์และการจอง ระบบเบิกจ่ายและพัสดุ การเชื่อมข้อมูลกับ SAP และการเข้ารหัสไฟล์ส่งธนาคารผ่าน sFTP',
    'faq.start.q':     'ติดต่อและเริ่มงานได้อย่างไร',
    'faq.start.a':     'ติดต่อได้ทางอีเมล overlag02@gmail.com หรือโทร 064-661-3238 ดาวน์โหลดเรซูเม่ฉบับเต็มได้จากปุ่มบนหน้านี้ ส่วนช่วงเวลาที่เริ่มงานได้ ขอพูดคุยตกลงกันอีกครั้งตามเงื่อนไขของงาน',

    /* ---- Alt / title ของรูป (แปลผ่าน data-i18n-attr) ---- */
    'alt.portrait':    'จารุวัฒน์ อำนวยสัตย์ — Full Stack Developer (PHP/Laravel)',

    /* ---- Contact ---- */
    'contact.subtitle':       'ติดต่อ',
    'contact.title':          'ช่องทางการติดต่อ',
    'contact.desc':           'พร้อมรับงาน Freelance และเปิดรับโอกาสใหม่เสมอ',
    'contact.phone.label':    'เบอร์โทรศัพท์',
    'contact.email.label':    'อีเมล',
    'contact.location.label': 'ที่อยู่',
    'contact.location.value': 'ปทุมธานี · พร้อมทำงาน Remote',
    'contact.social.label':   'ติดตามได้ที่',

    /* ---- เว็บไซต์ที่ออกแบบใหม่ (อยู่ใน task ดูแลและพัฒนาเว็บไซต์) ---- */
    'site.block.title':  'เว็บไซต์ที่ออกแบบใหม่ (custom theme ทั้งชุด)',
    'site.visit':        'เปิดดูเว็บไซต์',
    'site.note':         'ทั้งสองเว็บอยู่บน WordPress เหมือนกันแต่เป็นธีมคนละชุดที่เขียนขึ้นใหม่ทั้งหมด ไม่ได้เอาธีมสำเร็จรูปมาเปลี่ยนสี — ดูได้จากระบบฟอนต์ พาเลต โครงสร้าง header และชุด section ที่ไม่ซ้ำกันเลยสักส่วนเดียว',

    'site.stherb.tag':   'ร้านค้าออนไลน์สกินแคร์ · อังกฤษ / 中文',
    'site.stherb.desc':  'แบรนด์สกินแคร์สมุนไพรที่ขายตรงถึงผู้บริโภคทั่วโลก โจทย์คือทำให้คนที่เพิ่งรู้จักแบรนด์เชื่อใจพอจะกดซื้อภายในหน้าเดียว',
    'site.stherb.p1':    'คู่ฟอนต์ Cormorant (หัวเรื่อง) กับ Mulish (เนื้อความ) บนพื้นครีม ให้โทนนิตยสารความงามและแยกลำดับหัวเรื่องกับเนื้อความได้ชัดในตัวเอง',
    'site.stherb.p2':    'Hero จบลำดับการอ่านใน 1 จอ: ป้ายหมวด → พาดหัว → คำอธิบาย → ปุ่มหลัก/รอง โดยมีการ์ดคะแนน 4.9 จาก 12,400 รีวิว ลอยอยู่เหนือ fold — หลักฐานความน่าเชื่อถือมาถึงตาก่อนต้องเลื่อน',
    'site.stherb.p3':    'แถบความมั่นใจ 4 ข้อ (จ่ายเงินปลอดภัย · คืนสินค้าง่าย · ซัพพอร์ต 24/7 · ส่งทั่วโลก) คั่นก่อนแถวสินค้า ตอบข้อกังวลก่อนถึงปุ่มซื้อ',
    'site.stherb.p4':    'เมนู Products เป็น mega menu แยก Women / Men พร้อมหมวดย่อย เลือกได้จากเมนูโดยไม่ต้องเข้าหน้ารวมก่อน ส่วนการ์ดสินค้าอ่านครบในใบเดียว: หมวด → ชื่อ → ดาวและจำนวนรีวิว → ราคา → ปุ่มเต็มความกว้าง',
    'site.stherb.p5':    'ภาพ 14 จาก 25 ไฟล์เป็น WebP มี srcset และ lazy-load ไม่มีการเลื่อนแนวนอนที่ความกว้าง 390px รองรับสองภาษาผ่าน hreflang',

    'site.emperor.tag':  'สารสกัดสมุนไพรส่งออก · อังกฤษ',
    'site.emperor.desc': 'สารสกัดพฤกษศาสตร์สำหรับตลาดส่งออก คนอ่านคือผู้ซื้อที่มองหาคู่ค้า ไม่ใช่ผู้บริโภคที่ซื้อชิ้นเดียว ภาษาภาพจึงต้องต่างจาก Stherb ทั้งชุด',
    'site.emperor.p1':   'เขียวเข้มกับทอง คู่กับ Playfair Display และ Nunito Sans โลโก้อยู่กลางแล้วแยกเมนูซ้าย-ขวา เป็นภาษาของสินค้าพรีเมียม คนละบุคลิกกับ Stherb โดยสิ้นเชิงทั้งที่อยู่บน WordPress เหมือนกัน',
    'site.emperor.p2':   'Hero ใส่ตัวเลขที่ผู้ซื้อ B2B ใช้ตัดสินใจตั้งแต่วินาทีแรก: 70+ ชนิดสินค้า · 32 ตลาดส่งออก · ประสบการณ์ 10+ ปี',
    'site.emperor.p3':   'มีปุ่มหลักปุ่มเดียว "Shop the Catalog" ต่างจาก Stherb ที่ใช้สองปุ่ม เพราะผู้ซื้อกลุ่มนี้มาด้วยเป้าหมายเดียว ไม่ต้องมีทางเลือกมาแย่งความสนใจ',
    'site.emperor.p4':   'จัดสินค้าตามเป้าหมายสุขภาพ 5 กลุ่มแทนการเรียงตามชื่อ และเขียนคำมั่นสัญญาเป็นข้อ No.1–No.3 พร้อมไอคอน แทนที่จะเป็นย่อหน้ายาว',

    /* ---- ชื่อที่ screen reader อ่าน สำหรับปุ่มที่มีแต่ไอคอน ---- */
    'aria.menu.open':   'เปิดเมนู',
    'aria.menu.close':  'ปิดเมนู',
    'aria.backtotop':   'กลับขึ้นด้านบน',
  },

  en: {
    /* ---- Navigation ---- */
    'nav.home':            'Home',
    'nav.about':           'About',
    'nav.skills':          'Skills',
    'nav.experience':      'Experience',
    'nav.certifications':  'Certifications',
    'nav.faq':             'FAQ',
    'nav.contact':         'Contact',

    /* ---- Offcanvas ---- */
    'offcanvas.about.title':   'About Me',
    'offcanvas.about.text':    "Hi, I'm Jaruwat Amnuaysat (Film)<br>Full Stack Developer (PHP/Laravel) specialising in enterprise back-office systems, integration and automation",
    'offcanvas.contact.title': 'Contact Info',
    'offcanvas.address':       'Mueang Pathum Thani, Pathum Thani',
    'offcanvas.social.title':  'Follow',

    /* ---- Banner ---- */
    'banner.badge':                   'Available for Work &amp; Freelance',
    'banner.title':                   'Jaruwat Amnuaysat<br><span class="rs-banner-role">Full Stack Developer</span>',
    'banner.description':             '6 years of experience · Pathum Thani / open to remote<br>Enterprise back-office systems · SAP &amp; banking integration · Automation',
    'banner.metric.exp.title':        'Experience',
    'banner.metric.exp.value':        '6 Years',
    'banner.metric.projects.title':   'Projects',
    'banner.metric.companies.title':  'Companies',
    'banner.cta.resume':              'Download Resume',
    'banner.cta.contact':             'Get in touch',

    /* ---- About ---- */
    'about.subtitle':        'About Me',
    'about.title':           'Enterprise back-office systems<br><span class="rs-text-primary">that have to talk to each other</span>',
    'about.designation':     'Full Stack Developer (PHP/Laravel)',
    'about.description':     "Hi, I'm Film — a Full Stack Developer with 6 years of experience, working mainly with PHP/Laravel and SQL. My strongest area is enterprise back-office systems: disbursement and membership platforms, SAP data integration, and encrypted file transfers built to banking standards. I enjoy writing clean, maintainable code that lasts.",
    'about.feature.1':       'Proficient in PHP/Laravel, REST API, Database and Automation',
    'about.feature.2':       'Focused on clean, readable code that is easy to maintain long-term',
    'about.feature.3':       'Clear communicator, systematic planner, on-time delivery',
    'about.feature.4':       'Always learning new technologies to improve work efficiency',
    'about.bio.age':         'Age',
    'about.bio.age.suffix':  ' yrs',
    'about.bio.gender':      'Gender',
    'about.bio.gender.val':  'Male',
    'about.bio.phone':       'Phone',
    'about.bio.email':       'Email',
    'about.btn.contact':     'Contact Me',
    'about.btn.resume':      'Download Resume',

    /* ---- Skills ---- */
    'skills.subtitle':      'Expertise',
    'skills.title':         'Skills &amp; Tools',
    'skills.primary.note':  'Core skills used regularly in production',
    'skills.laravel.meta':  'Production back-office systems',
    'skills.learning.label': 'Currently learning',
    'skills.strong.note':   'Skills consistently used alongside primary work',

    /* ---- Shared labels ---- */
    'label.tech.stack':    'Tech Stack',
    'label.status':        'Status',

    /* ---- Experience ---- */
    'exp.subtitle': 'Experience',
    /* ---- Experience stats ---- */
    'exp.stherb.stat.a':    '3 main responsibilities',
    'exp.stherb.stat.b':    'HerbCore CRM ~70%',
    'exp.cm.stat.a':        '6 systems',
    'exp.cm.stat.b':        '11 months',
    'exp.nat.stat.a':       '3 core systems',
    'exp.nat.stat.b':       '3 yrs 4 mos',
    'exp.amphan.stat.a':    '5-month internship',

    'exp.title':    'Work Experience',

    /* St.Herb */
    'exp.stherb.period':         'Apr 2025 – Present',
    'exp.stherb.web.title':      'Website Maintenance &amp; Development',
    'exp.stherb.web.desc':       '<p><strong>Responsibilities:</strong> Redesigned and rebuilt both company websites with fully custom themes written from scratch, alongside stability and security maintenance, traffic tracking, SEO work and the backup process</p><p><strong>Results:</strong> Both sites are live, each with its own visual identity and reading order designed around its own buyer. Stability and search visibility both improved.</p>',
    'exp.stherb.server.title':   'Server Maintenance &amp; Coordination',
    'exp.stherb.server.desc':    '<p><strong>Responsibilities:</strong> Coordinated and monitored server stability, resolved primary issues</p><p><strong>Results:</strong> Uninterrupted service and reduced system downtime</p>',
    'exp.stherb.crm.title':      'HerbCore CRM Development',
    'exp.stherb.crm.desc':       '<p><strong>Responsibilities:</strong> Building an in-house back-office CRM that consolidates orders from multiple WooCommerce shops into one place — scheduled order sync, a packing queue that deducts stock, net-revenue refund handling, DHL Express booking, marketing and inbound email, plus sales analytics, role permissions and an audit log</p><p><strong>Scope:</strong> 37 screens · 35 controllers · 13 API groups · 57 migrations · 4 scheduled background jobs</p><p><strong>Status:</strong> Roughly 70% complete — DHL booking has passed end-to-end sandbox testing and is waiting on production account approval</p>',

    /* Cloudmate */
    'exp.cm.period':        'Jan – Nov 2024',
    'exp.cm.tour.title':    'Tour Booking &amp; Management System',
    'exp.cm.tour.desc':     '<p><strong>Responsibilities:</strong> Developed a platform for managing and booking tours</p><p><strong>Results:</strong> Organized data management, reduced redundant work, faster operations</p>',
    'exp.cm.mm.title':      'Planning &amp; Supply Procurement System',
    'exp.cm.mm.desc':       '<p><strong>Responsibilities:</strong> Quarterly supply planning, approval workflow design and Excel data export</p><p><strong>Results:</strong> Clear budget control and easy audit trail</p>',
    'exp.cm.enc.title':     'Data Encryption for Banking Systems',
    'exp.cm.enc.desc':      '<p><strong>Responsibilities:</strong> Generated files from SAP and encrypted per bank requirements before sending via sFTP; retrieved payment result files from bank\'s sFTP, re-encrypted and recorded into SAP</p><p><strong>Results:</strong> Secure data transmission meeting bank security standards</p>',
    'exp.cm.adv.title':     'Advance &amp; Disbursement Payment System',
    'exp.cm.adv.desc':      '<p><strong>Responsibilities:</strong> Recorded advance payments, disbursed without advance references, approved per conditions and hierarchy, exported data to Excel</p><p><strong>Results:</strong> Transparent financial system with easy audit trail</p>',
    'exp.cm.data.title':    'Data Connection &amp; File Management System',
    'exp.cm.data.desc':     '<p><strong>Responsibilities:</strong> Retrieved data from external sources into the database or generated .txt files for SAP; used bat files for real-time data retrieval</p><p><strong>Results:</strong> Consistent inter-system data and reduced redundant manual work</p>',
    'exp.cm.auto.title':    'Automatic File Transfer System',
    'exp.cm.auto.desc':     '<p><strong>Responsibilities:</strong> Developed a program to transfer payment data to the bank via FTP, removed transferred files and encrypted files per bank requirements</p><p><strong>Results:</strong> Reduced manual steps and enhanced data transfer security</p>',
    'exp.cm.server.title':  'Server Maintenance &amp; Coordination',
    'exp.cm.server.desc':   '<p><strong>Responsibilities:</strong> Resolved primary server issues, purchased domain and connected via DNS, purchased SSL for HTTPS, configured server per software deployment requirements</p><p><strong>Results:</strong> Successful system deployment with secure HTTPS connection</p>',

    /* Nature Biotec */
    'exp.nat.period':       'Jul 2020 – Oct 2023',
    'exp.nat.ht.title':     'Healthy Together Website',
    'exp.nat.ht.desc':      '<p><strong>Responsibilities:</strong> Developed gift redemption/registration system, backend for customer data management, privilege management and redemption history</p><p><strong>Additional:</strong> Generated permanent QR Codes, developed Clean Edge product registration &amp; claiming forms with unique QR Codes per product code, developed Lucky Draw system for activity registration and management</p><p><strong>Results:</strong> Improved customer experience and faster team management</p>',
    'exp.nat.report.title': 'Data Report &amp; Dashboard',
    'exp.nat.report.desc':  '<p><strong>Responsibilities:</strong> Data cleansing, report generation and dashboard integration</p><p><strong>Results:</strong> Management gained quick data overview; marketing team communicated more precisely</p>',
    'exp.nat.wp.title':     'WordPress Website',
    'exp.nat.wp.desc':      '<p><strong>Responsibilities:</strong> Website design, domain registration, system configuration and security maintenance</p><p><strong>Results:</strong> Trustworthy, fast website with reduced vulnerability risks</p>',

    /* Amphan */
    'exp.amphan.period':      'Jun – Oct 2019',
    'exp.amphan.web.title':   'Website Development in R&amp;D',
    'exp.amphan.web.desc':    '<p><strong>Responsibilities:</strong> Internship in R&amp;D position, developing websites as assigned</p><p><strong>Results:</strong> Gained real-world web development experience in a corporate environment</p>',

    /* ---- Qualification ---- */
    'qual.subtitle':          'Education',
    'qual.title':             'Education',
    'qual.lower.title':       'Lower Secondary',
    'qual.lower.period':      'Grade 7 – 9',
    'qual.lower.school':      'Suankularb Wittayalai Nakhon Si Thammarat School',
    'qual.lower.meta':        '',
    'qual.upper.title':       'Upper Secondary',
    'qual.upper.period':      'April 2013 – December 2015',
    'qual.upper.school':      'Suankularb Wittayalai Nakhon Si Thammarat School',
    'qual.upper.meta':        'Science–Mathematics',
    'qual.bachelor.title':    "Bachelor's Degree",
    'qual.bachelor.period':   'August 2016 – March 2020',
    'qual.bachelor.school':   'Rajamangala University of Technology Thanyaburi',
    'qual.bachelor.meta':     'Information Technology<br>Faculty of Science and Technology',

    /* ---- Certifications ---- */
    'cert.subtitle':          'Certifications',
    'cert.desc':              'A collection of certifications with verification links for each item',
    'cert.backend.subtitle':  'REST API development and server-side systems',
    'cert.data.subtitle':     'Data Science and Data Engineering tracks',
    'cert.cloud.subtitle':    'Cloud fundamentals and infrastructure management',
    'cert.view':              'View Certificate',
    'cert.de.course':         'Data Engineer Track (5 Certificates)',
    'cert.de.cert1':          'Foundation for Data Engineer Career',
    'cert.de.cert2':          'Data Engineering Tools &amp; Infrastructure',
    'cert.de.cert3':          'Python, Pandas &amp; PySpark',
    'cert.de.cert4':          'ETL Pipeline with PySpark',
    'cert.de.cert5':          'Serverless Data Lakes with AWS',

    /* ---- Company names ---- */
    'company.stherb':   'ST. Herb Cosmetics International Co., Ltd.',
    'company.cm':       'Cloudmate Co., Ltd.',
    'company.nat':      'Nature Biotec Co., Ltd.',
    'company.amphan':   'Amphan Technology Co., Ltd.',

    /* ---- Footer ---- */
    'footer.brand.desc':     'Full Stack Developer (PHP/Laravel)<br>Enterprise systems · Integration · Automation',
    'footer.nav.title':      'Navigation',
    'footer.nav.home':       'Home',
    'footer.nav.about':      'About',
    'footer.nav.skills':     'Skills',
    'footer.nav.experience': 'Experience',
    'footer.nav.cert':       'Certifications',
    'footer.nav.contact':    'Contact',
    'footer.contact.title':  'Contact Info',
    'footer.address':        'Mueang Pathum Thani, Pathum Thani<br>(Open to Bangkok metro area / Remote)',
    'footer.download':       'Download Resume (PDF)',
    'footer.location':       'Full Stack Developer · Pathum Thani, Thailand',




    /* ---- Contact form / CTA ---- */
    'contact.cta.text': 'Send over the role details or any question by email — every message gets a reply.',
    'contact.cta.btn':  'Email me',
    'form.name':    'Your name',
    'form.email':   'Email to reply to',
    'form.message': 'Message',
    'form.submit':  '<i class="ri-send-plane-line"></i> Send message',
    'form.sending': 'Sending...',
    'form.ok':      'Message sent — thank you. I will get back to you shortly.',
    'form.fail':    'Could not send. Please try again, or email <a href="mailto:overlag02@gmail.com">overlag02@gmail.com</a> directly.',

    /* ---- Work / Case studies ---- */
    'work.subtitle': 'Selected work',
    'work.title':    'Case studies',
    'work.intro':    'Five systems that best represent the work I do — each one framed as the problem, what I built, and the outcome.',
    'work.note':     'Note: the visuals are architecture diagrams drawn for this page, not screenshots of the live systems, as every one of them is an internal company tool.',
    'label.problem': 'Problem',
    'label.doing':   'What I built',
    'label.result':  'Outcome',

    'work.crm.tag':     'St.Herb · 2026',
    'work.crm.badge':   'In progress · ~70%',
    'work.crm.name':    'HerbCore CRM — multi-shop order consolidation, from checkout to delivery',
    'work.crm.alt':     'Architecture diagram of HerbCore CRM, from multi-shop order sync through to delivery',
    'work.crm.problem': 'The business sells through several WooCommerce shops at once, so orders, customers and stock all lived in separate back offices and had to be copied together by hand every day. Reported sales also excluded refunds, so the numbers used for decisions never matched the money actually received.',
    'work.crm.doing':   'Built the whole system myself in PHP 8.2 and PostgreSQL on Docker — 37 screens, 35 controllers, 13 API groups, 57 migrations and 4 scheduled background jobs. Orders sync from every shop through the WooCommerce REST API on their own cycle, feed a packing queue that deducts stock, and connect to the DHL Express API for live rates, shipment creation and storing labels and tracking numbers against the order — alongside marketing email, an inbound mail inbox, role permissions and sales analytics.',
    'work.crm.result':  'Orders from every shop arrive on their own with no manual copying, warehouse staff work from a single queue whose status cannot be overwritten by a sync, and refunds are kept as separate records deducted automatically everywhere — so every figure in the system is a net figure without editing past orders.',
    'work.crm.status':  'In active development, roughly 70% complete. DHL booking has passed its test suite and end-to-end sandbox testing, and goes live once the production account is approved.',

    'work.sap.tag':     'Cloudmate · 2024',
    'work.sap.name':    'SAP integration and encrypted bank file transfer',
    'work.sap.alt':     'Architecture diagram of the SAP to bank file transfer pipeline',
    'work.sap.problem': 'Payment data had to reach the bank on a fixed cycle: export from SAP, encrypt to the bank’s specification, then send over sFTP. Every step was manual, slow and easy to get wrong.',
    'work.sap.doing':   'Built a Python job that pulls data from SAP, generates files in the bank’s required format, encrypts them to standard, transfers over sFTP and clears sent files — plus a return path that decrypts the bank’s payment result files and posts them back into SAP.',
    'work.sap.result':  'Transfers meet the bank’s security requirements, manual steps are largely gone, and both systems stay in sync without manual reconciliation.',

    'work.adv.tag':     'Cloudmate · 2024',
    'work.adv.name':    'Advance and disbursement system',
    'work.adv.alt':     'Architecture diagram of the advance and disbursement system',
    'work.adv.problem': 'Disbursement ran through several different routes — with and without a linked advance — each with its own approver order and conditions, and all of it had to stay auditable.',
    'work.adv.doing':   'Built the recording flow for advances and disbursements, designed an approval process where conditions and approver order are configurable, and added Excel export for the finance team.',
    'work.adv.result':  'Every transaction carries a complete approval trail, past records are easy to audit, and finance can pull the data straight into their own workflow.',

    'work.mm.tag':     'Cloudmate · 2024',
    'work.mm.name':    'Quarterly supply planning and procurement',
    'work.mm.alt':     'Architecture diagram of the quarterly supply planning system',
    'work.mm.problem': 'Supply requests were spread across departments with no single view of what each quarter had planned versus actually drawn, which made budget control difficult.',
    'work.mm.doing':   'Built quarterly supply planning with a purchase request and approval flow, per-item status tracking, request history and Excel export.',
    'work.mm.result':  'A full-year view of supply usage, clearer budget control, and noticeably less repeated paperwork.',

    'work.ht.tag':     'Nature Biotec · 2020–2023',
    'work.ht.name':    'Healthy Together — loyalty and reward platform',
    'work.ht.alt':     'Architecture diagram of the Healthy Together loyalty platform',
    'work.ht.problem': 'The business needed customers to register products and collect codes toward rewards, a back office the marketing team could run themselves, and reporting management could actually read.',
    'work.ht.doing':   'Built both ends: registration forms, per-product-code QR generation, point collection and reward redemption, a lucky draw engine, plus data cleansing in Pandas and dashboards in Looker Studio.',
    'work.ht.result':  'Marketing runs campaigns without waiting on the dev team, and management sees registration and redemption activity at a glance from the dashboard.',

    'nav.work':      'Work',

    /* ---- FAQ ---- */
    'faq.subtitle':    'FAQ',
    'faq.title':       'What recruiters usually ask',
    'faq.work.q':      'What kind of work do you take on?',
    'faq.work.a':      'Full-time roles as a Full Stack Developer, Programmer or Web Developer, plus freelance work covering web applications, REST APIs, enterprise back-office systems and automation that connects data between systems.',
    'faq.stack.q':     'Which tech stack do you work with?',
    'faq.stack.a':     'Mainly PHP and Laravel with PostgreSQL, MySQL and SQL Server. On the front end, JavaScript, AJAX, HTML/CSS and Bootstrap. For automation and data work, Python with Pandas.',
    'faq.location.q':  'Do you work remotely or onsite?',
    'faq.location.a':  'Based in Mueang Pathum Thani, Pathum Thani. Available for onsite work across Bangkok and the surrounding metropolitan area, and equally comfortable working remote or hybrid.',
    'faq.experience.q':'How many years of experience do you have?',
    'faq.experience.a':'Six years across three companies. Past work includes a loyalty and reward redemption platform, a tour booking and management system, disbursement and procurement systems, SAP data integration, and encrypted bank file transfers over sFTP.',
    'faq.start.q':     'How do I get in touch?',
    'faq.start.a':     'Email overlag02@gmail.com or call +66 64-661-3238. The full resume can be downloaded from the button on this page. Start date is open to discussion depending on the role.',

    /* ---- Image alt / title ---- */
    'alt.portrait':    'Jaruwat Amnuaysat — Full Stack Developer (PHP/Laravel)',

    /* ---- Contact ---- */
    'contact.subtitle':       'Contact',
    'contact.title':          'Get In Touch',
    'contact.desc':           'Always open for Freelance work and new opportunities',
    'contact.phone.label':    'Phone',
    'contact.email.label':    'Email',
    'contact.location.label': 'Location',
    'contact.location.value': 'Pathum Thani · Open to Remote',
    'contact.social.label':   'Follow Me On',

    /* ---- Redesigned sites (inside the website maintenance task) ---- */
    'site.block.title':  'Sites redesigned (fully custom themes)',
    'site.visit':        'Visit the site',
    'site.note':         'Both sites run on WordPress but use entirely separate themes written from scratch — not a stock theme recoloured. The type systems, palettes, header architectures and section vocabularies have nothing in common.',

    'site.stherb.tag':   'D2C skincare store · English / 中文',
    'site.stherb.desc':  'A herbal skincare brand selling direct to consumers worldwide. The problem: give a first-time visitor enough confidence to buy within a single page.',
    'site.stherb.p1':    'Cormorant for headings paired with Mulish for body copy on a cream ground — an editorial beauty tone that separates heading from body text on its own, without extra rules or boxes.',
    'site.stherb.p2':    'The hero completes its reading order in one screen: category label → headline → supporting copy → primary/secondary buttons, with a 4.9-from-12,400-reviews card floating above the fold, so the credibility evidence reaches the eye before any scrolling.',
    'site.stherb.p3':    'A four-point reassurance bar (secure payment · easy returns · 24/7 support · worldwide shipping) sits between the hero and the product row, answering the hesitations before the buy button rather than after it.',
    'site.stherb.p4':    'Products is a mega menu split into Women / Men with sub-categories, so a shopper picks a line straight from the nav instead of landing on a catch-all listing first. Each product card reads complete on its own: category → name → stars and review count → price → full-width button.',
    'site.stherb.p5':    '14 of 25 images are WebP with srcset and lazy loading; no horizontal scroll at 390px; two languages wired up through hreflang.',

    'site.emperor.tag':  'Botanical extracts for export · English',
    'site.emperor.desc': 'Botanical extracts aimed at export markets. The reader is a buyer looking for a supplier, not a consumer buying one jar — so the visual language had to differ from Stherb from top to bottom.',
    'site.emperor.p1':   'Deep forest green and gold with Playfair Display and Nunito Sans, a centred logo and navigation split left and right — the vocabulary of a premium supplier, and a completely different personality from Stherb despite sharing the same WordPress platform.',
    'site.emperor.p2':   'The hero leads with the numbers a B2B buyer actually screens on: 70+ botanical products · 32 export markets · 10+ years of experience.',
    'site.emperor.p3':   'A single primary CTA, "Shop the Catalog", rather than the two Stherb uses — this buyer arrives with one goal, so a competing option would only split attention.',
    'site.emperor.p4':   'Products are grouped by five health goals instead of listed by name, and the brand promises are written as No.1–No.3 with icons rather than a long paragraph.',

    /* ---- Accessible names for icon-only controls ---- */
    'aria.menu.open':   'Open menu',
    'aria.menu.close':  'Close menu',
    'aria.backtotop':   'Back to top',
  }
};

/* ============================================================
   Core functions
   ============================================================ */

window.applyLanguage = function (lang) {
  const dict = window.cvI18n[lang];
  if (!dict) return;

  /* Apply all data-i18n elements */
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  /* Handle age suffix separately */
  const ageEl = document.getElementById('age');
  if (ageEl && ageEl.dataset.birthdate) {
    const birth = new Date(ageEl.dataset.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    ageEl.textContent = age + (dict['about.bio.age.suffix'] || ' ปี');
  }

  /* Update <html lang="..."> */
  document.documentElement.setAttribute('lang', lang);

  /* Update toggle button label */
  document.querySelectorAll('.cv-lang-btn').forEach(function (btn) {
    const labelSpan = btn.querySelector('span');
    const label = lang === 'th' ? 'EN' : 'TH';
    if (labelSpan) labelSpan.textContent = label; else btn.textContent = label;
    btn.setAttribute('aria-label', lang === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย');
  });

  localStorage.setItem('cv-lang', lang);
  window._cvLang = lang;
};

window.toggleLang = function () {
  const current = window._cvLang || localStorage.getItem('cv-lang') || 'th';
  window.applyLanguage(current === 'th' ? 'en' : 'th');
};

window.initI18n = function () {
  // ถ้าเคยเลือกภาษาไว้แล้ว ใช้ค่านั้น
  const saved = localStorage.getItem('cv-lang');
  if (saved) {
    window.applyLanguage(saved);
    return;
  }
  // ตรวจภาษาของเครื่อง/browser — ถ้าไม่ใช่ไทย ให้แสดงอังกฤษ
  const browserLang = (navigator.language || navigator.userLanguage || 'th').toLowerCase();
  const lang = browserLang.startsWith('th') ? 'th' : 'en';
  window.applyLanguage(lang);
};
