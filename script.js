const toggle = document.getElementById("darkModeToggle");
const prefersDark = localStorage.getItem("dark-mode") === "true";

if (prefersDark) {
  document.body.classList.add("dark");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("dark-mode", isDark);

  // Force repaint to fix visual glitch in mobile
  void document.body.offsetWidth;
});

const buttons = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll(".project-card");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    projects.forEach(project => {
      const show = filter === "all" || project.classList.contains(filter);
      project.style.display = show ? "block" : "none";
      project.style.opacity = show ? "1" : "0";
      project.style.pointerEvents = show ? "auto" : "none";
      project.style.transition = "opacity 0.3s ease";
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const defaultLang = "en"; // fallback language
  const langButtons = document.querySelectorAll(".lang-btn");

  // Apply language to the page
  function setLanguage(lang) {
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("preferredLang", lang);
    // TODO: Optional: Trigger actual translation logic here
    console.log("Language set to:", lang);
  }

  // Detect or load saved language
  function initLanguage() {
    const storedLang = localStorage.getItem("preferredLang");
    if (storedLang) {
      setLanguage(storedLang);
    } else {
      const browserLang = navigator.language.slice(0, 2); // "es" or "en"
      const supported = ["en", "es"];
      setLanguage(supported.includes(browserLang) ? browserLang : defaultLang);
    }
  }

  // Event listeners for flag buttons
  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
      // TODO: Also reload text elements if needed
    });
  });

  initLanguage();
});
