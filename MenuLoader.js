document.addEventListener("DOMContentLoaded", () => {

  loadMenu("Footer", "Footer.html");
    loadMenu("Header", "Header.html", () => {
    initHeaderShrink();
  });

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

    const base = progress; // artık 0 → 1 arası

    // Daha yumuşak değerler
    const x1 = base * 0;
    const r1 = base * 0;

    const x2 = base * 50;
    const r2 = base * 20;

    const x3 = base * 80;
    const r3 = base * 28;

    phone1.style.setProperty("--x", `${x1}px`);
    phone1.style.setProperty("--r", `${r1}deg`);

    phone2.style.setProperty("--x", `${x2}px`);
    phone2.style.setProperty("--r", `${r2}deg`);

    phone3.style.setProperty("--x", `${x3}px`);
    phone3.style.setProperty("--r", `${r3}deg`);

  });

}


let lastScroll = 0;

function initHeaderShrink() {

  const header = document.querySelector("header");
  if (!header) return;

  window.addEventListener("scroll", () => {

    const current = window.scrollY;

    if (current > 80) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }

    // Yukarı çıkınca biraz aç
    if (current < lastScroll) {
      header.classList.remove("shrink");
    }

    lastScroll = current;
  });
}