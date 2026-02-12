document.addEventListener("DOMContentLoaded", () => {
  loadMenu("Footer", "Footer.html");
  loadMenu("Header", "Header.html");
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