window.addEventListener("load", function () {
  const ageEl = document.getElementById("age");
  if (ageEl && ageEl.dataset.birthdate) {
    const birthDate = new Date(ageEl.dataset.birthdate);
    if (!isNaN(birthDate.getTime())) {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      ageEl.textContent = age + " ปี";
    } else {
      console.error("Invalid birthdate format:", ageEl.dataset.birthdate);
    }
  } else {
    console.warn(
      "No element with id 'age' or no data-birthdate attribute found"
    );
  }
});å
