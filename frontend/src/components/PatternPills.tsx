import { getTopicStyle } from "@/lib/topicColors";

export default function PatternPills({ patterns }: { patterns: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {patterns.map((p) => (
        <span
          key={p}
          className={`rounded-lg border px-3 py-1 text-sm font-medium ${getTopicStyle(p)}`}
        >
          {p}
        </span>
      ))}
    </div>
  );
}
