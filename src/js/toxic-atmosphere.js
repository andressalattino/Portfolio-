// DOM implementation of the supplied atmosphere, configurable for the shared page canvas.
const LEVELS = {
  light: { fog: 0.22, dust: 0.25 },
  medium: { fog: 0.65, dust: 0.7 },
  heavy: { fog: 1.5, dust: 1 },
};

export default function ToxicAtmosphere({
  intensity = "medium",
  showSkyline = false,
  showBackdrop = true,
  particleCount = 34,
  className = "",
} = {}) {
  const level = LEVELS[intensity];
  const atmosphere = document.createElement("div");
  atmosphere.className = `zaun-atmosphere ${className}`;
  atmosphere.style.setProperty("--zaun-fog-strength", level.fog);
  atmosphere.style.setProperty("--zaun-dust-strength", level.dust);
  atmosphere.setAttribute("aria-hidden", "true");

  const layer = (classNames) => {
    const element = document.createElement("div");
    element.className = classNames;
    atmosphere.append(element);
    return element;
  };

  if (showBackdrop) {
    layer(`zaun-atmosphere__city${showSkyline ? " zaun-atmosphere__city--skyline" : ""}`);
  }
  for (const name of ["a", "b", "c", "d"]) {
    layer(`zaun-atmosphere__fog zaun-atmosphere__fog--${name}`);
  }
  const dust = layer("zaun-atmosphere__dust");
  for (let index = 0; index < particleCount; index++) {
    const mote = document.createElement("span");
    mote.className = "zaun-atmosphere__mote";
    mote.style.setProperty("--zaun-x", `${(index * 73.7) % 100}%`);
    mote.style.setProperty("--zaun-y", `${(index * 31.3) % 100}%`);
    mote.style.setProperty("--zaun-size", `${index % 5 === 0 ? 3 : 1.5}px`);
    mote.style.setProperty("--zaun-duration", `${5 + (index % 9)}s`);
    mote.style.setProperty("--zaun-delay", `${-index * 0.76}s`);
    dust.append(mote);
  }
  if (showBackdrop) layer("zaun-atmosphere__vignette");
  return atmosphere;
}
