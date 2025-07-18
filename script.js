document.addEventListener("DOMContentLoaded", () => {
  const darkBtn = document.getElementById("darkModeToggle");
  const typingText = document.getElementById("typing-text");
  const titles = [
    "Full-Stack Developer",
    "Laravel Enthusiast",
    "WordPress Wizard",
    "Electron Tinkerer",
    "ReactJS Explorer"
  ];
  let titleIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < titles[titleIndex].length) {
      typingText.textContent += titles[titleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 80);
    } else {
      setTimeout(erase, 1500);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typingText.textContent = titles[titleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 40);
    } else {
      titleIndex = (titleIndex + 1) % titles.length;
      setTimeout(type, 500);
    }
  }

  type();

  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
});