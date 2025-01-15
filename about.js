document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isOpen);
    hamburger.querySelectorAll(".line").forEach((line, index) => {
      if (isOpen) {
        if (index === 0) line.style.transform = "rotate(45deg)";
        if (index === 1) line.style.opacity = "0";
        if (index === 2) line.style.transform = "rotate(-45deg)";
      } else {
        line.style.transform = "none";
        line.style.opacity = "1";
      }
    });
  });

  const links = document.querySelectorAll(".nav-link");
  const currentUrl = window.location.pathname;

  links.forEach((link) => {
    if (link.getAttribute("href") === currentUrl) {
      link.classList.add("isactive");
    }
  });
});
