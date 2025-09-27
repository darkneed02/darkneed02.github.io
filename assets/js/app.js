// ฟังก์ชันเพื่อโหลดไฟล์ HTML
function loadHTML(id, file) {
  fetch(file)
    .then((res) => res.text())
    .then((data) => (document.getElementById(id).innerHTML = data))
    .catch((err) => console.error(`ไม่สามารถโหลด ${file}`, err));
}

// =======================
// โหลดส่วน header
// =======================
loadHTML("preloader", "component/header/preloader.html");   // เรียกใช้ preloader.html
loadHTML("header", "component/header/header.html");         // เรียกใช้ header.html
loadHTML("offcanvas", "component/header/offcanvas.html");   // เรียกใช้ offcanvas.html

// =======================
// โหลดส่วน body
// =======================
loadHTML("banner", "component/body/banner.html");           // เรียกใช้ banner.html
loadHTML("about", "component/body/about.html");             // เรียกใช้ about.html
loadHTML("qualification", "component/body/qualification.html"); // เรียกใช้ qualification.html
loadHTML("skill", "component/body/skill.html");             // เรียกใช้ skill.html
loadHTML("experience", "component/body/experience.html");   // เรียกใช้ experience.html
loadHTML("slide-area", "component/body/slide-area.html");   // เรียกใช้ slide-area.html
loadHTML("portfolio", "component/body/portfolio.html");     // เรียกใช้ portfolio.html
loadHTML("contact", "component/body/contact.html");         // เรียกใช้ contact.html

// =======================
// โหลดส่วน footer
// =======================
loadHTML("footer-area", "component/footer/footer-area.html"); // เรียกใช้ footer-area.html
loadHTML("backto-top", "component/footer/backtotop.html");   // เรียกใช้ backto-top.html