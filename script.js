const toggle = document.getElementById("darkModeToggle");
const langButtons = document.querySelectorAll(".lang-btn");
const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card");
const supportedLangs = ["en", "es"];
const defaultLang = "en";

// === DARK MODE ===
if (localStorage.getItem("dark-mode") === "true") {
  document.body.classList.add("dark");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("dark-mode", isDark);
  void document.body.offsetWidth; // repaint fix
});

// === PROJECT FILTERING ===
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    projectCards.forEach(project => {
      const show = filter === "all" || project.classList.contains(filter);
      project.style.display = show ? "block" : "none";
      project.style.opacity = show ? "1" : "0";
      project.style.pointerEvents = show ? "auto" : "none";
      project.style.transition = "opacity 0.3s ease";
    });
  });
});

// === LANGUAGE SWITCHING ===
function setLanguage(lang) {
  if (!supportedLangs.includes(lang)) lang = defaultLang;

  localStorage.setItem("language", lang);
  document.documentElement.setAttribute("lang", lang);
  translatePage(lang);
  highlightActiveLang(lang);
}

function translatePage(lang) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.classList.add("fade-out");
      setTimeout(() => {
        el.innerHTML = translations[lang][key];
        el.classList.remove("fade-out");
      }, 150);
    }
  });
}

function highlightActiveLang(lang) {
  langButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || navigator.language.slice(0, 2);
  const initialLang = supportedLangs.includes(savedLang) ? savedLang : defaultLang;
  setLanguage(initialLang);

  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.getAttribute("data-lang");
      setLanguage(selectedLang);
    });
  });
});
  