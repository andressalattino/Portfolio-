export function createTypewriter(element) {
  let timer;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  return (text) => {
    clearTimeout(timer);
    if (!element) return;
    element.setAttribute("aria-label", text);
    if (reducedMotion.matches) {
      element.textContent = text;
      return;
    }
    const characters = Array.from(text);
    let position = 0;
    element.textContent = "";
    function tick() {
      element.textContent = characters.slice(0, ++position).join("");
      if (position < characters.length) timer = setTimeout(tick, 35);
    }
    tick();
  };
}
