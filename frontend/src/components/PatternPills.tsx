const COLORS = [
  "bg-indigo-500/20 text-indigo-300 ring-indigo-500/30",
  "bg-emerald-500/20 text-emerald-300 ring-emerald-500/30",
  "bg-amber-500/20 text-amber-300 ring-amber-500/30",
  "bg-rose-500/20 text-rose-300 ring-rose-500/30",
  "bg-cyan-500/20 text-cyan-300 ring-cyan-500/30",
  "bg-purple-500/20 text-purple-300 ring-purple-500/30",
  "bg-orange-500/20 text-orange-300 ring-orange-500/30",
  "bg-teal-500/20 text-teal-300 ring-teal-500/30",
];

function hashPattern(pattern: string): number {
  let hash = 0;
  for (let i = 0; i < pattern.length; i++) {
    hash = (hash * 31 + pattern.charCodeAt(i)) % COLORS.length;
  }
  return hash;
}

export default function PatternPills({ patterns }: { patterns: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {patterns.map((p) => (
        <span
          key={p}
          className={`rounded-full px-3 py-1 text-sm font-medium ring-1 ${COLORS[hashPattern(p)]}`}
        >
          {p}
        </span>
      ))}
    </div>
  );
}
