export function initNavigation() {
  const button = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!button || !menu) return;
  function setOpen(open) {
    menu.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
  }
  button.addEventListener("click", () => setOpen(menu.hidden));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      setOpen(false);
      button.focus();
    }
  });
}
