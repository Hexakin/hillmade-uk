// Aether's launcher mark (the orbit, the core with its mic stem, and the two wave ticks),
// redrawn from the app's own vector so the page and the phone show the same thing.
export function AetherMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      className={className}
      viewBox="24 24 60 60"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <circle cx="54" cy="54" r="24" fill="none" stroke="currentColor" strokeWidth="3.2" />
      <circle cx="54" cy="54" r="8" fill="currentColor" />
      <path
        fill="var(--ae-night, #0b1f2a)"
        d="M52.4,50h3.2v8c0,2.2 -1.4,4 -3.2,4h0c-0.6,0 -1.2,-0.2 -1.6,-0.6 1,0.2 1.6,-0.8 1.6,-2.2v-9.2z"
      />
      <path fill="currentColor" d="M30,52h4v4h-4zM74,52h4v4h-4z" />
    </svg>
  );
}
