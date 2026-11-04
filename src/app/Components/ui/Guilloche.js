// Security-print motif: a guilloché rosette, the fine interference line work used
// on banknotes and security labels. The line work lives in public/motif/guilloche.svg
// as a CSS mask, so it takes its colour from `color` and never enters the page HTML.
export default function Guilloche({ className = "" }) {
  return <span className={`az-guilloche ${className}`} aria-hidden="true" />;
}
