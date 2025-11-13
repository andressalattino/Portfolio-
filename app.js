// Animación typewriter 
if (document.getElementById("subtitulo-index")) {
  const texto =
    "FrontEnd Developer, creating responsive and easy-to-use web interfaces with attention to detail🚀";
  const subtitulo = document.getElementById("subtitulo-index");
  let i = 0;

  function typeWriter() {
    if (i < texto.length) {
      subtitulo.textContent += texto.charAt(i);
      i++;
      setTimeout(typeWriter, 70);
    }
  }
  window.onload = typeWriter;
}

// --- Cambiar tema ---
const iconoTema = document.getElementById("icono-tema");
const html = document.documentElement;

iconoTema.addEventListener("click", () => {
  html.classList.toggle("dark");

  if (html.classList.contains("dark")) {
    localStorage.setItem("tema", "dark");
  } else {
    localStorage.setItem("tema", "light");
  }
  actualizarIcono();
});

if (localStorage.getItem("tema") === "dark") {
  html.classList.add("dark");
}
actualizarIcono();

function actualizarIcono() {
  if (!iconoTema) return;
  const useTag = iconoTema.querySelector("use");
  if (html.classList.contains("dark")) {
    useTag.setAttribute("href", "assets/sprites.svg#moon");
  } else {
    useTag.setAttribute("href", "assets/sprites.svg#sun");
  }
}

// --- Menú desplegable ---
const menuBtn = document.getElementById("btn-nav");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// --- Carrusel ---
if (document.getElementById("carousel")) {
  const carousel = document.querySelector("#carousel > div");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const totalSlides = carousel.children.length;
  let index = 0;

  function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % totalSlides;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });
}
// --- Carrusel 
if (document.getElementById("skills-carousel")) {
  const carousel = document.getElementById("skills-carousel");
  const slides = carousel.children;
  const totalSlides = slides.length;
  let index = 0;

  function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  setInterval(() => {
    index = (index + 1) % totalSlides;
    updateCarousel();
  }, 3000);
}

