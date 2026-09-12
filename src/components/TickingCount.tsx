/** A count that scale-pulses once on change instead of snapping — the one
 * authored motion moment, applied uniformly to every count that can change
 * (likes, comments, follower/following/post stats). */
export function TickingCount({ value }: { value: number }) {
  return (
    <span key={value} className="tick font-mono tabular-nums">
      {value}
    </span>
  );
}
