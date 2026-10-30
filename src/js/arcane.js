import ToxicAtmosphere from "./toxic-atmosphere.js";

const assetRoot = "assets/arcane/";

function decoration(className) {
  const element = document.createElement("div");
  element.className = className;
  element.setAttribute("aria-hidden", "true");
  return element;
}

function sceneImage(file, className, { lazy = true, width = 640, height = 640 } = {}) {
  const image = document.createElement("img");
  image.src = `${assetRoot}${file}.webp`;
  image.alt = "";
  image.className = className;
  image.width = width;
  image.height = height;
  image.decoding = "async";
  image.loading = lazy ? "lazy" : "eager";
  return image;
}

function graffiti(motif, className) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", className);
  svg.setAttribute("aria-hidden", "true");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `${assetRoot}graffiti.svg#${motif}`);
  svg.append(use);
  return svg;
}

// Shared transparent smoke textures; only the active dark scene requests them.
function AmbientAtmosphere(intensity = "medium") {
  const levels = { light: [3, 3], medium: [5, 5], heavy: [6, 7] };
  const level = Object.hasOwn(levels, intensity) ? intensity : "medium";
  const [smokeCount, particleCount] = levels[level];
  const atmosphere = decoration(`toxic-atmosphere toxic-atmosphere--${level}`);
  atmosphere.append(decoration("toxic-illumination"));
  const plumes = [
    ["smoke-violet", "distant"],
    ["smoke-chemical", "bank"],
    ["smoke-chemical", "near"],
    ["smoke-chemical", "curl"],
    ["smoke-violet", "side"],
    ["smoke-violet", "veil"],
  ];
  for (const [file, layer] of plumes.slice(0, smokeCount)) {
    atmosphere.append(
      sceneImage(file, `toxic-smoke toxic-smoke--${layer}`, {
        lazy: false,
        width: 1440,
        height: 480,
      }),
    );
  }
  const positions = [
    [8, 74],
    [31, 89],
    [57, 68],
    [77, 82],
    [92, 66],
    [45, 75],
    [18, 92],
  ];
  for (let index = 0; index < particleCount; index++) {
    const particle = document.createElement("i");
    particle.style.setProperty("--particle-x", `${positions[index][0]}%`);
    particle.style.setProperty("--particle-y", `${positions[index][1]}%`);
    particle.style.setProperty("--particle-size", `${1 + (index % 3) * 0.4}px`);
    particle.style.setProperty("--particle-duration", `${38 + index * 6}s`);
    particle.style.setProperty("--particle-delay", `${-9 - index * 11}s`);
    atmosphere.append(particle);
  }
  return atmosphere;
}

export function PiltoverAtmosphere() {
  const atmosphere = decoration("piltover-atmosphere");
  atmosphere.append(decoration("piltover-sun"));
  for (const layer of ["far", "middle", "near"]) {
    atmosphere.append(
      sceneImage("piltover-clouds", `painted-cloud painted-cloud--${layer}`, {
        lazy: false,
        width: 1700,
        height: 567,
      }),
    );
  }
  return atmosphere;
}

export function ViktorFollowers() {
  const followers = decoration("viktor-followers");
  followers.append(
    sceneImage("follower", "viktor-follower viktor-follower--near", { width: 320, height: 960 }),
    sceneImage("follower-distant", "viktor-follower viktor-follower--far", {
      width: 320,
      height: 960,
    }),
  );
  return followers;
}

// Add treatments to real anchors/buttons, preserving their semantics and events.
export function initArcaneUI() {
  for (const button of document.querySelectorAll(".arcane-button")) {
    const label = document.createElement("span");
    label.className = "arcane-button-label";
    label.append(...button.childNodes);
    button.append(
      label,
      graffiti("boom", "button-graffiti button-graffiti--boom"),
      graffiti("monkey", "button-graffiti button-graffiti--monkey"),
      graffiti("marks", "button-graffiti button-graffiti--marks"),
      graffiti("hex-sparks", "button-hex-sparks"),
    );
  }
}

export function renderArcaneTheme(dark) {
  const atmosphere = document.getElementById("page-atmosphere");
  const hero = document.getElementById("hero-scene");
  const technologies = document.getElementById("technology-scene");
  // Mount only the active scene; hidden themes never request their heavy art.
  if (dark) {
    // One continuous background: the supplied particles on Home/Education,
    // and the existing textured gas on the other public pages.
    atmosphere?.replaceChildren(
      hero || technologies
        ? ToxicAtmosphere({ intensity: "medium", showBackdrop: false, particleCount: 12 })
        : AmbientAtmosphere("light"),
    );
  } else {
    atmosphere?.replaceChildren(PiltoverAtmosphere());
  }

  for (const character of document.querySelectorAll("[data-theme-character]")) {
    const file = dark ? character.dataset.dark : character.dataset.light;
    character.hidden = !file;
    if (file) character.setAttribute("src", `${assetRoot}${file}.webp`);
    else character.removeAttribute("src");
  }

  if (hero) {
    const scene = decoration(dark ? "zaun-scene" : "piltover-scene");
    if (dark) {
      const sign = decoration("last-drop-fixture");
      sign.append(
        sceneImage("last-drop", "last-drop-sign", { lazy: false, width: 960, height: 753 }),
      );
      scene.append(
        decoration("zaun-wall"),
        sign,
        graffiti("crown", "scene-graffiti scene-graffiti--crown"),
        graffiti("monkey", "scene-graffiti scene-graffiti--monkey"),
        graffiti("arrow", "scene-graffiti scene-graffiti--arrow"),
        sceneImage("jinx", "jinx-weapon", { lazy: false, width: 950, height: 950 }),
      );
    } else {
      scene.append(
        sceneImage("piltover-airship", "airship airship--far", {
          lazy: false,
          width: 1250,
          height: 481,
        }),
        sceneImage("piltover-airship", "airship airship--main", {
          lazy: false,
          width: 1250,
          height: 481,
        }),
      );
    }
    hero.replaceChildren(scene);
  }

  if (technologies) {
    if (dark) {
      const scene = decoration("technology-art technology-art--zaun");
      scene.append(
        ViktorFollowers(),
        sceneImage("viktor", "technology-character", { width: 640, height: 960 }),
      );
      technologies.replaceChildren(scene);
    } else {
      technologies.replaceChildren();
    }
  }
}
