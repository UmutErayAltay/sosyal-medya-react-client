/** Small ink-stamp marks (a ring plus a simple glyph), not a generic icon
 * library and not a bare Unicode character standing in for a control — see
 * the field-notebook direction's "ink-stamp marks" requirement in
 * .impeccable/surfaces/app.md. Both use currentColor so they inherit the
 * button's ink/accent state. */

export function LikeStamp({ filled }: { filled: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="6.6" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M7.5 10.3 4.9 7.8a1.7 1.7 0 0 1 2.4-2.4l.2.2.2-.2a1.7 1.7 0 0 1 2.4 2.4z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CommentStamp() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="6.6" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4.6 5.4h5.8M4.6 7.5h5.8M4.6 9.6h3.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}
