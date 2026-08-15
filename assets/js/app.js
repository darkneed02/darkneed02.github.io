/* ============================================================
   app.js — init หลังหน้าเว็บพร้อม

   เดิมไฟล์นี้โหลด component ทุกตัวด้วย fetch().innerHTML
   ตอนนี้เนื้อหาถูก build เป็น static HTML แล้ว (ดู build.js)
   จึงเหลือแค่ส่วน init ที่ต้องรันหลัง DOM พร้อม

   สำคัญ: ต้อง dispatch "componentsLoaded" ที่ DOMContentLoaded
   ไม่ใช่ตอนไฟล์นี้รัน — เพราะ main.js (โหลดทีหลัง) ผูก listener
   ของ event นี้ไว้ ถ้ายิงเร็วเกินไป โค้ด ~130 บรรทัดใน main.js
   จะไม่ทำงานโดยไม่มี error ขึ้นเลย
   script ทุกตัวเป็น defer จึงรันเสร็จครบก่อน DOMContentLoaded
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  // --- คำนวณอายุ ---
  const ageEl = document.getElementById("age");
  if (ageEl && ageEl.dataset.birthdate) {
    const birthDate = new Date(ageEl.dataset.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    ageEl.textContent = age + (ageEl.dataset.ageSuffix || " ปี");
  }

  // --- data-background ---
  if (typeof jQuery !== "undefined") {
    jQuery("[data-background]").each(function () {
      jQuery(this).css(
        "background-image",
        "url(" + jQuery(this).attr("data-background") + ")"
      );
    });
  }

  // --- WOW animations ---
  if (typeof WOW !== "undefined") {
    new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: false,
      live: true,
    }).init();
  }

  // --- jarallax ---
  if (typeof jarallax !== "undefined") {
    jarallax(document.querySelectorAll(".jarallax"), { speed: 0.4 });
  }

  // --- ซ่อน preloader ---
  if (typeof jQuery !== "undefined") {
    jQuery("#pre-load").delay(400).fadeOut(400);
    jQuery(".pre-loader").delay(400).fadeOut(400);
  }

  // --- Dispatch event เพื่อให้ main.js init ส่วนที่ต้องการ DOM ---
  document.dispatchEvent(new Event("componentsLoaded"));

  // --- ตั้งชื่อให้ปุ่มเมนูมือถือที่ปลั๊กอินสร้างขึ้น ---
  // meanmenu สร้าง <a class="meanmenu-reveal"> ที่มีแต่ขีดสามขีด ไม่มีข้อความ
  // screen reader จึงอ่านได้แค่ "ลิงก์" ปลั๊กอินไม่มีออปชันให้ตั้งชื่อ
  // ต้องเติมเองหลัง init (listener ของ componentsLoaded รันจบแล้วตรงนี้)
  document.querySelectorAll(".meanmenu-reveal").forEach(function (el) {
    if (!el.getAttribute("aria-label")) {
      el.setAttribute("aria-label", document.documentElement.lang === "en" ? "Open menu" : "เปิดเมนู");
    }
  });
});
