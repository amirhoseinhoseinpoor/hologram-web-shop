// Security-print motif: a guilloché rosette, the fine interference line work used
// on banknotes and security labels. Pure geometry, so it stays sharp at any size.

function rosettePath(radius, petals, depth, phase) {
  const points = [];
  const steps = 720;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r = radius + depth * Math.sin(petals * t + phase);
    points.push(
      `${(Math.cos(t) * r).toFixed(1)} ${(Math.sin(t) * r).toFixed(1)}`,
    );
  }
  return `M${points.join("L")}Z`;
}

const RINGS = Array.from({ length: 16 }, (_, i) =>
  rosettePath(150 + i * 15, 24, 14 + i * 0.5, (i * Math.PI) / 8),
);

export default function Guilloche({ className }) {
  return (
    <svg
      className={className}
      viewBox="-420 -420 840 840"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      aria-hidden="true"
      focusable="false"
    >
      {RINGS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
