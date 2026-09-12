/** Authored ring-and-glyph SVG marks — not a generic icon library, not a
 * bare Unicode/emoji character standing in for a control. Both use
 * currentColor so they inherit the parent button's text color. */

export function LikeStamp({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 13.4 3.4 8.9a3 3 0 0 1 4.24-4.24L8 5l.36-.34A3 3 0 0 1 12.6 8.9z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CommentStamp() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.5 8.4c0-3 2.5-5.1 5.5-5.1s5.5 2.1 5.5 5.1-2.5 5.1-5.5 5.1c-.7 0-1.4-.1-2-.4l-2.7 1 .7-2.5C2.9 10.6 2.5 9.6 2.5 8.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
