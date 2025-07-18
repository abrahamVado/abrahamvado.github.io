document.addEventListener("DOMContentLoaded", () => {
  const darkBtn = document.getElementById("darkModeToggle");
  const projectContainer = document.getElementById("projectContainer");

  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  fetch("https://api.github.com/users/abrahamvado/repos")
    .then(res => res.json())
    .then(data => {
      data.forEach(repo => {
        const techs = repo.topics?.join(" ") || "General";
        const div = document.createElement("div");
        div.className = "project card " + techs;
        div.setAttribute("data-tags", techs);
        div.innerHTML = `
          <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
          <p>${repo.description || "No description provided."}</p>
        `;
        projectContainer.appendChild(div);
      });
    });

  const buttons = document.querySelectorAll("[data-filter]");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      document.querySelectorAll(".project").forEach(card => {
        if (filter === "all" || card.getAttribute("data-tags").includes(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});