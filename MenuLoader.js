document.addEventListener("DOMContentLoaded", () => {

  loadMenu("Footer", "Footer.html");
  loadMenu("whatsapp", "wpbtn.html");
  loadMenu("Help", "Help.html");

    loadMenu("Header", "Header.html", () => {
    initHeaderShrink();
    setActiveNav();
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


function setActiveNav() {

    let currentPage = window.location.pathname.split("/").pop();

    // URL encode sorununu çöz
    currentPage = decodeURIComponent(currentPage).toLowerCase();

    document.querySelectorAll("nav a.nav-link").forEach(link => {

        const linkPage = link
            .getAttribute("href")
            ?.split("/")
            .pop()
            ?.toLowerCase();

        link.classList.remove("active-link");

        if (linkPage === currentPage) {
            link.classList.add("active-link");
        }

    });
}

document.addEventListener("DOMContentLoaded", setActiveNav);


function initHeaderShrink() {

  const header = document.querySelector("header");
  if (!header) return;

  window.addEventListener("scroll", () => {

    const current = window.scrollY;

    // Sadece en üstteyken açık olsun
    if (current <= 10) {
      header.classList.remove("shrink");
    } else {
      header.classList.add("shrink");
    }

  });
}



// WhatsApp Chat Butonu İşlevselliği

function getChatTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return hours + ":" + minutes;
}

// 2. Pencereyi Aç/Kapat ve Animasyonu Başlat
function toggleWPChat() {
        var box = document.getElementById('wp-chat-box') || document.querySelector('.wp-chat-container');
    var typing = document.getElementById('typing-indicator');
    var message = document.getElementById('real-message');
    var timeElement = document.getElementById('wp-current-time');

        
        if (!box || !typing || !message) {
        console.log('Eksik element:', { box, typing, message }); 

        return;
    }

    var isOpen = box.classList.contains('wp-open');

    if (!isOpen) {
        box.classList.add('wp-open');

        if (timeElement) timeElement.innerText = getChatTime();

        // Reset — her açılışta animasyonu baştan başlat
        typing.classList.remove('wp-hidden');
        message.classList.add('wp-hidden');

        setTimeout(function () {
            typing.classList.add('wp-hidden');
            message.classList.remove('wp-hidden');
            const inputField = document.getElementById('wp-msg-input');
            if (inputField) inputField.focus();
        }, 1500);

    } else {
        box.classList.remove('wp-open');
    }
}

// 3. WhatsApp'a Mesaj Gönder
function sendToWP() {
    var input = document.getElementById('wp-msg-input');
    var phone = "5464874290";
    
    if (input && input.value.trim() !== "") {
        var url = "https://api.whatsapp.com/send?phone=" + phone + "&text=" + encodeURIComponent(input.value);
        window.open(url, '_blank');
        input.value = ""; // Gönderdikten sonra temizle
    }
}

// 4. Enter Tuşu Kontrolü
function handleEnter(e) {
    if (e.key === 'Enter') {
        sendToWP();
    }
}


