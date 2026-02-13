document.addEventListener("DOMContentLoaded", () => {

  loadMenu("Footer", "Footer.html");
  loadMenu("Header", "Header.html");

  // MobileApp yüklenince animasyonu başlat
  loadMenu("MobileAppPage", "MobileAppPage.html", () => {
    initPhonesScroll();
  });

});


async function loadMenu(containerId, file, callback) {

  const container = document.getElementById(containerId);
  if (!container) return;

  try {

    const res = await fetch(file);
    const html = await res.text();

    container.innerHTML = html;

    if (callback) callback();

  } catch (err) {
    console.error(file + " yüklenemedi:", err);
  }

}



/* Scroll animasyonu */
function initPhonesScroll() {

  const section = document.querySelector(".phones-section");
  const phone1 = document.querySelector(".phone-1");
  const phone2 = document.querySelector(".phone-2");
  const phone3 = document.querySelector(".phone-3");

  if (!section || !phone1 || !phone2 || !phone3) {
    console.log("Telefonlar bulunamadı");
    return;
  }

  window.addEventListener("scroll", () => {

    const rect = section.getBoundingClientRect();
    const win = window.innerHeight;

    let progress = 1 - (rect.bottom / (win + rect.height));

    progress = Math.min(Math.max(progress, 0), 1);


    const base = progress * 1.2; // genel hız

const x2 = base * 80;
const r2 = base * 20;

const x3 = base * 140;
const r3 = base * 35;

    phone2.style.transform =
      `translate(-50%, -50%) translateX(${x2}px) rotate(${r2}deg)`;

    phone3.style.transform =
      `translate(-50%, -50%) translateX(${x3}px) rotate(${r3}deg)`;

  });

}