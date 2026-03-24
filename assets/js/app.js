// โหลด HTML component และ return Promise
function loadHTML(id, file) {
  return fetch(file)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    })
    .catch((err) => console.error(`ไม่สามารถโหลด ${file}`, err));
}

// โหลดทุก component พร้อมกัน (parallel) แล้วรอให้ครบก่อน init
Promise.all([
  loadHTML("preloader",   "component/header/preloader.html"),
  loadHTML("header",      "component/header/header.html"),
  loadHTML("offcanvas",   "component/header/offcanvas.html"),
  loadHTML("banner",      "component/body/banner.html"),
  loadHTML("about",       "component/body/about.html"),
  loadHTML("qualification","component/body/qualification.html"),
  loadHTML("skill",       "component/body/skill.html"),
  loadHTML("experience",  "component/body/experience.html"),
  loadHTML("slide-area",  "component/body/slide-area.html"),
  loadHTML("portfolio",   "component/body/portfolio.html"),
  loadHTML("contact",     "component/body/contact.html"),
  loadHTML("footer-area", "component/footer/footer-area.html"),
  loadHTML("backto-top",  "component/footer/backtotop.html"),
]).then(() => {
  // --- คำนวณอายุ (script ใน innerHTML จะไม่ run จึงทำที่นี่) ---
  const ageEl = document.getElementById("age");
  if (ageEl && ageEl.dataset.birthdate) {
    const birthDate = new Date(ageEl.dataset.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    ageEl.textContent = age + " ปี";
  }

  // --- Re-init data-background (ต้องทำหลัง HTML inject) ---
  if (typeof jQuery !== "undefined") {
    jQuery("[data-background]").each(function () {
      jQuery(this).css(
        "background-image",
        "url(" + jQuery(this).attr("data-background") + ")"
      );
    });
  }

  // --- Re-init WOW animations ---
  if (typeof WOW !== "undefined") {
    new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: false,
      live: true,
    }).init();
  }

  // --- Re-init jarallax ---
  if (typeof jarallax !== "undefined") {
    jarallax(document.querySelectorAll(".jarallax"), { speed: 0.4 });
  }

  // --- ซ่อน preloader หลัง content พร้อม ---
  if (typeof jQuery !== "undefined") {
    jQuery("#pre-load").delay(400).fadeOut(400);
    jQuery(".pre-loader").delay(400).fadeOut(400);
  }

  // --- Dispatch event เพื่อให้ส่วนอื่น subscribe ได้ ---
  document.dispatchEvent(new Event("componentsLoaded"));
});
