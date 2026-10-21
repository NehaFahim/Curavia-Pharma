// Curavia mark: a "C" ring with a capsule resting in its opening.
export function LogoGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M40 20.1A15.5 15.5 0 1 0 40 43.9" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <g transform="rotate(-45 44 32)">
        <rect x="35" y="27.5" width="18" height="9" rx="4.5" fill="currentColor" />
        <path d="M44 27.5h4.5a4.5 4.5 0 0 1 0 9H44z" fill="#5EE6DF" />
      </g>
    </svg>
  );
}
