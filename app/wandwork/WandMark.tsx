// Wandwork's mark: the floating wand's orb, a wooden wand with a gold star, in a gold ring.
export function WandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 56" aria-hidden="true" focusable="false">
      <circle cx="28" cy="28" r="25" fill="#1d1538" stroke="#e8c872" strokeWidth="3" />
      <line x1="17" y1="40" x2="33" y2="24" stroke="#8a5a34" strokeWidth="4" strokeLinecap="round" />
      <polygon points="37,13 39,19 45,19.5 40,23.5 42,29.5 37,26 32,29.5 34,23.5 29,19.5 35,19" fill="#e8c872" />
    </svg>
  );
}
