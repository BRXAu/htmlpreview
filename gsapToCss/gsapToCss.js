const fs = require("fs");

// -----------------------------
// Load GSAP timeline text file
// -----------------------------
const input = fs.readFileSync("timeline.txt", "utf8");

// -----------------------------
// EASING MAP (GSAP → CSS)
// -----------------------------
const easeMap = {
  "none": "linear",
  "linear": "linear",

  "power1.out": "cubic-bezier(0.25, 0.1, 0.25, 1)",
  "power2.out": "cubic-bezier(0.16, 1, 0.3, 1)",
  "power3.out": "cubic-bezier(0.22, 1, 0.36, 1)",
  "power4.out": "cubic-bezier(0.19, 1, 0.22, 1)",

  "power1.in": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  "power2.in": "cubic-bezier(0.55, 0.085, 0.68, 0.53)",

  "power1.inOut": "cubic-bezier(0.45, 0, 0.55, 1)",
  "power2.inOut": "cubic-bezier(0.65, 0, 0.35, 1)"
};

// -----------------------------
// Parse GSAP timeline (SAFE SUBSET ONLY)
// -----------------------------
function parseTimeline(code) {
  const lines = code.split("\n");
  const steps = [];

  for (const line of lines) {

    // tl.set("#id", {...}, time)
    const setMatch = line.match(
      /tl\.set\(["'`](.+?)["'`],\s*\{([^}]+)\},\s*([0-9.]+)\)/
    );

    if (setMatch) {
      steps.push({
        type: "set",
        target: setMatch[1],
        props: parseProps(setMatch[2]),
        time: parseFloat(setMatch[3]),
        duration: 0,
        ease: "none"
      });
      continue;
    }

    // tl.to("#id", {...}, time)
    const toMatch = line.match(
      /tl\.to\(["'`](.+?)["'`],\s*\{([^}]+)\},\s*([0-9.]+)\)/
    );

    if (toMatch) {

      const propsRaw = toMatch[2];

      const props = parseProps(propsRaw);
      const duration = extractNumber(propsRaw, "duration") || 1;
      const ease = extractString(propsRaw, "ease") || "linear";

      steps.push({
        type: "to",
        target: toMatch[1],
        props,
        time: parseFloat(toMatch[3]),
        duration,
        ease
      });
    }
  }

  return steps;
}

// -----------------------------
// Parse { x: 100, opacity: 1 }
// -----------------------------
function parseProps(str) {
  const props = {};
  const pairs = str.split(",");

  for (const p of pairs) {
    const [k, v] = p.split(":").map(s => s.trim());
    if (!k || !v) continue;
    if (k === "duration" || k === "ease") continue;

    props[k] = parseFloat(v);
  }

  return props;
}

// -----------------------------
function extractNumber(str, key) {
  const match = str.match(new RegExp(`${key}\\s*:\\s*([0-9.]+)`));
  return match ? parseFloat(match[1]) : null;
}

function extractString(str, key) {
  const parts = str.split(key + ":");
  if (parts.length < 2) return null;

  const value = parts[1].trim().split(",")[0];

  return value.replace(/["'`]/g, "");
}

// -----------------------------
// EASING RESOLVER
// -----------------------------
function resolveEase(ease) {
  return easeMap[ease] || "linear";
}

// -----------------------------
// CSS GENERATOR
// -----------------------------
function generateCSS(steps) {

  const grouped = {};
  let totalTime = 0;

  for (const s of steps) {
    const end = s.time + (s.duration || 0);
    if (end > totalTime) totalTime = end;

    if (!grouped[s.target]) grouped[s.target] = [];
    grouped[s.target].push(s);
  }

  let output = "";

  for (const target in grouped) {

    const frames = grouped[target];
    const animName = sanitize(target);

    let keyframes = `@keyframes ${animName} {\n`;

    for (const f of frames) {

      const startPct = (f.time / totalTime) * 100;
      const endPct = ((f.time + f.duration) / totalTime) * 100;

      const x = f.props.x ?? 0;
      const y = f.props.y ?? 0;
      const opacity = f.props.autoAlpha ?? 1;

      if (f.type === "set") {

        keyframes += `
${startPct.toFixed(2)}% {
  transform: translate(${x}px, ${y}px);
  opacity: ${opacity};
}
`;
      }

      if (f.type === "to") {

        const ease = resolveEase(f.ease);

        keyframes += `
${startPct.toFixed(2)}% {
  transform: translate(${x}px, ${y}px);
  animation-timing-function: ${ease};
}

${endPct.toFixed(2)}% {
  transform: translate(${x}px, ${y}px);
}
`;
      }
    }

    keyframes += `}\n\n`;

    // base rule (bulletproof SVG-safe transform)
    const first = frames[0];

    const x0 = first.props.x ?? 0;
    const y0 = first.props.y ?? 0;
    const op0 = first.props.autoAlpha ?? 1;

    output += `
${target} {
  transform: translate(${x0}px, ${y0}px);
  -webkit-transform: translate(${x0}px, ${y0}px);
  opacity: ${op0};
  animation: ${animName} ${totalTime}s linear forwards;
  will-change: transform, opacity;
}

${keyframes}
`;
  }

  return output;
}

// -----------------------------
// SANITISE SELECTOR → CSS NAME
// -----------------------------
function sanitize(str) {
  return str.replace(/[#.]/g, "").replace(/\W/g, "_");
}

// -----------------------------
// RUN COMPILER
// -----------------------------
const timeline = parseTimeline(input);
const css = generateCSS(timeline);

fs.writeFileSync("output.css", css);

console.log("GSAP → Bulletproof CSS compiled ✔");