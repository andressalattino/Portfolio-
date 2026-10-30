import { translations } from "./translations.js";

let step = 0;
let initialized = false;
let advancing = false;
let currentImage;
let nextImage;
let movement;

export function isIshaRevealed() {
  return step === 4;
}

function characterImage(index) {
  const image = new Image();
  const revealed = index === 4;
  image.src = `assets/arcane/${revealed ? "isha-jinx" : `isha-${index + 1}`}.webp`;
  image.alt = "";
  image.width = revealed ? 640 : 320;
  image.height = revealed ? 960 : 426;
  image.className = revealed ? "isha-reveal" : "isha-play-image";
  image.decoding = "async";
  return image;
}

function setMessage(element, key, attribute = null) {
  const messages = translations[document.documentElement.lang] || translations.en;
  element.setAttribute(attribute ? "data-i18n-aria" : "data-i18n", key);
  if (attribute) element.setAttribute(attribute, messages[key]);
  else element.textContent = messages[key];
}

function positionCharacter(animate = false) {
  const button = document.getElementById("isha-play");
  if (!button || button.hidden) return;
  const hero = document.getElementById("main-content").getBoundingClientRect();
  const scene = document.getElementById("hero-scene").getBoundingClientRect();
  const before = button.getBoundingClientRect();
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const right = step === 0 || step === 1;
  const top = step === 0 || step === 3;
  const left = scene.left - hero.left + 12;
  let x = right ? scene.right - hero.left - before.width : left;
  if (step === 1) {
    const weapon = document.querySelector("#hero-scene .jinx-weapon").getBoundingClientRect();
    x = Math.max(left, Math.min(x, weapon.left - hero.left - before.width - 16));
  }
  const y = top
    ? Math.max(8, scene.top - hero.top - (mobile ? 0 : 48))
    : scene.bottom - hero.top - before.height;

  movement?.cancel();
  button.style.left = `${Math.round(x)}px`;
  button.style.top = `${Math.round(y)}px`;

  if (animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const after = button.getBoundingClientRect();
    movement = button.animate(
      [
        { transform: `translate(${before.left - after.left}px, ${before.top - after.top}px)` },
        { transform: "translate(0, 0)" },
      ],
      { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
    return movement.finished.catch(() => {});
  }
}

async function advance() {
  const button = document.getElementById("isha-play");
  if (advancing || button.hidden || isIshaRevealed()) return;
  advancing = true;
  button.setAttribute("aria-busy", "true");
  const incoming = nextImage;
  const status = document.getElementById("isha-status");

  try {
    await incoming.decode();
    if (!document.documentElement.classList.contains("dark")) return;
    step++;
    currentImage = incoming;
    status.removeAttribute("data-i18n");
    status.textContent = "";

    if (isIshaRevealed()) {
      const fixture = document.querySelector("#hero-scene .last-drop-fixture");
      fixture.classList.add("last-drop-fixture--revealed");
      fixture.replaceChildren(currentImage);
      button.hidden = true;
      setMessage(status, "home.isha.found");
      document.getElementById("hero-title").focus({ preventScroll: true });
    } else {
      button.querySelector("img").replaceWith(currentImage);
      button.querySelector(".isha-play-hint").hidden = true;
      setMessage(button, `home.isha.step${step + 1}`, "aria-label");
      nextImage = characterImage(step + 1);
      await positionCharacter(true);
    }
  } catch {
    setMessage(status, "home.isha.retry");
    nextImage = characterImage(step + 1);
  } finally {
    advancing = false;
    button.removeAttribute("aria-busy");
  }
}

export function renderIshaInteraction(dark) {
  const button = document.getElementById("isha-play");
  if (!button) return;
  button.hidden = !dark || isIshaRevealed();

  if (!initialized) {
    button.addEventListener("click", advance);
    const observer = new ResizeObserver(() => positionCharacter());
    observer.observe(document.getElementById("main-content"));
    observer.observe(document.getElementById("hero-scene"));
    initialized = true;
  }

  if (button.hidden) return;
  currentImage ??= characterImage(step);
  nextImage ??= characterImage(step + 1);
  button.querySelector("img").replaceWith(currentImage);
  button.querySelector(".isha-play-hint").hidden = step !== 0;
  setMessage(button, `home.isha.step${step + 1}`, "aria-label");
  positionCharacter();
}
