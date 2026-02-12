document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("UpMenu");

    if (!container) return;

    try {

        const res = await fetch("UpMenu.html");
        const html = await res.text();

        container.innerHTML = html;

        // Menü geldikten sonra başlat
        initAdminMenu();

    } catch (err) {

        console.error("Menü yüklenemedi:", err);

    }

});