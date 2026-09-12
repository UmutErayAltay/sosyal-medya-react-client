/** A count that visibly ticks (scale pulse) on change instead of snapping —
 * the signature interaction donated from the nixie-counter world, applied to
 * every count that changes (likes, comments, follower/following/post
 * stats). `accent` is true ONLY for the like count, where the flash color is
 * already the liked-state accent; every other counter pulses in plain ink so
 * the accent stays reserved for the liked state, not a general "changed"
 * signal. */
export function TickingCount({ value, accent = false }: { value: number; accent?: boolean }) {
  return (
    <span key={value} className={`${accent ? "tick-accent" : "tick"} font-mono-chrome tabular-nums`}>
      {value}
    </span>
  );
}
