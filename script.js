document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("darkModeToggle");
  button.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
});