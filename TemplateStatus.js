function applySystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// Sayfa yüklendiğinde sistem temasını uygula
applySystemTheme();

// Sistem teması değişirse dinle
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (e.matches) {
    document.documentElement.classList.add('dark'); 
  } else {
    document.documentElement.classList.remove('dark'); 
  }
});